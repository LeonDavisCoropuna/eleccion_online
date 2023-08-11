import {pool} from "@/ldavis/data/config/db";
import ListResultVote from "@/ldavis/services/ListResultVote";
export default async function handleVote(req,res){
    const vote = req.body;

    try{
        const result = await ListResultVote.getListResult();
        return res.status(200).json(result)
    }
    catch (err){
        res.status(500).json({error: err})
    }
}