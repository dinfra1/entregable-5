const express = require('express');
const routerGenre = require('./genre.routes');
const routerDirector = require('./director.routes');
const routerActors = require('./actors.routes');
const routerMovie = require('./movie.routes');
const router = express.Router();

router.use('/genres', routerGenre)
router.use('/actors', routerActors)
router.use('/directors', routerDirector)
router.use('/movies', routerMovie)




module.exports = router;