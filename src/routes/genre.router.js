const {getAllGenre, createGenre, getOneGenre, removeGenre, updateGenre } = require('../controllers/genre.controllers');
const express = require('express');


const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAllGenre)
    .post(createGenre);

routerGenre.route('/:id')
    .get(getOneGenre)
    .delete(removeGenre)
    .put(updateGenre);

module.exports = routerGenre;