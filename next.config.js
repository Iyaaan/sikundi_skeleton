/** @type {import('next').NextConfig} */
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
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.gaafu.media',
                // port: '',
                pathname: '/**', 
            }
        ]
    }
}

module.exports = nextConfig
