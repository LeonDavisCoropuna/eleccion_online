class PoliticalParty {
    constructor(id, politicalParty) {
        this._id = id;
        this._politicalParty = politicalParty;
    }

    // Getters
    get id() {
        return this._id;
    }

    get politicalParty() {
        return this._politicalParty;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set politicalParty(value) {
        this._politicalParty = value;
    }
}
export default PoliticalParty;