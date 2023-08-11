import {pool} from "@/ldavis/data/config/db";
import Elector from "@/ldavis/domain/models/Elector";
import Admin from "@/ldavis/domain/models/Admin";
class PersonRepository {
    static async getPerson(username,password) {
        try{
            const [result] = await pool.query(
                "SELECT * FROM persona WHERE username = ? AND password = ?",
                [username, password]
            );
            console.log(result);
            let person;
            if (result.length > 0) {
                const [admin] = await pool.query("SELECT * FROM administrador WHERE id = ?", result[0].id);
                if (admin.length === 0) {
                    person = new Elector(result[0].id, result[0].name, result[0].lastName, result[0].username, "ldavis@unsa.edu.pe");
                }else{
                    person = new Admin(result[0].id, result[0].name, result[0].lastName, result[0].username, "Gerente de Sistemas");
                }
                return {status:200,person}
            }
            else{
                return {status:401}
            }
        }catch (error){
            return error;
        }
    }
}

export default PersonRepository;
