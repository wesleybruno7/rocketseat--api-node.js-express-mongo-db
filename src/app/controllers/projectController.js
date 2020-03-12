const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Project = require('../models/Project')
const Task = require('../models/Task')

const router = express.Router()

router.use(authMiddleware)

// rota para listar todos os projetos
router.get('/', async (req, res) => {
    try {

        // o .populate('user') ja executa um filtro trazendo todos os dados 
        //referentes ao usuario e o adiciona ao json da listagem de projetos
        const projects = await Project.find().populate(['user', 'tasks'])

        return res.send({ projects })

    } catch (err) {
        
        return res.status(400).send({ error: 'Error loading project' })

    }
})

// rota para listar um projeto em especifico
router.get('/:projectId', async (req, res) => {
    try {

        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks'])

        return res.send({ project })

    } catch (err) {
        
        return res.status(400).send({ error: 'Error loading project' })

    }
})

// rota para criar o projeto
router.post('/', async (req, res) => {
    try {

        const { title, description, tasks } = req.body
        // const project = await Project.create(req.body)
        // const project = await Project.create({ ...req.body, user: req.userId } )
        const project = await Project.create({ title, description , user: req.userId } )

        await Promise.all(tasks.map(async task => {

            const projectTask = new Task({ ...task, project: project._id })

            await projectTask.save()
            project.tasks.push(projectTask)

        }))

        await project.save()

        return res.send({ project })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new project' })

    }
})

// rota para alterar um projeto especifico
router.put('/:projectId', async (req, res) => {

    try {

        const { title, description, tasks } = req.body

        const project = await Project.findByIdAndUpdate(req.params.projectId, { 
            title, 
            description
        }, { new: true })

        project.tasks = []
        await Task.remove({ project: project._id })

        await Promise.all(tasks.map(async task => {

            const projectTask = new Task({ ...task, project: project._id })

            await projectTask.save()
            project.tasks.push(projectTask)

        }))

        await project.save()

        return res.send({ project })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating project' })

    }
    
})

// rota para deletar um projeto especifico
router.delete('/:projectId', async (req, res) => {
    try {

        await Project.findByIdAndRemove(req.params.projectId)

        return res.send()

    } catch (err) {
        
        return res.status(400).send({ error: 'Error deleteing project' })

    }
})

module.exports = app => app.use('/projects', router)