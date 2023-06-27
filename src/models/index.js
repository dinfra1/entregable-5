const Actors = require("./Actors");
const Movie = require("./Movie");
const Director = require("./Director");
const Genre = require("./Genre");

//TABLA QUE RELACIONA MUCHAS PELICULAS CON MUCHOS ACTORES

Movie.belongsToMany(Director, {through:"MovieDirector"})
Director.belongsToMany(Movie, {through:"MovieDirector"})

//tabla que relaciona movies con genre
Movie.belongsToMany(Genre, {through: "MovieGenre"})
Genre.belongsToMany(Movie, {through: "MovieGenre"})
//tabla que relaciona movies con actors
Movie.belongsToMany(Actors, {through: "MovieActors"})
Actors.belongsToMany(Movie, {through: "MovieActors"})
