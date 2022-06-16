const knex = require("knex");
require('dotenv').config();

const config = require("../knexfile");

const env = process.env.DB_ENV || "development";

const db = knex(config[env]);

export default db;