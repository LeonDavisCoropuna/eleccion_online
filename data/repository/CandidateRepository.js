import {pool} from "@/ldavis/data/config/db";
import Candidate from "@/ldavis/domain/models/Candidate";
class CandidateRepository {
    static async getCandidate() {
        try{
            const [result] = await pool.query("CALL obtener_candidatos_por_partido();");
            const listCandidate = [];
            result[0].map(e=>{
                const newCandidate = new Candidate(e.id,e.name,e.lastName,e.username,e.cargo,e.nombre_partido);
                listCandidate.push(newCandidate);
            })
            return listCandidate;
        }
        catch (error){
            return error;
        }
    }
}

export default CandidateRepository;
