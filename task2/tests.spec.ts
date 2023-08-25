import superagent from "superagent";
import { MyPost } from "./models/myPost";
import { Post } from "./models/post";
import { PostUserService } from "./services/postUserService";
import { User } from "./models/user";
import { GeneralService } from "./services/generalService";

describe("Users creation tests", () => {

    const url = "https://jsonplaceholder.typicode.com/";
    let randomUser: User;
    let randomUserId: number;
    let randomPost: MyPost;
    let randomPostId: number;
    let post = new Post("title", "body");
    let updatedTitleValue: string = "Updated title";
    let updatedBodyValue: string = "Updated body";


    beforeEach(async () => {
        try {
            let allUsers: User[] = await PostUserService.getAllUsers(url);
            randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
            randomUserId = randomUser.ID;

            let allPosts = await PostUserService.getAllPosts(url);
            randomPost = allPosts[Math.floor(Math.random() * allPosts.length)];
            randomPostId = randomPost.ID;
        }
        catch (error: any) {
            console.log(error.message)
        };

    });

    test("Check 200 is returned after getting all users", async () => {
        let response = await GeneralService.getAllUsersResponse(url);
        expect(response.statusCode).toBe(200);

    })

    test("Check there are users in database", async () => {
        let users = await GeneralService.getAllUsers(url);
        expect(users.length).toBeGreaterThan(1);

    })

    test("Check 200 is returned after getting all posts", async () => {
        let response = await GeneralService.getAllPostsResponse(url);
        expect(response.statusCode).toBe(200);
    })

    test("Check there are posts in database", async () => {
        let posts = await GeneralService.getAllPosts(url);
        expect(posts.length).toBeGreaterThan(1);

    })

    test("Check post can be created for user", async () => {
        let response = await PostUserService.addPostToUser(url, post, randomUserId);
        expect(response.statusCode).toBe(201);
    })

    test("Check user can find created post in the list of all posts", async () => {
        await PostUserService.addPostToUser(url, post, randomUserId);
        let allPosts = await GeneralService.getAllPosts(url);
        let createdPost = allPosts.find(userPost => {
            userPost.Title === post.Title;
        });
        expect(createdPost).not.toBeUndefined();
    })

    test("Check deleted post can not be found in the list of all posts", async () => {
        await PostUserService.deletePostById(url, randomPostId);
        console.log(randomPostId + "random post")
        let allPosts = await GeneralService.getAllPosts(url);
        console.log(allPosts+"all poss");
        let deletedPost = allPosts.find(userPost => {
            return userPost.ID == randomPostId;
        });
        expect(deletedPost).toBeUndefined();
    })


    test("Check details of created post the same as sent", async () => {
        let response = await PostUserService.addPostToUser(url, post, randomUserId);
        const createdPostId = response.body.id;
        let myCreatedPost = await PostUserService.getPostById(url, createdPostId);
        expect(post.isEqual(myCreatedPost)).toBeTruthy();
    })

    test("Check 200 is returned upon post update", async () => {
        randomPost.Title = updatedTitleValue;
        randomPost.Body = updatedBodyValue;
        let response = await PostUserService.updatePost(url, randomPost, randomPostId);
        expect(response.statusCode).toEqual(200);
    })

    test("Check details of updated post the same as sent", async () => {
        randomPost.Title = updatedTitleValue;
        randomPost.Body = updatedBodyValue;
        await PostUserService.updatePost(url, randomPost, randomPostId);
        let updatedPost = await PostUserService.getPostById(url, randomPostId);
        expect(randomPost.isEqual(updatedPost)).toBeTruthy();
    })


    test("Check 200 is returned upon post deletion ", async () => {
        let response = await PostUserService.deletePostById(url, randomPostId);
        expect(response.statusCode).toBe(200);
    })

    test("Check 400 is returned upon deleted user update ", async () => {
        await PostUserService.deletePostById(url, randomPostId);
        randomPost.Title = "Updated  title";
        let response = await PostUserService.updatePost(url, randomPost, randomPostId)
        expect(response.statusCode).toBe(400);
    })

    test("Check 400 is returned upon deletion already deleted user ", async () => {
        await PostUserService.deletePostById(url, randomPostId);
        let response = await PostUserService.deletePostById(url, randomPostId);
        expect(response.statusCode).toBe(400);
    })

    test("Check 404 is returned upon getting details of deleted post", async () => {
        await PostUserService.deletePostById(url, randomPostId);
        let response = await PostUserService.getPostResponseById(url, randomPostId)
        expect(response.statusCode).toBe(404);
    })

    test("Check 200 is returned upon update post title ", async () => {
        const newTitleObject = {
            title: updatedTitleValue
        }
        let response = await PostUserService.updatePostField(url, randomPostId, newTitleObject);
        expect(response.statusCode).toBe(200);
    })

    test("Check details for updated post title  are the same as sent", async () => {
        const newTitleObject = {
            title: updatedTitleValue
        }
        await PostUserService.updatePostField(url, randomPostId, newTitleObject);
        let updatedPost = await PostUserService.getPostById(url, randomPostId);
        expect(updatedPost.Title).toEqual(updatedTitleValue);
    })

    test("Check details for updated post body are the same as sent", async () => {
        const newTitleObject = {
            body: updatedBodyValue
        }
        await PostUserService.updatePostField(url, randomPostId, newTitleObject);
        let updatedPost = await PostUserService.getPostById(url, randomPostId);
        expect(updatedPost.Body).toEqual(updatedBodyValue);
    })

    test("Check 400 is returned upon update of title of deleted post", async () => {
        const newTitleObject = {
            title: updatedTitleValue
        }
        await PostUserService.deletePostById(url, randomPostId);
        let response = await PostUserService.updatePostField(url, randomPostId, newTitleObject);
        expect(response.statusCode).toEqual(400);
    })


    test("Check 200 is returned upon update post body ", async () => {
        const newTitleObject = {
            body: updatedBodyValue
        }
        let response = await PostUserService.updatePostField(url, randomPostId, newTitleObject);
        expect(response.statusCode).toBe(200);
    })


})