const catchError = require('../utils/catchError');
const modelName = require('../models/Genre');
const Genre = require('../models/Genre');

const getAllGenre = catchError(async(req, res) => {
    const result = await Genre.findAll()
    return res.json(result)
});

const createGenre = catchError(async(req,res) => {
    result = await Genre.create(req.body)
    return res.status(200).json(result)

})

const getOneGenre = catchError(async(req,res) => {
    const {id} = req.params
    const result = await Genre.findByPk(id)
    if(!result) return res.sendStatus(404)
        return res.json(result)
        
})

const removeGenre = catchError(async(req,res) => {
    const {id} = req.params
    const result = await Genre.destroy({where : {id}})
    if(!result) return res.sendStatus(404)
        res.sendStatus(204)
})

const updateGenre = catchError(async(req,res) => {
    const {id} = req.params
    const result = await Genre.update(
        req.body,
        {where: {id}, returning:true}
    )
    if(result === 0) return res.sendStatus(404)
        return res.json(result[1][0])
})


module.exports = {
    getAllGenre,
    createGenre,
    getOneGenre,
    removeGenre,
    updateGenre
}