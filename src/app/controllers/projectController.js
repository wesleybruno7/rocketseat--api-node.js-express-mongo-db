const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Project = require('../models/Project')
const Task = require('../models/Task')

const router = express.Router()

router.use(authMiddleware)

// rota para listar todos os projetos
router.get('/', async (req, res) => {
    try {

        const projects = await Project.find()

        return res.send({ projects })

    } catch (err) {
        
        return res.status(400).send({ error: 'Error loading project' })

    }
})

// rota para listar um projeto em especifico
router.get('/:projectId', async (req, res) => {
    res.send({ user: req.userId })
})

// rota para criar o projeto
router.post('/', async (req, res) => {
    try {
        
        // const project = await Project.create(req.body)
        const project = await Project.create({ ...req.body, user: req.userId } )

        return res.send({ project })

    } catch (err) {
        
        return res.status(400).send({ error: 'Error creating new project' })

    }
})

// rota para alterar um projeto especifico
router.put('/:projectId', async (req, res) => {
    res.send({ user: req.userId })
})

// rota para deletar um projeto especifico
router.delete('/:projectId', async (req, res) => {
    res.send({ user: req.userId })
})

module.exports = app => app.use('/projects', router)