import axios from 'axios';
import {pool} from '@/ldavis/Data/config/db'
class LoginService {
    static async authenticate({username,password}) {
        try {
            const user = {
                username:username,
                password:password,
            }
            const response = await pool.query("SELECT * FROM persona WHERE username = ? and password = ?",[username,password])
            console.log(response.data);
            return response;
        } catch (error) {
            console.error('Error al obtener usuarios desde la base de datos:', error);
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            const response = await axios.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el usuario con ID ${id}:`, error);
            throw error;
        }
    }

    // Otras operaciones de acceso a la base de datos utilizando Axios
}

export default LoginService;