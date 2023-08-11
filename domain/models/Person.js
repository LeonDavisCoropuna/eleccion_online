class Person {
    constructor(id, name, lastName, username) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
    // Setters
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set username(value) {
        this._username = value;
    }
    // Getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get lastName() {
        return this._lastName;
    }

    get username() {
        return this._username;
    }
}
export default Person;
