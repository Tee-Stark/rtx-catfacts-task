import knex from 'knex';
import config from '../config.js';

import knexfile from '../knexfile.js';

const env = config.service.env || "development";
const configOptions = knexfile[env];

export default knex(configOptions);
