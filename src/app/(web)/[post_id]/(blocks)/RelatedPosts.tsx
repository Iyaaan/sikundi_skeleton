import PostSmallCard from '@sikundi/components/web/cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import Heading from './Heading'
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

const RelatedPosts:FC<Props> = ({data, ...props}) => {
    return (
        <div className='px-6 max-w-3xl mx-auto'>
            <div {...props} className={twMerge([
                'p-6 pb-12 grid lg:grid-cols-4 grid-cols-2 gap-4 bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] mb-6 relative',
                props.className
            ])}>
                <div className='lg:col-span-4 col-span-2' dir='ltr'>
                    <Heading className=' text-web-accent dark:text-web-accent-dark mb-0 text-base'>Related</Heading>
                </div>
                {data?.map((post, index) => (
                    <PostSmallCard href={post.href} key={index}
                        data={{
                            title: post.title,
                            featureImage: post.featureImage
                        }}
                    />
                ))}
                {props.loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-foreground dark:bg-web-foreground-dark border border-gray-100 dark:border-gray-800 hover:scale-105 active:scale-95 transition-all'>
                    <ArrowDown2 />
                </button>}
            </div>
        </div>
    )
}

RelatedPosts.defaultProps = {
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
        }
    ],
    loadMore: true
}

export default RelatedPosts