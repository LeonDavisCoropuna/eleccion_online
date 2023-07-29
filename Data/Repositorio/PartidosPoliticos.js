import axios from 'axios';
class PartidoPolitico {
    static async getPartidos() {
        try {
            const response = await axios.get('/api/services/partido_politico');
            return response;
        } catch (error) {
            console.error('Error al obtener resultados base de datos:', error);
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

export default PartidoPolitico;