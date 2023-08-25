import superagent from "superagent";
import { MyPost } from "../models/myPost";
import { User } from "../models/user";

export class GeneralService {

    public static async getAllPosts(url) {
        let allPosts: MyPost[] = new Array()
        let postsRessponse = await superagent.get(url + "posts");
        postsRessponse.body.forEach((value) => {
            let post = new MyPost(value.title, value.body, value.userId, value.id);
            allPosts.push(post);
        })
        return allPosts;
    }

    public static async getAllPostsResponse(url) {
        return await superagent.get(url + "posts");
    }


    public static async getAllUsers(url) {
        let allUsers: User[] = new Array();
        let usersResponse = await superagent.get(url + "users");
        usersResponse.body.forEach((value) => {
            let user = new User(value.id, value.name);
            allUsers.push(user);
        })
        return allUsers;
    }

    public static async getAllUsersResponse(url) {
        return await superagent.get(url + "users");

    }
}