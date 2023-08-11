class Vote {
    constructor(idElector, idPoliticalParty, date) {
        this._idElector = idElector;
        this._idPoliticalParty = idPoliticalParty;
        this._date = date;
    }

    // Setters
    set idElector(value) {
        this._idElector = value;
    }

    set idPoliticalParty(value) {
        this._idPoliticalParty = value;
    }

    set date(value) {
        this._date = value;
    }

    // Getters
    get idElector() {
        return this._idElector;
    }

    get idPoliticalParty() {
        return this._idPoliticalParty;
    }

    get date() {
        return this._date;
    }
}
export default Vote;