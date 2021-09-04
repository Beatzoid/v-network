declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        MONGODB_URL: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
    }
}
