const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
    
    const { email } = req.body
    try {

        if(await User.findOne({ email })) 
            return res.status(400).send({ error: 'User already exists' })
        
        const user = await User.create(req.body)

        user.passVisible = undefined
        user.password = undefined

        return res.send({ user })

    } catch (err) {

        console.log(err)
        return res.status(400).send({ error: 'Registration failed: ' })

    }

})

//recebe o app do src/index.js e retorna o app com o prefixo /auth.
module.exports = app => app.use('/auth', router)