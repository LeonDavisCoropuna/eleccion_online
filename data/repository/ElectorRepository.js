import {pool} from "@/ldavis/data/config/db";
import Candidate from "@/ldavis/domain/models/Candidate";
import PoliticalParty from "@/ldavis/domain/models/PoliticalParty";
import {responseEncoding} from "axios";
class ElectorRepository {
    static async saveVote(vote) {
        try {
            const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?", vote._idElector);
            if (find.length > 0) {
                return {status:401}
            }
            const resp = await pool.query("INSERT INTO votos VALUES (?,?,?);", [vote._idElector, vote._idPoliticalParty, vote._date]);
            return {status:200}
        } catch (err) {
            return {status:500}
            //throw new Error("Error en la base de datos"); // o cualquier otro mensaje de error
        }
    }
    static async getPoliticalParty(){
        try{
            const [result] = await pool.query("SELECT * FROM partido_politico;");
            const listPoliticalParty = [];
            result.map(e=>{
                const newPoliticalParty = new PoliticalParty(e.id,e.partido);
                listPoliticalParty.push(newPoliticalParty);
            })
            return listPoliticalParty;
        }
        catch (err){
            return err;
        }
    }
}
export default ElectorRepository;
