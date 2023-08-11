import ElectorService from "@/ldavis/domain/services/ElectorService";

class VoteElector {
    static async sendVote(vote) {
        try{
            const res = await ElectorService.saveVote(vote)
            return res;
        } catch (error){
            return error;
        }
    }
    static  async getPoliticalParty(){
        try{
            const res = await ElectorService.getPoliticalParty()
            return res;
        } catch (error){
            return error;
        }
    }
}

export default VoteElector;