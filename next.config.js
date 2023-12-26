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
    assetPrefix: isProd ? 'https://cdn.gaafu.media' : undefined,
    crossOrigin: "anonymous",
    async headers() {
        return [
            {
                source: '/*',
                headers: [
                    {
                        key: 'access-control-allow-origin',
                        value: '*',
                    },
                ],
            }
        ]
      },
}

module.exports = nextConfig
