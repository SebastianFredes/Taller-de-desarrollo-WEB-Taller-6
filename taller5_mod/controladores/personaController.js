'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

var Persona = require('../modelos/persona');

function creaPersona(req, res){

    let persona = new Persona()
    persona.nombre = req.body.nombre
    persona.apellido = req.body.apellido
    persona.save((err,personaStore)=>{

        if(err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({persona:personaStore})

    })

}

function listarpersonas(req, res){

    Persona.find({}).then(function (personas){
    res.send({personas});
    });

}

module.exports = {
    creaPersona,
    listarpersonas
};