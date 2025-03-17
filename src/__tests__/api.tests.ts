import request from "supertest";
import app from "../app";


type Repository = {
    name: string;
    owner: string;
    url: string;
}

describe("GET /repositories", () => {
    test("GET 200, responds with object with number of total matches and an array of repository objects that match search query", () => {
        return request(app)
            .get("/repositories?name=world")
            .expect(200)
            .then(({ body }) => {
                expect(typeof body.repos.total_count).toBe("number");
                expect(Array.isArray(body.repos.repositories)).toBe(true);
                body.repos.repositories.forEach((repository: Repository) => {
                    expect(repository).toMatchObject({
                        name: expect.any(String),
                        owner: expect.any(String),
                        url: expect.any(String)
                    })
                })
            })
    })


    test("GET 200, responds with an empty array if no matching repositories are found", () => {
        return request(app)
        .get("/repositories?name=arepositorythatdoesnotexist")
        .expect(200)
        .then(({ body }) => {
            expect(body.repos.total_count).toBe(0)
            expect(body.repos.repositories.length).toBe(0)
        })
    })
    

    test("GET 400, sends appropriate status and error message when name query parameter not given", () => {
        return request(app)
        .get("/repositories")
        .expect(400)
        .then(({ body }) => {
            expect(body.message).toBe("Query parameter 'name' is required")
        })
    })

    test("GET 404, sends appropriate status and error message when invalid route given", () => {
        return request(app)
        .get("/repository")
        .expect(404)
        .then(({ body }) => {
            expect(body.message).toBe("Route not found")
        })
    })
})