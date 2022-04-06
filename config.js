import { config } from 'dotenv';
config();

export default {
  service: {
    port: process.env.PORT,
    db: process.env.DB_DATABASE,
    db_user: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    env: process.env.NODE_ENV,
  },
  source: {
    url: process.env.SOURCE_API,
  }
}