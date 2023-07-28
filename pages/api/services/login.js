import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { pool } from "@/ldavis/config/db";
export default async function loginHandle(req, res) {
  const { username, password } = req.body;
  const [result] = await pool.query("SELECT * FROM account WHERE username = ? AND password = ?",[username,password]);
  console.log(result)
  if(result.length === 0){
    return res.status(401).json({ error: "Invalid credentials" });
  }
  else{
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000 + 60 * 60),
        username: result[0].username,
        admin: result[0].admin,
      },
      "secret"
    );
    const serialized = serialize("MyTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.json("Login succesfully");
  }
  
}
