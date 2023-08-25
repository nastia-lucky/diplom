import superagent from "superagent";
import { GeneralService } from "./generalService";
import { MyPost } from "../models/myPost";
import { Post } from "../models/post";
import { User } from "../models/user";

export class PostUserService extends GeneralService {

    public static async addPostToUser(url: string, post: Post, userId: number) {
        post.UserId = userId;
        return await superagent.post(url + "posts").send(post);
    }

    public static async updatePost(url: string, post: MyPost, postId: number) {
        return await superagent.put(url + "posts/" + postId).send(post);
    }

    public static async getPostById(url: string, postId: number) {
        let response = await superagent.get(url + "posts/" + postId);
        return new MyPost(response.body.title, response.body.body, response.body.userId, response.body.id);
    }

    public static async getPostResponseById(url: string, postId: number) {
        return await superagent.get(url + "posts/" + postId);
    }


    public static async deletePostById(url: string, postId: number) {
        return await superagent.delete(url + "posts/" + postId);
    }

    public static async updatePostField(url: string, postId: number, myObject: Object) {
        return await superagent.patch(url + "posts/" + postId).send(myObject);
    }

}