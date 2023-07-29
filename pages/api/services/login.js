import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { pool } from "@/ldavis/Data/config/db";
import {useEffect} from "react";

export default async function loginHandle(req, res) {
    const { username, password } = req.body;
    const [result] = await pool.query(
        "SELECT * FROM persona WHERE username = ? AND password = ?",
        [username, password]
    );

    if (result.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
    } else {
        const [admin] = await pool.query("SELECT * FROM administrador WHERE id = ?", [result[0].id]);
        let administrador = 1;

        if (admin.length > 0) {
            administrador = 2;
        }

        let timeSession = 10;
        //para administradores la sesion es de maximo 1 hora
        if(administrador === 2)
            timeSession = 60*60;
        const expirationTime = Math.floor(Date.now() / 1000 + timeSession); // 10 seconds
        const token = jwt.sign(
            {
                exp: expirationTime,
                id: result[0].id,
                username: result[0].username,
                userType: administrador,
            },
            "secret"
        );

        const serialized = serialize("MyTokenName", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: expirationTime, // Use the same value as the token's expiration time
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({ message: "Login successfully", userType: administrador });    }
}
