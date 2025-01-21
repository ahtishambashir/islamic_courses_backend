import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();


export default () => ({
  baseUrl: process.env.BASE_URL,
  basePath: process.env.BASE_PATH,
  port: parseInt(process.env.PORT, 10) || 3000,
  enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
  nodeEnv: process.env.NODE_ENV,
  logLevel: 'trace',

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING,
  },
  redis: {
    config: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    prefix: process.env.REDIS_PREFIX,
    enableRedisAuth: process.env.ENABLE_REDIS_AUTH === 'true',
    auth: process.env.REDIS_AUTH,
  },
});
