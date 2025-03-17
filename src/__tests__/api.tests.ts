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
                        id: expect.any(Number),
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
            expect(body.repos.repositories).toEqual([])
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


describe("POST /repositorydetails", () => {
    test("POST 200, returns object with repository details when provided with valid ID and search term object", () => {
        const searchTerm = {searchTerm: "world"}
        return request(app)
        .post("/repositorydetails?id=420875841")
        .send(searchTerm)
        .expect(200)
        .then(({ body }) => {
            expect(body.formattedRepo).toMatchObject({
                id: 420875841,
                name: 'world',
                description: 'A Laravel package which provides a list of the countries, states, cities, currencies, timezones and languages.',
                owner: 'nnjeim',
                forks_count: expect.any(Number),
                open_issues_count: expect.any(Number),
                watchers_count: expect.any(Number),
                language: 'PHP',
                html_url: 'https://github.com/nnjeim/world'
            })
        })
    })

    test("POST 200, returns an empty array when no repos found with search term", () => {
        const searchTerm = {searchTerm: "randomwordasthesearchterm"}
        return request(app)
        .post("/repositorydetails?id=420875841")
        .send(searchTerm)
        .expect(200)
        .then(({ body }) => {
            expect(body.formattedRepo).toEqual([])
        })
    })

    test("POST 404, returns relevant error message when ID not found in repos of a certain search term", () => {
        const searchTerm = {searchTerm: "world"}
        return request(app)
        .post("/repositorydetails?id=4")
        .send(searchTerm)
        .expect(404)
        .then(({ body }) => {
            expect(body.message).toBe("Id not found")
        })
    })
    
    test("POST 400, returns relevant error message when ID not given", () => {
        const searchTerm = {searchTerm: "world"}
        return request(app)
        .post("/repositorydetails")
        .send(searchTerm)
        .expect(400)
        .then(({ body }) => {
            expect(body.message).toBe("Query parameter 'id' is required")
        })

    })

    test("POST 400, returns relevant error message when search term not given", () => {
        const searchTerm = {searchTerm: ""}
        return request(app)
        .post("/repositorydetails?id=420875841")
        .send(searchTerm)
        .expect(400)
        .then(({ body }) => {
            expect(body.message).toBe("Missing search term field")
        })

    })
})