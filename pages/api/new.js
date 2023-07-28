import { pool } from "@/ldavis/config/db";

export default async function newHandle(req, res) {
  const { username, password } = req.body;
  try {
    const [result] = await pool.query("SELECT * FROM account WHERE username = ?", [username]);
    if (result.length === 0) {
      // El usuario no existe, se puede realizar la inserción
      const insert = await pool.query("INSERT INTO account VALUES (?,?,?)", [username, password, 0]);
      console.log(insert);
      return res.status(200).json({ message: "Inserción exitosa" });
    } else {
      // El usuario ya existe, no se permite la inserción
      console.log("Usuario repetido");
      return res.status(409).json({ message: "Usuario repetido" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Ocurrió un error" });
  }
}
