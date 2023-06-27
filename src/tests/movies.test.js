const supertest = require("supertest")
const app = require("../app");
const Genres = require("../models/Genre");
const Director = require("../models/Director");
require('../models')

let setMovie;

test("POST -> '/api/v1/movies', should  return code 201", async()=>{

    const Movie = {
        name: "EDINSON",
        image: "RAMIREZ",
        synopsis: "SE TRATA DE LA VIDA DE EDINSON RAMIREZ",
        releaseYear: 2020
    }

    const res = await supertest(app).post('/api/v1/movies')
    .send(Movie)

    setMovie = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.lastName).toBe(Movie.lastName)
})

test("GET -> '/api/v1/movies', should return code 200", async()=>{

    const res = await supertest(app).get('/api/v1/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].directors).toBeDefined()

})

test("PUT -> '/api/v1/movies/:id'. shloud return 200", async()=>{
    const Movie = {
        name: "FABIAN"
    }

    const res = await supertest(app).put(`/api/v1/movies/${setMovie}`)
    .send(Movie)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(Movie.firstName)
})

test("POST -> '/api/v1/movies/:id/genres', should return code 201", async()=>{
    
    const GenreBody = {
        name: "COMEDIA"
    }

    const genre = await Genres.create(GenreBody)

    const res = await supertest(app)
        .post(`/api/v1/movies/${setMovie}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})

test("POST -> '/api/v1/movies/:id/directors', should return code 200", async()=>{
    
    
    const DirectorBody = {
        firstName: "EDISNON", 
        lastName: "RAMIREZ",
        nationality: "COLOMBIANA",
        image: "https://plus.unsplash.com/premium_photo-1661700093968-b538c5a9f539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        birthday: 1996-12-31
        }

        const director = await Director.create(DirectorBody)

    const res = await supertest(app)
        .post(`/api/v1/movies/${setMovie}/directors`)
        .send([director.id])

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await director.destroy()
    
})


test("DELETE -> '/api/v1/movies/:id', shloud return 204", async()=>{

    const res = await supertest(app).delete(`/api/v1/movies/${setMovie}`)
    expect(res.status).toBe(204)
})

