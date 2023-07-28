import React from 'react'
import { pool } from '@/ldavis/config/db'
export default async function handleCandidatos(req,res) {
    try{
        const [result] = await pool.query("CALL obtener_candidatos_por_partido();");
        console.log(result)
        return res.status(200).json(result);
    } catch (err){
        console.log(err)
        return res.status(500).json({message: "Ocurrio algo"})
    }
}
