import ElectorRepository from "@/ldavis/data/repository/ElectorRepository";
import Vote from "@/ldavis/domain/models/Vote";
class ElectorService {
    static async saveVote(vote) {
        const instanceVote = new Vote(vote.idElector,vote.idPoliticalParty,vote.date)
        try{
            return await ElectorRepository.saveVote(instanceVote);
        } catch (error){
            return error;
        }
    }
    static async getPoliticalParty(){
        try{
            return await ElectorRepository.getPoliticalParty();
        } catch (error){
            return error;
        }
    }
}

export default ElectorService;
