const { Pool } = require("pg");
const { pgDb, pgPort, pgPwd, pgUri, pgUser } = require("../config/env");
const pool = new Pool({
  host: pgUri,
  port: pgPort,
  user: pgUser,
  password: pgPwd,
  database: pgDb,
});

module.exports = pool;
