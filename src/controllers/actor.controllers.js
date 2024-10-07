const catchError = require("../utils/catchError");
const modelName = require("../models/Actor");
const Actor = require("../models/Actor");

const getAllActor = catchError(async (req, res) => {
  const result = await Actor.findAll();
  return res.json(result);
});

const createActor = catchError(async (req, res) => {
  const result = await Actor.create(req.body);
  return res.status(201).json(result);
});

const getOneActor = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Actor.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const removeActor = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Actor.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const updateActor = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Actor.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAllActor,
  createActor,
  getOneActor,
  removeActor,
  updateActor
  
};
