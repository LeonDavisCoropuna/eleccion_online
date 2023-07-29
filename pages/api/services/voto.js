import {pool} from "@/ldavis/Data/config/db";
export default async function handleVoto(req,res){
    const {id_elector,id_partido,fecha} = req.body;
    try{
        const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?",[id_elector]);
        if(find.length > 0){
            return res.status(401).json({message: "Usuario ya voto"})
        }
        const resp = await pool.query("INSERT INTO votos VALUES (?,?,?);",[id_elector,id_partido,fecha]);
        return res.status(200).json(resp);
    }
    catch (err){
        res.status(500).json({error: err})
    }

}