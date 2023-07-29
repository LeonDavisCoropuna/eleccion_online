import {pool} from "@/ldavis/Data/config/db";
export default async function handlePartidoPolitico(req,res){
    try{
        const [result] = await pool.query("SELECT * FROM partido_politico;");
        return res.status(200).json(result);
    }
    catch (err){
        res.status(500).json({error: err})
    }

}