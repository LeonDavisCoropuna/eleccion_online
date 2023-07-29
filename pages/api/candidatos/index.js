import React from 'react'
import { pool } from '@/ldavis/Data/config/db'
export default async function handleCandidatos(req,res) {
    try{
        const [result] = await pool.query("CALL obtener_candidatos_por_partido();");
        return res.status(200).json(result);
    } catch (err){
        return res.status(500).json({message: "Ocurrio algo"})
    }
}
