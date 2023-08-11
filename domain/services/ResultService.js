import ResultRepository from "@/ldavis/data/repository/ResultRepository";
class ResultService {
    static async getResult() {
        try{
            return await ResultRepository.getResult();
        } catch (error){
            return error;
        }
    }
}

export default ResultService;
