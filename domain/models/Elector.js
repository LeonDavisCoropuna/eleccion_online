import Person from "@/ldavis/domain/models/Person";
class Elector extends Person {
    constructor(id, name, lastName, username, email) {
        super(id, name, lastName, username);
        this.email = email;
    }
    // También podemos agregar getters y setters específicos para el atributo "email" si es necesario
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
}
export default Elector;