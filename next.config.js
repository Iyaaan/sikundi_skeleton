/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "gaafu.media",
                "www.gaafu.media",
                "sikundi.io",
                "www.sikundi.io"
            ],
            allowedForwardedHosts: [
                "localhost",
                "gaafu.media",
                "www.gaafu.media",
                "sikundi.io",
                "www.sikundi.io"
            ]
        }
    },
    async headers() {
        return [
            {
                source: '/_next/image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=14400, must-revalidate',
                    }
                ],
            },
        ]
    },
}

module.exports = nextConfig
