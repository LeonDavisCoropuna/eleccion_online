import React from 'react'
import { pool } from '@/ldavis/config/db'
export default async function handleCandidatos(req,res) {
    try{
        const [result] = await pool.query("SELECT * FROM account");
        return res.status(200).json(result);
    } catch (err){
        console.log(err)
        return res.status(500).json({message: "Ocurrio algo"})
    }
}
