import CandidateRepository from "@/ldavis/data/repository/CandidateRepository";
class CandidateService {
    static async getCandidate() {
        try{
            return await CandidateRepository.getCandidate();
        } catch (error){
            return error;
        }
    }
}

export default CandidateService;
