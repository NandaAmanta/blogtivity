
export default () => ({
    database: {
        type: process.env.DATABASE_TYPE || 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME || 'auth',
    },
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h'
        },
        refreshToken: {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d'
        }
    },
    rabbitmq: {
        host : process.env.RABBITMQ_HOST || 'localhost',
        port : parseInt(process.env.RABBITMQ_PORT) || 5672,
        username : process.env.RABBITMQ_USER || 'guest',
        password : process.env.RABBITMQ_PASSWORD || 'guest',
        queue : process.env.RABBITMQ_QUEUE || 'auths_queue'
    }
});