'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if(err) return res.status(500).send({ message: `Error al crear el usuario: ${err}`})

        return res.status(201).send({ token: service.createToken(user) })
    })
}

function signIn(req, res) {
    /* User.findOne({ email: req.body.email}, function (err, user) {
        if (err) return res.status(500).send({message: err})
        if (user.length === 0) return res.status(404).send({message: 'No existe el usuario.'})
        user.comparePassword(req.body.password, function (err,match) {
            if (err) return res.status(500).send({message: err})
    
            if (match) {
                res.status(200).send({
                message: 'Has iniciado sesión.',
                token: servicios.createToken(user)
                })
            } else {
                res.status(401).send({
                message: 'Datos incorrectos.'
                })
            }
        })
    
    }) */
    User.find({ email: req.body.email }, (err, user) => {
        if(err) return res.status(500).send({ message: err})
        if(!user) return res.status(404).send({ message: 'No exite el usuario' })

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signUp,
    signIn
}