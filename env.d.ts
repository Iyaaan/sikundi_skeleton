declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test"
            SITE_NAME: String            
            NEXT_PUBLIC_SITE_NAME: String            
            DATABASE_URL: String            
            SHADOW_DATABASE_URL: String            
            REDIS_URL: String            
            CSRF_SECRET: String         
            ACCESS_TOKEN_SECRET: String
            NEXT_PUBLIC_APP_NAME: String
            NEXT_PUBLIC_CDN_URL: String
            GA_MEASUREMENT_ID: String
        }
    }
}

export {}