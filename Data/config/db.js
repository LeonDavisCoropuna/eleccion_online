import { createPool } from "mysql2/promise";
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "bananas_corp",
});

export { pool };
