import PersonRepository from "@/ldavis/data/repository/PersonRepository";
class PersonService {
    static async getPerson(username,password) {
        try{
            return await PersonRepository.getPerson(username,password);
        } catch (error){
            return error;
        }
    }
}

export default PersonService;
