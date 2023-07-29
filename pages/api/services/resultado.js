import {pool} from "@/ldavis/Data/config/db";
export default async function handleResultado(req,res){
    const [result] = await pool.query("CALL sp_obtener_datos_partido_candidatos();");
    return res.status(200).json(result);
}