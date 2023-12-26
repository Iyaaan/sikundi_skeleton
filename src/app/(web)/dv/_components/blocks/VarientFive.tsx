"use client"

import { ArrowDown2, ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import Image from "next/image"
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
    data: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: boolean
}

const VarientFive:FC<Props> = ({title, data, loadMore, ...props}) => {
    const router = useRouter()
    const swiperRef = useRef<any>(null)

    return (
        <div {...props} className={twMerge(['container relative px-0', props.className])}>
            <div className='lg:rounded-lg bg-web-secondary dark:bg-web-secondary-dark lg:pb-20 lg:pt-14 pt-10 pb-14 px-4 lg:px-8 mb-6 relative'>
                {title && <h1 className='col-span-4 text-center font-black text-4xl lg:text-8xl text-web-secondary dark:text-web-secondary-dark stroke-text-white lg:mb-16 mb-6'>
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