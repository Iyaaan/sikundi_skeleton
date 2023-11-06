import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import PostMediumCard from '@sikundi/components/web/cards/PostMediumCard'
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

const VarientThree:FC<Props> = ({title, data = defaultProps.data, loadMore = defaultProps.loadMore, ...props}) => {
    return (
        <div {...props} className={twMerge(['relative container px-0', props.className])}>
            <div className='mb-6 lg:rounded-[20px] bg-web-secondary dark:bg-web-secondary-dark pb-20 pt-14 px-0 lg:px-8'>
                {title && <h1 className='col-span-4 text-center font-black text-5xl lg:text-8xl text-web-secondary dark:text-web-secondary-dark stroke-text-white stroke-text-white mb-16'>
                    {title}
                </h1>}
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
                    <PostMediumCard href={"/836487"}
                        className="row-span-2 col-span-2 mb-9 lg:mb-0"
                        data={{
                            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ!`,
                            description: `މާލީ ބަޔާނުގައި ބަޔާންކޮށްފައިވާ އަދަދުތަކާއި އިދާރާގެ ހިސާބުތަކާ ދިމާނުވާ މައްސަލަ ފާހަގަކޮށް އެ ރިޕޯޓްގައި ބުނެފައި ވަނީ، 2020 ވަނަ އަހަރުގެ މާލީ ބަޔާނުގެ "ފައިސާ ލިބުނުގޮތާއި ހޭދަ ކުރެވުނު ގޮތުގެ....`,
                            featureImage: `/sample_media/375132_3_72cfc07865b235acfb7e85032271760b10cb82e2_large.jpeg`
                        }}
                    /> 
                    <div className='grid grid-cols-2 gap-4 col-span-2 px-4 lg:p-0'>
                        {data?.map((post, index) => (
                            <PostSmallCard href={post.href} key={index}
                                className='text-white'
                                data={{
                                    title: post.title,
                                    featureImage: post.featureImage
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {loadMore && <button className='block p-4 shadow-2xl rounded-xl absolute left-1/2 -translate-x-1/2 -bottom-5 bg-web-secondary dark:bg-web-secondary-dark border border-gray-800 dark:border-gray-900 hover:scale-105 active:scale-95 transition-all'>
                <ArrowDown2 className='text-white' />
            </button>}
        </div>
    )
}

const defaultProps = {
    data: [
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
        }
    ],
    loadMore: false
}

export default VarientThree