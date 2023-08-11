import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import AuthService from "@/ldavis/services/AuthService";
import Admin from "@/ldavis/domain/models/Admin";
const timeSessionElector = 5;
const timeSessionAdmin = 60*60;
export default async function loginHandle(req, res) {
    const { username, password } = req.body;
    try{
        const result = await AuthService.authenticate(username, password);
        if (result.status === 200) {
            const {person} = result;
            const userType = person instanceof Admin ? 2 : 1;
            const timeSession = userType == 2 ? timeSessionAdmin : timeSessionElector;
            const expirationTime = Math.floor(Date.now() / 1000 + timeSession);
            console.log()
            const token = jwt.sign(
                {
                    exp: expirationTime,
                    id: person.id,
                    username: person.username,
                    userType: userType,
                },
                "secret"
            );
            const serialized = serialize("MyTokenName", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: timeSession, // Use the same value as the token's expiration time
                path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            return res.status(200).json({ message: "Login successfully", userType: userType });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (e) {
        return res.status(401).json({error: "Contraseña o usuario invalido"})
    }

}