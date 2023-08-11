import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { MyTokenName } = req.cookies;
  if(!MyTokenName){
    return res.status(401).json({err : 'No token'})
    }
  try {
    const user = verify(MyTokenName, "secret");
    return res.json({username: user.username, exp: user.exp/60,id:user.id});
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
