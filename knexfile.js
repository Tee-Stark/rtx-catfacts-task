// ORM configuration for Postgres database 
import config from './config.js';

export default {
    development: {
      client: 'postgres',
      connection: {
        host: config.service.db_host,
        database: config.service.db,
        user:     config.service.db_user,
        password: config.service.db_password
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './data/migrations',
      },
      seeds: { directory: './data/seeds' },
    },
  
    /* Working only with development environment */

        // testing: {
        //   client: 'pg',
        //   connection: config.service.db_url,
        //   migrations: {
        //     directory: './data/migrations',
        //   },
        //   seeds: { directory: './data/seeds' },
        // },
    
        // production: {
        //   client: 'pg',
        //   connection: config.service.db_url,
        //   migrations: {
        //     directory: './data/migrations',
        //   },
        //   seeds: { directory: './data/seeds' },
        // },
        
    /************************************************/
  };