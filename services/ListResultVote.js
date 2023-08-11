import ResultService from "@/ldavis/domain/services/ResultService";
class ListResultVote {
    static async getListResult() {
        try{
            const res = await ResultService.getResult();
            return res;
        } catch (error){
            return error;
        }
    }
}
export default ListResultVote;