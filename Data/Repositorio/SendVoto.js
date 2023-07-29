import axios from 'axios';

class SendVoto {
    static async Sufragar(voto) {

            const response = await axios.post('/api/services/voto',voto);
            return response;

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

export default SendVoto;