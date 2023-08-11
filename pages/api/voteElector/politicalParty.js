import {pool} from "@/ldavis/data/config/db";
import VoteElector from "@/ldavis/services/VoteElector";
export default async function handlePartidoPolitico(req,res){
    try{
        const result = await VoteElector.getPoliticalParty();
        return res.status(200).json(result);
    }
    catch (err){
        res.status(500).json({error: err})
    }
}