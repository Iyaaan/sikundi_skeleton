'use client'

import React, { Fragment, ReactNode } from 'react'
import Script from 'next/script'

interface Props { 
    children: ReactNode
}

export default function AnalyticsProvider(props: Props) {
    const gaMeasurementId = 'your_measurement_id'
    const domain = 'https://www.googletagmanager.com'
    const reportDomain = 'https://www.google-analytics.com'

    if (process.env.NODE_ENV === "production") return (
        <Fragment>
            {props.children}
            <Script
                id="google-analytics-js-cdn"
                src={`${domain}/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || []
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date())
                    
                    gtag('config', '${gaMeasurementId}', {
                        page_path: window.location.pathname,
                        transport_url: '${reportDomain}',
                        first_party_collection: true
                    })
                `,
                }}
            />
        </Fragment>
    )

    return <Fragment>{props.children}</Fragment>
}