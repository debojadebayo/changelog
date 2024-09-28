import app from "../../server";
import supertest from "supertest";


const request = supertest(app);

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request.get("/")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Hey, how you doin??')
    })
});


// describe("POST /", () => {
//     it("should return 200 OK", async () => {
//         const response = await request.post("/")
//         expect(response.status).toBe(200)
//         expect(response.body.message).toBe('POST request to the homepage')
//     })
// })