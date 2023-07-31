import jwt from "jsonwebtoken";  //uso de tokens serializados
import { serialize } from "cookie";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default async function loginHandle(req, res) {
    const { username, password } = req.body;
    //esto deberia retornarlo el back-end en una consulta query
    const userValidate = {
        id: 5,
        username: "ldavis",
        password: 123,
        userType: 2, //los admins tienen acceso a /resultado y los electores a /votacion
    }
    if(username == userValidate.username && password == userValidate.password){
        try{
            //para los electores es de 10 segundos
            let timeSession = 10;
            //para administradores la sesion es de maximo 1 hora
            if(userValidate.userType === 2) //si el tipo es 2, significa que es admin
                timeSession = 60*60;
            const expirationTime = Math.floor(Date.now() / 1000 + timeSession);
            const token = jwt.sign(
                {
                    exp: expirationTime,
                    id: userValidate.id,
                    username: userValidate.username,
                    userType: userValidate.userType,
                },
                "secret"
            );
            const serialized = serialize("MyTokenName", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: expirationTime, // tiempo del token
                path: "/",
            });
            res.setHeader("Set-Cookie", serialized);
            return res.status(200).json({ message: "Login successfully", userType: userValidate.userType  });
        } catch (err){
            console.log(err)
            return res.status(500).json(err)
        }
    }
    else {
        return res.status(401).json({message: "Credenciales invalidas"})
    }
}
