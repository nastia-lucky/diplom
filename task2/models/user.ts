export class User {

    private id: number;
    private name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    get ID() {
        return this.id;
    }

    get Name() {
        return this.name;
    }


}