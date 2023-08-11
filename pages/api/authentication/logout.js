import cookie from "cookie";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
export default function logoutHandler(req, res) {
  const { MyTokenName } = req.cookies;
  if (!MyTokenName) {
    return res.status(401).json({ err: "No token" });
  }
  try {
    verify(MyTokenName, "secret");
    const serialized = serialize("MyTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json("Logout Succesfully");
  } catch (err) {
    return res.status(401).json({ err: "No token" });
  }
}
