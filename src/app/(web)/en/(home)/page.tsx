import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

export default function Page() {
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
            <VarientOne className='lg:mb-20 mb-4' data={{
                createdAt: new Date(),
                category: "Health",
                title: "COVID-19 Vaccine Rollout Accelerated Across the State",
                description: "The States is accelerating its COVID-19 vaccine rollout, with plans to administer at least one dose of the vaccine to all eligible adults by the end of April.",
                url: `/${123}`,
                featureImageUrl: `/sikundi-content/uploads/2023/12/img1.jpg`
            }} posts={[
                {
                    createdAt: new Date(),
                    createdBy: {
                        name: "Marnie Whine"
                    },
                    title: "XSpancer Launches First Tourist Mission to Space",
                    url: `/${123}`
                },
                {
                    createdAt: new Date(),
                    createdBy: {
                        name: "Tony Goerge"
                    },
                    title: "Karen Delancy Launches New Fashion Line",
                    url: `/${123}`
                }
            ]} />
            <VarientTwo title={"Latest news"} className='mb-14' posts={[
                {
                    category: "Health",
                    createdAt: new Date(),
                    title: "Study Finds Link Between Social Media Use and Mental Health Issues",
                    description: "A new study has found a link between excessive social media use and mental health issues such as depression and anxiety, raising concerns about the impact of social media on mental well-being.",
                    featureImageUrl: `/sikundi-content/uploads/2023/12/img1.jpg`,
                    url: `/{123}`
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "XSpancer Launches First Tourist Mission to Space",
                    description: "XSpacer has successfully launched its first-ever tourist mission to space, marking a new era of space tourism.",
                    url: `/{123}`
                },
                {
                    category: "Entertainment",
                    createdAt: new Date(),
                    title: "Hollywood Stars Turn Out for Oscars Red Carpet",
                    description: "The biggest names in Hollywood turned out for the annual Academy Awards ceremony, with stars dazzling on the red carpet in their designer gowns and tuxedos.",
                    url: `/{123}`
                },
                {
                    category: "Business",
                    createdAt: new Date(),
                    title: "Amazing Plans to Expand Its Delivery Network to Rural Areas",
                    description: "Amazing is set to expand its delivery network to rural areas, aiming to reach more customers and compete with other online retailers.",
                    url: `/{123}`
                },
            ]} />
            <VarientThree title={"Editors Pick"} className='mb-14' posts={[
                {
                    category: "Entertainment",
                    title: "Behind the Scenes of the Making of the Latest Zoom Movie",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: `/${123}`
                },
                {
                    category: "Entertainment",
                    title: "The Future of Artificial Intelligence: Experts Weigh In",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: `/${123}`
                },
                {
                    category: "Entertainment",
                    title: "The Rise of Esports: A Look at the World's Biggest Gaming Tournaments",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: `/${123}`
                },
                {
                    category: "Entertainment",
                    title: "How to Succeed as a Startup: Advice from Successful Entrepreneurs",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: `/${123}`
                },
            ]} />
            <VarientFour title={"Gallery"} className='mb-14' posts={[
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: `/${123}`,
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                },
            ]} />
            <VarientFive title={"Sports"} className='mb-12' posts={[
                {
                    title: "TikTok Made Me Buy It Products You Shouldn't Sleep On",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lobortis quis amet pellentesque arcu, tincidunt.",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    url: "/${123}",
                },
                {
                    title: "20 Of The Best Songs Released In February",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    url: "/${123}",
                },
                {
                    title: "20 Of The Best Songs Released In February",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    createdBy: {
                        name: "Shoo Phar Mhien"
                    },
                    url: "/${123}",
                },
                {
                    title: "The Future of Artificial Intelligence: Experts Weigh In",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "How to Succeed as a Startup: Advice from Successful Entrepreneurs",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "XSpancer Launches First Tourist Mission to Space",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "How to Succeed as a Startup: Advice from Successful Entrepreneurs",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "XSpancer Launches First Tourist Mission to Space",
                    createdAt: new Date(),
                    url: "/${123}",
                },
            ]} />
            <VarientSix title={"Earth"} className='mb-12' posts={[
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
            ]} />
            <VarientFive title={"Sports"} className='mb-12' posts={[
                {
                    category: "Entertainment",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    title: "20 Of The Best Songs Released In February",
                    createdAt: new Date(),
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: "/${123}",
                },
                {
                    category: "Entertainment",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    title: "20 Of The Best Songs Released In February",
                    createdAt: new Date(),
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: "/${123}",
                },
                {
                    category: "Entertainment",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    title: "20 Of The Best Songs Released In February",
                    createdAt: new Date(),
                    createdBy: {
                        name: "Shajaath Ahmed"
                    },
                    url: "/${123}",
                },
                {
                    title: "The Future of Artificial Intelligence: Experts Weigh In",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "How to Succeed as a Startup: Advice from Successful Entrepreneurs",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "XSpancer Launches First Tourist Mission to Space",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "How to Succeed as a Startup: Advice from Successful Entrepreneurs",
                    createdAt: new Date(),
                    url: "/${123}",
                },
                {
                    title: "XSpancer Launches First Tourist Mission to Space",
                    createdAt: new Date(),
                    url: "/${123}",
                },
            ]} />
            <VarientSix title={"Worklife"} className='mb-12' posts={[
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
                {
                    category: "Technology",
                    createdAt: new Date(),
                    title: "Tech Giants Set to Face Antitrust Lawsuits in Continent E",
                    description: "The E Union is preparing to file antitrust lawsuits against several major tech companies, including Giggle and Acebook, for alleged anti-competitive behavior.",
                    featureImageUrl: "/sikundi-content/uploads/2023/12/img1.jpg",
                    url: "/${123}",
                },
            ]} />
        </Fragment>
    )
}
