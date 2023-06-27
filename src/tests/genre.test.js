const supertest = require("supertest")
const app = require("../app")
require('../models')

let setGenres;

test("POST -> '/api/v1/genres', should  return code 201", async()=>{

    const Genres = {
    name: "TITANIC"
    }

    const res = await supertest(app).post('/api/v1/genres')
    .send(Genres)

    setGenres = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.lastName).toBe(Genres.lastName)
})

test("GET -> '/api/v1/genres', should return code 200", async()=>{

    const res = await supertest(app).get('/api/v1/genres')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

})

test("GETALL -> '/api/v1/genres/:id', should return 200", async()=>{

    const res = await supertest(app).get(`/api/v1/genres/${setGenres}`)
    expect(res.status).toBe(200)
})

test("PUT -> '/api/v1/genres/:id'. shloud return 200", async()=>{
    const Genres = {
        name: "EL ZORRON"
    }

    const res = await supertest(app).put(`/api/v1/genres/${setGenres}`)
    .send(Genres)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(Genres.firstName)
})

test("DELETE -> '/api/v1/genres/:id', shloud return 204", async()=>{

    const res = await supertest(app).delete(`/api/v1/genres/${setGenres}`)
    expect(res.status).toBe(204)
})