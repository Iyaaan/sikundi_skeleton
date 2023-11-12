/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "gaafu.media",
                "www.gaafu.media"
            ],
            allowedForwardedHosts: [
                "localhost",
                "gaafu.media",
                "www.gaafu.media"
            ]
        }
    }
}

module.exports = nextConfig
