class ResultVote {
    constructor(id, politicalParty, president, numVotes) {
        this._id = id;
        this._politicalParty = politicalParty;
        this._president = president;
        this._numVotes = numVotes;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set politicalParty(value) {
        this._politicalParty = value;
    }

    set president(value) {
        this._president = value;
    }

    set numVotes(value) {
        this._numVotes = value;
    }

    // Getters
    get id() {
        return this._id;
    }

    get politicalParty() {
        return this._politicalParty;
    }

    get president() {
        return this._president;
    }

    get numVotes() {
        return this._numVotes;
    }
}
export default ResultVote;