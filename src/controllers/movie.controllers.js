const catchError = require("../utils/catchError");
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({
    include: [
      {
        model: Genre,
      },
      {
        model: Actor,
      },
      {
        model: Director,
      },
    ],
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id, {
    include: [
      {
        model: Genre,
      },
      {
        model: Actor,
      },
      {
        model: Director,
      },
    ],
  });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

//paso 1 identifico la pelicula
//paso 2 setear generos
//paso 3 obtengo los  generos seteados
// paso 4 doy la vista

const setGenres = catchError(async (req, res) => {
  // 1 localizo la pelicula
  const { id } = req.params;
  const movies = await Movie.findByPk(id);

  //2 seteo los generos a la pelicula localizada
  await movies.setGenres(req.body);

  //3 Obtener los generos seteados
  const genres = await movies.getGenres();

  return res.json(genres);
});

const setActors = catchError(async(req,res) => {
      // 1 localizo la pelicula
  const { id } = req.params;
  const movies = await Movie.findByPk(id);
 //seteo los actores a la pelicula localizada
  await movies.setActors(req.body)
//obtengoi los actores  seteados
  const actors = await movies.getActors()

  return res.json(actors)
})


const setDirectors = catchError(async(req,res) => {
    //localizo la pelicula
    const {id} = req.params
    const movies = await Movie.findByPk(id)
    //seteamos los directores  a la pelicula localiza
    await movies.setDirectors(req.body)
    //obtengo los directores seteados
    const directors = await movies.getDirectors()
    return res.json(directors)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenres,
  setActors,
  setDirectors
};
