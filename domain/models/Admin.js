import Person from "@/ldavis/domain/models/Person";
class Admin extends Person {
    constructor(id, name, lastName, username, job) {
        super(id, name, lastName, username, job);
        this.job = job;
    }
    // También podemos agregar getters y setters específicos para el atributo "email" si es necesario
    get job() {
        return this._job;
    }
    set job(value) {
        this._job = value;
    }
}
export default Admin;