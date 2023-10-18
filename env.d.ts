declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test"
            SITE_NAME: String            
            DATABASE_URL: String            
            SHADOW_DATABASE_URL: String            
            REDIS_URL: String            
            CSRF_SECRET: String         
        }
    }
}

export {}