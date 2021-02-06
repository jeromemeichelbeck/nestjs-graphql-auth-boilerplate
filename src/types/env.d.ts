declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DEV_COOKIE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_DB: string;
    REDIS_PASSWORD: string;
    REDIS_PREFIX: string;
    SESS_NAME: string;
    SESS_SECRET: string;
  }
}
