"use client"

import { ArrowDown2, ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import Image from 'next/image'
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, HTMLAttributes, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { useRouter } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    data?: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
}

const VarientFive:FC<Props> = ({title, data = defaultProps.data, loadMore = defaultProps.loadMore, ...props}) => {
    const router = useRouter()
    const swiperRef = useRef<any>(null)

    return (
        <div {...props} className={twMerge(['container relative px-0', props.className])}>
            <div className='lg:rounded-[20px] bg-web-secondary dark:bg-web-secondary-dark lg:pb-20 lg:pt-14 pt-10 pb-14 px-4 lg:px-8 mb-6 relative'>
                {title && <h1 className='col-span-4 text-center font-black text-5xl lg:text-8xl text-web-secondary dark:text-web-secondary-dark stroke-text-white lg:mb-16 mb-6'>
                    {title}
                </h1>}
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 250,
                        modifier: 1,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className='lg:w-[calc(100%-200px)] w-full'
                    loop
                >
                    {data?.map((post, index) => (
                        <SwiperSlide className='aspect-square' key={index} onClick={() => router.push(post.href)}>
                            <Image fill src={post.featureImage} alt={post.title} className='object-cover rounded-xl' />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Button className='top-1/2 right-4 hidden lg:block' onClick={()=>swiperRef.current.slidePrev()}>
                    <ArrowRight2 className='text-white' />
                </Button>
                <Button className='top-1/2 left-4 hidden lg:block' onClick={()=>swiperRef.current.slideNext()}>
                    <ArrowLeft2 className='text-white' />
                </Button>
                {loadMore && <Button className='left-1/2 -translate-x-1/2 -bottom-5'>
                    <ArrowDown2 className='text-white' />
                </Button>}
            </div>
        </div>
    )
}

const defaultProps = {
    data: [
        {
            href: `/836342387`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/375572_3_74044c3b4ecfde58cc717cab4eea94b4780de82b_large.jpg`
        },
        {
            href: `/83644353453587`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376654_3_69a507d458b512899a16bc66bc8e0f3ac3245262_large.jpeg`
        },
        {
            href: `/83646587`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376656_3_626682d7f3d01d30c21445be86f3753251578a6b_large.jpg`
        },
        {
            href: `/836445645687`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376658_3_7a92e5368c3e329d6678aaf27c35e19a74102e10_large.jpeg`
        },
        {
            href: `/83665767487`, 
            title: `އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ`, 
            featureImage: `/sample_media/376659_3_8c34e403f5fd57d6dbb486d08410cc464c5a9ddf_large.jpeg`
        }
    ],
    loadMore: false
}

export default VarientFive

const Button:FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button {...props} className={twMerge([
            'block p-4 shadow-2xl rounded-xl bg-background-dark border border-gray-900 hover:scale-105 active:scale-95 absolute transition-all',
            props.className
        ])}>
            {props.children}
        </button>
    )
}