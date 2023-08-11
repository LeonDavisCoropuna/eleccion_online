import {pool} from "@/ldavis/data/config/db";
import VoteElector from "@/ldavis/services/VoteElector";
export default async function handleVote(req,res){
    const vote = req.body;

    try{
        const result = await VoteElector.sendVote(vote);
        if(result.status === 200){
            return res.status(200).json({message: "Voto correcto"})
        }
        else if(result.status === 401){
            return res.status(401).json({message: "Usuario ya voto"})
        }
        console.log(result)
        return res.status(500).json({message: "Ocurrio un error"})
    }
    catch (err){
        res.status(500).json({error: err})
    }
}