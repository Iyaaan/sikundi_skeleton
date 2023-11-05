import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostSmallCard from '../cards/PostSmallCard'
import { ArrowDown2 } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    data?: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
}

const VarientTwo:FC<Props> = ({title, data, loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge([
            'container bg-web-foreground dark:bg-web-foreground-dark rounded-[20px] relative',
            props.className
        ])}>
            <div className='grid lg:grid-cols-5 grid-cols-2 gap-4 p-6 pb-16 mb-6'>
                {data?.map((post, index) => (
                    <PostSmallCard href={post.href} key={index}
                        data={{
                            title: post.title,
                            featureImage: post.featureImage
                        }}
                    />
                ))}
            </div>
            {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-foreground dark:bg-web-foreground-dark border border-gray-100 dark:border-gray-800 hover:scale-105 active:scale-95 transition-all'>
                <ArrowDown2 />
            </button>}
        </div>
    )
}

VarientTwo.defaultProps = {
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
            featureImage: `/sample_media/375572_3_74044c3b4ecfde58cc717cab4eea94b4780de82b_large.jpg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376682_3_5cd8266a4d035f4d91a4197b27430203d69b0c74_large.jpg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376675_3_09873146bafc07c1bc5d720d6e8ddfb497d05193_large.jpg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376659_3_8c34e403f5fd57d6dbb486d08410cc464c5a9ddf_large.jpeg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376654_3_69a507d458b512899a16bc66bc8e0f3ac3245262_large.jpeg`
        },
        {
            href: `/836487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376685_3_b1858bed8ba21190a27a81f46af1e996d12dbb32_large.jpeg`
        },
    ],
    loadMore: false
}

export default VarientTwo