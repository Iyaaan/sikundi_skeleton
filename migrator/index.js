import { PrismaClient } from "@prisma/client"
import axios from "axios"
import cheerio from 'cheerio'

export async function GET() {
    const prisma = new PrismaClient()

    const lan = "http://localhost:3000/seed"
    const wan = "https://gaafu.media/seed"

    const posts = await prisma.wp_posts.findMany({
        select: {
            post_type: true,
            ID: true,
            post_author: true,
            post_date: true,
            post_content: true,
            post_title: true,
            post_excerpt: true,
            guid: true,
        },
        where: {
            AND: [
                {
                    post_status: "publish",
                },
                {
                    post_type: "gallery"
                }
            ]
        },
        orderBy: {
            ID: "desc"
        }
    })
    console.log("posts fetched")

    for (let index = 0; index < posts.length; index++) {
        const post = posts[index];
        const id = parseInt(String(post.ID));
        const data = await postArticle({
            id: id,
            ...post
        }, prisma)
        const res = await axios.patch(wan, {
            id: id,
            ...data
        }, {
            headers: {
                "X-CSRF-Token": "jbPDVFW6egu93zZj7Z"
            }
        })

        console.log(`[post = ${id}] = published`)
    }

    prisma.$disconnect()
}

GET()


function postArticle({ id, ...finalPost }, prisma) {
    return new Promise(async (resolve, reject) => {
        let featureImage = ""
    
        const i = await prisma.wp_postmeta.findFirst({
            where: {
                post_id: id,
                meta_key: "_thumbnail_id"
            }
        })

        if (i?.meta_value) {
            featureImage = await prisma.wp_posts.findFirst({
                where: {
                    ID: parseInt(i.meta_value)
                }
            })
        }
    
        const post_meta = await prisma.wp_postmeta.findMany({
            where: {
                post_id: finalPost?.ID,
                OR: [
                    {
                        meta_key: "full_title"
                    },
                    {
                        meta_key: "latin_title"
                    },
                    {
                        meta_key: "breaking"
                    }
                ]
            }
        })

        const term_relation = await prisma.wp_term_relationships.findMany({
            where: {
                object_id: id
            }
        })
        const terms = await prisma.wp_terms.findMany({
            where: {
                OR: term_relation.map((relation)=>({
                    term_id: relation?.term_taxonomy_id
                }))
            }
        })
        const taxonomy = await prisma.wp_term_taxonomy.findMany({
            where: {
                OR: terms.map((tax)=>({
                    term_id: tax?.term_id
                }))
            }
        })

        
        const author = finalPost?.post_author ? await prisma.wp_users.findUnique({
            where: {
                ID: finalPost?.post_author
            }
        }) : null

        const obj = {
            id: id,
            createdAt: finalPost?.post_date,
            createdBy: (author?.display_name && author?.user_email) && {
                connectOrCreate: {
                    create: {
                        userName: author?.display_name,
                        email: String(author?.user_email).toLocaleLowerCase(),
                        password: String(author?.user_email).toLocaleLowerCase(),
                        description: ""
                    },
                    where: {
                        email: String(author?.user_email).toLocaleLowerCase(),
                    }
                }
            },
            // category: (terms.find(t => t?.term_id === taxonomy?.find(t => t?.taxonomy === 'category')?.term_id)?.name && terms.find(t => t?.term_id === taxonomy?.find(t => t?.taxonomy === 'category')?.term_id)?.slug) && {
            //     connectOrCreate: {
            //         create: {
            //             name: terms.find(t => t?.term_id === taxonomy?.find(t => t?.taxonomy === 'category')?.term_id)?.name,
            //             slug: terms.find(t => t?.term_id === taxonomy?.find(t => t?.taxonomy === 'category')?.term_id)?.slug,
            //             language: "DV"
            //         },
            //         where: {
            //             slug: terms.find(t => t?.term_id === taxonomy?.find(t => t?.taxonomy === 'category')?.term_id)?.slug
            //         }
            //     }
            // },
            // featureImageCaption: featureImage?.post_title,
            featureImage: featureImage?.guid && {
                connectOrCreate: {
                    create: {
                        name: featureImage?.guid?.replace("https://gaafu.mv/wp-content/", "/sikundi-content/")?.replace("http://gaafu.mv/wp-content/", "/sikundi-content/"),
                        url: featureImage?.guid?.replace("https://gaafu.mv/wp-content/", "/sikundi-content/")?.replace("http://gaafu.mv/wp-content/", "/sikundi-content/"),
                        libraryGroup: {
                            connectOrCreate: {
                                create: {
                                    name: "upload",
                                    description: "upload"
                                },
                                where: {
                                    name: "upload"
                                }
                            }
                        }
                    },
                    where: {
                        url: featureImage?.guid?.replace("https://gaafu.mv/wp-content/", "/sikundi-content/")?.replace("http://gaafu.mv/wp-content/", "/sikundi-content/"),
                    }
                }
            },
            title: finalPost?.post_title,
            longTitle: post_meta?.find(meta => meta?.meta_key === 'full_title')?.meta_value,
            latinTitle: post_meta?.find(meta => meta?.meta_key === 'latin_title')?.meta_value,
            description: finalPost?.post_excerpt,
            lead: JSON.stringify({
                root: {
                    children: finalPost?.post_content?.split("\r\n")?.map((tag)=>{
                        if(tag === "&nbsp;") return
                        if(/<img[^>]*>/.test(tag)) return {
                            children:[
                                {
                                    altText: tag.match(/>(.*?)<\/caption>/),
                                    caption:{
                                        editorState:{
                                            root:{
                                                children:[
                                                    {
                                                        detail:0,
                                                        format:0,
                                                        mode:"normal",
                                                        style:"",
                                                        text: tag?.match(/>(.*?)<\/caption>/)?.join("") || "",
                                                        type:"text",
                                                        "version":1
                                                    }
                                                ],
                                                direction:null,
                                                format:"",
                                                indent:0,
                                                type:"root",
                                                version:1
                                            }
                                        }
                                    },
                                    height:0,
                                    maxWidth:500,
                                    showCaption:false,
                                    src: cheerio.load(tag)?.('img')?.attr('src')?.replace("https://gaafu.mv/wp-content/", "/sikundi-content/")?.replace("http://gaafu.mv/wp-content/", "/sikundi-content/"),
                                    type:"image",
                                    version:1,
                                    width:0
                                }
                            ],
                            direction:null,
                            format:"",
                            indent:0,
                            type:"paragraph",
                            version:1
                        }

                        const twitter = /^https:\/\/(twitter|x)\.com\/(#!\/)?(\w+)\/status(es)*\/(\d+)/.exec(tag)
                        if(twitter != null) {
                            return {
                                "format":"",
                                "type":"tweet",
                                "version":1,
                                "id": twitter?.filter(item => item)?.[3]
                            }
                        }

                        if(tag.includes("https://www.facebook.com/plugins/post.php?href=")) {
                            const $ = cheerio.load(tag);
                            const src = $('iframe').attr('src');
                            const url = new URL(src);
                            const params = new URLSearchParams(url.search);
                            const encodedHref = params.get('href'); 
                            const decodedHref = decodeURIComponent(encodedHref);
                            const facebook = /^https?:\/\/(?:www\.)?facebook\.com\/[^\/]+\/posts\/([^\/?]+)(?:\?.*)?$/.exec(decodedHref)
                            const facebook_id = facebook ? (facebook?.[1].length > 0 ? facebook[1] : null) : null;
                            if(facebook_id != null) {
                                return {
                                    "format":"",
                                    "type":"facebook",
                                    "version":1,
                                    "postID":facebook_id
                                }
                            }
                        }

                        if(/<h[^>]*>/.test(tag)) {
                            return {
                                children: [
                                    {
                                        detail:0,
                                        format:0,
                                        mode:"normal",
                                        style:"",
                                        text: tag.replace(/<[^>]*>/g, ''),
                                        type:"text",
                                        "version":1
                                    }
                                ],
                                direction:"ltr",
                                format:"",
                                indent:0,
                                type:"heading",
                                version:1,
                                tag:"h2"
                            }
                        }
                        
                        return {
                            children: [
                                {
                                    detail:0,
                                    format:0,
                                    mode:"normal",
                                    style:"",
                                    text: tag.replace(/<[^>]*>/g, ''),
                                    type:"text",
                                    "version":1
                                }
                            ],
                            direction:"ltr",
                            format:"",
                            indent:0,
                            type:"paragraph",
                            version:1
                        }
                    }).filter(item => item !== '' && item !== undefined),
                    direction:"ltr",
                    format:"",
                    indent:0,
                    type:"root",
                    version:1
                }
            }),
            // breaking: post_meta?.find(meta => meta?.meta_key === 'breaking')?.meta_value === "0" ? false : true,
            // liveblog: false,
            language: "DV",
            status: "published",
            // postsTags: taxonomy.filter(t => t?.taxonomy === 'post_tag').map((tr)=>({
            //     "name": terms?.find(t => t?.term_id === tr?.term_id)?.name,
            //     "slug": terms?.find(t => t?.term_id === tr?.term_id)?.slug
            // }))
        }
        
        resolve(obj)
    })
}