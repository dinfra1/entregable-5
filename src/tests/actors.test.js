const supertest = require("supertest")
const app = require("../app")
require('../models')

let setActors;

test("POST -> '/api/v1/actors', should  return code 201", async()=>{

    const Actors = {
    firstName: "EDISNON", 
    lastName: "RAMIREZ",
    nationality: "COLOMBIANA",
    image: "https://plus.unsplash.com/premium_photo-1661700093968-b538c5a9f539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    birthday: 31-12-1996
    }

    const res = await supertest(app).post('/api/v1/actors')
    .send(Actors)

    setActors = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.lastName).toBe(Actors.lastName)
})

test("GET -> '/api/v1/actors', should return code 200", async()=>{

    const res = await supertest(app).get('/api/v1/actors')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

})

test("GETALL -> '/api/v1/actors/:id', should return 200", async()=>{

    const res = await supertest(app).get(`/api/v1/actors/${setActors}`)
    expect(res.status).toBe(200)
})

test("PUT -> '/api/v1/actors/:id'. shloud return 200", async()=>{
    const Actors = {
        firstName: "FABIAN"
    }

    const res = await supertest(app).put(`/api/v1/actors/${setActors}`)
    .send(Actors)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(Actors.firstName)
})

test("DELETE -> '/api/v1/actors/:id', shloud return 204", async()=>{

    const res = await supertest(app).delete(`/api/v1/actors/${setActors}`)
    expect(res.status).toBe(204)
})

