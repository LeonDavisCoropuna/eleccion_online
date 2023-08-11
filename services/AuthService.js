import PersonService from "@/ldavis/domain/services/PersonService";

class AuthService {
    static async authenticate(username, password) {
        try{
            const res = await PersonService.getPerson(username,password)
            return res;
        } catch (error){
            return error;
        }
    }
}

export default AuthService;