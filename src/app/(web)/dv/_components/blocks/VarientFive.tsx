"use client"

import { ArrowDown2, ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import Image from "next/image"
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, HTMLAttributes, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { useRouter } from 'next/navigation'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import Link from 'next/link'
import { RefreshCcw } from 'lucide-react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    title?: string
    nextPage: number | null
    data: {
        href: string
        title: string
        featureImage: string
    }[]
    loadMore?: (page?: number) => Promise<{
        name: string | undefined;
        graphics: {
            href: string
            title: string
            featureImage: string
        }[] | undefined;
        nextPage: number | null;
    }>
}

const VarientFive:FC<Props> = ({title, data:d, loadMore, nextPage:n, ...props}) => {
    const router = useRouter()
    const swiperRef = useRef<any>(null)
    const [data, setData] = useState(d || [])
    const [loading, setLoading] = useState(false)
    const [nextPage, setNextPage] = useState<number | null>(n)

    return (
        <div {...props} className={twMerge(['container relative px-0', props.className])}>
            <div className='lg:rounded-lg bg-web-secondary dark:bg-web-secondary-dark lg:pb-20 lg:pt-14 pt-10 pb-14 px-4 lg:px-8 relative'>
                {title && <h1 className='col-span-4 text-center font-black text-4xl lg:text-8xl text-web-secondary dark:text-web-secondary-dark stroke-text-white lg:mb-16 mb-6'>
                    {title}
                </h1>}
                <div className='relative mb-14'>
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
                        {data?.map((post, index) => index <= 4 &&(
                            <SwiperSlide className='aspect-square' key={index} onClick={() => router.push(post.href)}>
                                <Image fill sizes="75vw" src={post.featureImage} alt={post.title} className='object-cover rounded-xl' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Button className='top-1/2 right-4 hidden lg:block -translate-y-1/2' onClick={()=>swiperRef.current.slidePrev()}>
                        <ArrowRight2 className='text-white' />
                    </Button>
                    <Button className='top-1/2 left-4 hidden lg:block -translate-y-1/2' onClick={()=>swiperRef.current.slideNext()}>
                        <ArrowLeft2 className='text-white' />
                    </Button>
                </div>
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
                    {data?.map((post, index) => index > 4 &&(
                        <Link href={post.href} className='aspect-square relative' key={index}>
                            <Image fill sizes="75vw" src={post.featureImage} alt={post.title} className='object-cover rounded-xl' />
                        </Link>
                    ))}
                </div>
                {(loadMore && nextPage) && <Button disabled={loading} className='left-1/2' onClick={async () => {
                    setLoading(true)
                    const { graphics, nextPage:page } = await loadMore(nextPage)
                    setNextPage(page)
                    // @ts-ignore
                    setData((d)=>[...d, ...graphics])
                    setLoading(false)
                }}>
                    {
                        loading ? <RefreshCcw className='animate-spin' /> :
                        <ArrowDown2 className='text-white' />
                    }
                    
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