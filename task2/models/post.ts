import { MyPost } from "./myPost";

export class Post {

    private title: string;
    private body: string;
    private userId: number;


    constructor(title: string, body: string) {
        this.title = title;
        this.body = body;
    }

    set UserId(userId: number) {
        this.userId = userId;
    }

    public isEqual(post: MyPost) {
        return this.title === post.Title && this.body === post.Body;
    }

    get Title() {
        return this.title;
    }

    get Body() {
        return this.body;
    }

}