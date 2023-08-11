import Person from "@/ldavis/domain/models/Person";

class Candidate extends Person{
    constructor(id, name, lastName, username, job , politicalParty) {
        super(id, name, lastName, username, job);
        this.job = job;
        this.politicalParty = politicalParty;
    }
    // También podemos agregar getters y setters específicos para el atributo "email" si es necesario
    get job() {
        return this._job;
    }
    set job(value) {
        this._job = value;
    }
    get politicalParty() {
        return this._politicalParty;
    }
    set politicalParty(value) {
        this._politicalParty = value;
    }
}
export default Candidate;