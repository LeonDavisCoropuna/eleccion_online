import {pool} from "@/ldavis/data/config/db";
import ResultVote from "@/ldavis/domain/models/ResultVote";
class ResultRepository{
    static async getResult(){
        try{
            const [result] = await pool.query("CALL sp_obtener_datos_partido_candidatos();");
            const listResults = [];
            result[0].map(e=>{
                const newPoliticalParty = new ResultVote(e.id_partido,e.nombre_partido,e.name + " " + e.lastName,e.nro_votos);
                listResults.push(newPoliticalParty);
            })
            return listResults;
        } catch (error){
            return error
        }
    }
}
export default ResultRepository;