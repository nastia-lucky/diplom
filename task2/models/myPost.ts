
export class MyPost {


    private title: string;
    private body: string;
    private userId: number;
    private id: number;

    constructor(title: string, body: string, userId: number, id: number) {
        this.title = title;
        this.body = body;
        this.userId = userId;
        this.id = id;
    }

    get ID() {
        return this.id;
    }

    get Title() {
        return this.title;
    }

    get Body() {
        return this.body;
    }

    set Title(title: string) {
        this.title = title;
    }

    set Body(body: string) {
        this.body = body;
    }

    public isEqual(post: MyPost) {
        return this.title == post.Title && this.body == post.Body;
    }




}