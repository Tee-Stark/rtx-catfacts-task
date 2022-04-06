import knex from 'knex';
import config from '../config';

import knexfile from '../knexfile';

const env = config.service.env || "development";
const configOptions = knexfile[env];

module.exports = knex(configOptions);
