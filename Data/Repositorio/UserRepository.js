import axios from 'axios';

class UserRepository {
    static async getUsers(user) {
        try {
            const response = await axios.post('/api/services/login',user);
            return response;
        } catch (error) {
            console.error('Error al obtener usuarios desde la base de datos:', error);
            throw error;
        }
    }

    // Otras operaciones de acceso a la base de datos utilizando Axios
}

export default UserRepository;