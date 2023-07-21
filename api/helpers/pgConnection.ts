import { Pool } from "pg";
import config from "../config/env";

const { pgUser, pgPwd, pgUri, pgPort, pgDb } = config;

const pool = new Pool({
  host: pgUri,
  port: Number(pgPort),
  user: pgUser,
  password: pgPwd,
  database: pgDb,
});

export default pool;
