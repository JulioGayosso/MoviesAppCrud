const { getAllActor, createActor, getOneActor, removeActor, updateActor } = require('../controllers/actor.controllers');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')
    .get(getAllActor)
    .post(createActor);

routerActor.route('/:id')
    .get(getOneActor)
    .delete(removeActor)
    .put(updateActor);

module.exports = routerActor;