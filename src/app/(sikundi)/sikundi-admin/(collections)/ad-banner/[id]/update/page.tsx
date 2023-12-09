import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import { notFound, redirect } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import getPermission from '@sikundi/lib/server/utils/getPermission'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: { 
        
    }

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        adBanner: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.adBanner?.draft || 
        permission?.adBanner?.delete || 
        permission?.adBanner?.soft_delete || 
        permission?.adBanner?.publish || 
        permission?.adBanner?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/ad-banner/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await adBanner({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' permission={{
            draft: permission?.adBanner?.draft,
            delete: permission?.adBanner?.delete, 
            soft_delete: permission?.adBanner?.soft_delete, 
            publish: permission?.adBanner?.publish,
            pending: permission?.adBanner?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"



const adBanner = async (query: Props) => {
    const adBannerSingle = await prisma.adBanner.findUnique({
        select: {
            id: true,
            altTxt: true,
            adType: true,
            url: true,
            status: true,
            adBanner: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true,
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (adBannerSingle === null) return notFound()
    return {
        ...adBannerSingle,
        url: adBannerSingle.url,
        createdBy: {
            value: adBannerSingle?.createdBy?.userName,
            label: adBannerSingle?.createdBy?.userName
        },
        adsUrl: adBannerSingle.adBanner?.url,
        language: {
            value: adBannerSingle?.language,
            label: adBannerSingle?.language === "EN" ? "English" : "Dhivehi"
        },
        adType: [
            // @ts-ignore
            {label: "Top banner", value: "t_banner"},
            // @ts-ignore
            {label: "Small side banner", value: "ss_banner"},
            // @ts-ignore
            {label: "Extra small side banner", value: "ess_banner"},
            // @ts-ignore
            {label: "Large side banner", value: "ls_banner"},
            // @ts-ignore
            {label: "Mid large banner", value: "ml_banner"},
            // @ts-ignore
            {label: "Mid small long banner", value: "msl_banner"},
            // @ts-ignore
            {label: "In article banner", value: "ia_banner"},
            // @ts-ignore
            {label: "Article end banner", value: "ae_banner"},
        ].filter((ad) => ad.value === adBannerSingle.adType)?.[0]
    }
}