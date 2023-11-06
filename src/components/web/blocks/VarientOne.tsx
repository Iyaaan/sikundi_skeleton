import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostCard from '@sikundi/components/web/cards/PostCard'
import PortraitAd from '@sikundi/components/web/ad/PortraitAd'
import PostSmallCard from '../cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string
    data?: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
}

const VarientOne:FC<Props> = ({title, data = defaultProps.data, loadMore = defaultProps.loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge([
            'container lg:px-4 px-0 ',
            props.className
        ])}>
            {title && <h1 className='col-span-4 text-center font-black text-5xl lg:text-8xl text-web-background dark:text-web-background-dark mb-10 stroke-text-accent'>
                {title}
            </h1>}
            <div className='grid grid-cols-12 gap-8 mb-4'>
                <PostCard href={"/836487"}
                    className="lg:col-span-9 col-span-12"
                    data={{
                        title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ!`,
                        description: `މާލީ ބަޔާނުގައި ބަޔާންކޮށްފައިވާ އަދަދުތަކާއި އިދާރާގެ ހިސާބުތަކާ ދިމާނުވާ މައްސަލަ ފާހަގަކޮށް އެ ރިޕޯޓްގައި ބުނެފައި ވަނީ، 2020 ވަނަ އަހަރުގެ މާލީ ބަޔާނުގެ "ފައިސާ ލިބުނުގޮތާއި ހޭދަ ކުރެވުނު ގޮތުގެ....`,
                        publishedAt: `${new Date().toISOString()}`,
                        featureImage: `/sample_media/375132_3_72cfc07865b235acfb7e85032271760b10cb82e2_large.jpeg`
                    }}
                />
                <PortraitAd href={"https://sonee.com.mv"} 
                    target="_blank"
                    className="col-span-3 hidden lg:block"
                    data={{
                        coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                        alt: "Sonnee Hardware"
                    }}
                />
            </div>
            <div className='p-6 pb-12 grid lg:grid-cols-5 grid-cols-2 gap-4 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6 relative'>
                {data?.map((post, index) => (
                    <PostSmallCard href={post.href} key={index}
                        data={{
                            title: post.title,
                            featureImage: post.featureImage
                        }}
                    />
                ))}
                {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-foreground dark:bg-web-foreground-dark border border-gray-100 dark:border-gray-800 hover:scale-105 active:scale-95 transition-all'>
                    <ArrowDown2 />
                </button>}
            </div>
        </div>
    )
}

const defaultProps = {
    data: [
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/375572_3_74044c3b4ecfde58cc717cab4eea94b4780de82b_large.jpg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376654_3_69a507d458b512899a16bc66bc8e0f3ac3245262_large.jpeg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376656_3_626682d7f3d01d30c21445be86f3753251578a6b_large.jpg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376658_3_7a92e5368c3e329d6678aaf27c35e19a74102e10_large.jpeg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376659_3_8c34e403f5fd57d6dbb486d08410cc464c5a9ddf_large.jpeg`
        },
    ],
    loadMore: false
}

export default VarientOne