const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Actors = require('../models/Actors');
const Director = require('../models/Director');
const Genre = require('../models/Genre');



const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include:[Actors, Director, Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenres =  catchError(async(req, res)=>{
    const {id} =  req.params
    const movie = await Movie.findByPk(id)
    await movie.setGenres(req.body)

    const getGenre = await movie.getGenres()

    return res.json(getGenre)

})

const setDirector =  catchError(async(req, res)=>{
    const {id} =  req.params
    const movie = await Movie.findByPk(id)

    await movie.setDirectors(req.body)

    const setDirector = await movie.getDirectors()

    return res.json(setDirector)
})

const setActors = catchError(async(req, res)=>{
    const {id} = req.params
    const movie = await Movie.findByPk(id)

    await movie.setActors(req.body)

    const getActors = await movie.getActors()

    return res.json(getActors)
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setDirector,
    setActors
}