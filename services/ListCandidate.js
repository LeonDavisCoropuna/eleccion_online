import CandidateService from "@/ldavis/domain/services/CandidateService";
class ListCandidate {
    static async getListCandidate() {
        try{
            const res = await CandidateService.getCandidate();
            return res;
        } catch (error){
            return error;
        }
    }
}
export default ListCandidate;