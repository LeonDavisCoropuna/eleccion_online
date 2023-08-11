import React from 'react'
import { pool } from '@/ldavis/data/config/db'
import ListCandidate from "@/ldavis/services/ListCandidate";
export default async function handleCandidatos(req,res) {
    try{
        const result = await ListCandidate.getListCandidate();
        console.log(result)
        return res.status(200).json(result);
    } catch (err){
        return res.status(500).json({message: "Ocurrio algo"})
    }
}
