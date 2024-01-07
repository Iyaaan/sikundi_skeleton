import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'
import { prisma } from "@sikundi/lib/server/utils/prisma";

export default async function Page() {
    const {
        bigArticle,
        topArticles,
        latestNews,
        smallArticles,
        galleryPosts,
        latestSports,
        latestEarth,
        latestWorklife,
        // @ts-ignore
    } = await HomePage()

    const VarientOne = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientOne'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientTwo = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientTwo'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientThree = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientThree'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFour = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientFour'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFive = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientFive'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientSix = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientSix'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })

    return (
        <Fragment>
            {/* @ts-ignore */}
            {(bigArticle && topArticles?.length > 0) && <VarientOne className='lg:mb-20 mb-4' data={bigArticle} posts={topArticles} />}
            {/* @ts-ignore */}
            {latestNews?.length > 0 && <VarientTwo title={"Latest news"} className='mb-14' posts={latestNews} />}
            {/* @ts-ignore */}
            {smallArticles?.length > 0 && <VarientThree title={"Editors Pick"} className='mb-14' posts={smallArticles} />}
            {/* @ts-ignore */}
            {galleryPosts?.length > 0 && <VarientFour title={"Gallery"} className='mb-14' posts={galleryPosts} />}
            {/* @ts-ignore */}
            {latestSports?.length > 0 && <VarientFive title={"Sports"} className='mb-12' posts={latestSports} />}
            {/* @ts-ignore */}
            {latestEarth?.length > 0 && <VarientSix title={"Earth"} className='mb-12' posts={latestEarth} />}
            {/* @ts-ignore */}
            {latestSports?.length > 0 && <VarientFive title={"Sports"} className='mb-12' posts={latestSports} />}
            {/* @ts-ignore */}
            {latestWorklife?.length > 0 && <VarientSix title={"Worklife"} className='mb-12' posts={latestWorklife} />}
        </Fragment>
    )
}

async function HomePage () {
    const bigArticle = await prisma.post.findFirst({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            description: true,
            createdAt: true,
            category: {
                select: {
                    name: true
                }
            }
        },
        where: {
            postsTags: {
                some: {
                    OR: [
                        {
                            tag: {
                                slug: "bodu"
                            }
                        },
                        {
                            tag: {
                                slug: "big"
                            }
                        }
                    ]
                }
            },
            status: "published",
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const topArticles = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            }
        },
        where: {
            status: "published",
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })
    const latestNews = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            description: true,
            category: {
                select: {
                    name: true
                }
            },
            createdBy: {
                select: {
                    userNameEn: true
                }
            }
        },
        where: {
            status: "published",
            language: "EN",
            category: {
                name: "news_en"
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })
    const smallArticles = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        },
        where: {
            postsTags: {
                some: {
                    OR: [
                        {
                            tag: {
                                slug: "kuda"
                            }
                        },
                        {
                            tag: {
                                slug: "small"
                            }
                        }
                    ]
                }
            },
            status: "published",
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })
    const galleryPosts = await prisma.photo.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            description: true,
            createdAt: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            }
        },
        where: {
            status: "published",
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })
    const latestEarth = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            category: {
                select: {
                    name: true
                }
            },
            description: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            }
        },
        where: {
            status: "published",
            category: {
                slug: "earth_en"
            },
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })
    const latestSports = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            category: {
                select: {
                    name: true
                }
            },
            description: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            }
        },
        where: {
            status: "published",
            category: {
                slug: "sport_en"
            },
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })
    const latestWorklife = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            createdAt: true,
            createdBy: {
                select: {
                    userNameEn: true
                }
            },
            description: true,
            category: {
                select: {
                    name: true
                }
            }
        },
        where: {
            status: "published",
            category: {
                slug: "world_en"
            },
            language: "EN"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    return {
        bigArticle:  bigArticle && {
            createdAt: new Date(bigArticle?.createdAt),
            category: bigArticle?.category?.name,
            title: bigArticle?.title,
            description: bigArticle?.description,
            url: `/en/${bigArticle?.id}`,
            featureImageUrl: bigArticle?.featureImageUrl,
        },
        topArticles: topArticles?.map((post) => ({
            createdAt: new Date(post?.createdAt),
            createdBy: {
                name: post?.createdBy?.userNameEn
            },
            title: post?.title,
            url: `/en/${post?.id}`,
        })),
        latestNews: latestNews?.map((post) => ({
            category: post?.category?.name,
            createdAt: new Date(post?.createdAt),
            title: post?.title,
            description: post?.description,
            featureImageUrl: post?.featureImageUrl,
            url: `/en/${post?.id}`,
        })),
        smallArticles: smallArticles?.map((post) => ({
            category: post?.category?.name,
            title: post?.title,
            createdBy: {
                name: post?.createdBy?.userNameEn
            },
            featureImageUrl: post?.featureImageUrl,
            url: `/en/${post?.id}`,
        })),
        galleryPosts: galleryPosts?.map((post) => ({
            title: post?.title,
            createdBy: {
                name: post?.createdBy?.userNameEn
            },
            url: `/en/gallery/${post?.id}`,
            featureImageUrl: post?.featureImageUrl,
        })),
        latestSports: latestSports?.map((post) => ({
            category: post?.category?.name,
            title: post?.title,
            featureImageUrl: post?.featureImageUrl,
            description: post?.description,
            createdBy: {
                name: post?.createdBy?.userNameEn
            },
            createdAt: new Date(post?.createdAt),
            url: `/en/${post?.id}`,
        })),
        latestEarth: latestEarth?.map((post) => ({
            category: post?.category?.name,
            createdAt: new Date(post?.createdAt),
            title: post?.title,
            description: post?.description,
            featureImageUrl: post?.featureImageUrl,
            url: `/en/${post?.id}`,
        })),
        latestWorklife: latestWorklife?.map((post) => ({
            createdAt: new Date(post?.createdAt),
            category: post?.category?.name,
            title: post?.title,
            description: post?.description,
            url: `/en/${post?.id}`,
            featureImageUrl: post?.featureImageUrl,
        })),
    }
}
