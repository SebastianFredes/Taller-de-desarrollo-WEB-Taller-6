'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require('./modelos/product')
var PersonaController = require('./controladores/personaController');

const app = express()
app.use((req, res, next)=>{

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.post('/persona', PersonaController.creaPersona);

app.get('/personas', PersonaController.listarpersonas);

app.get('/hola',(req,res)=>{

    res.status(200).send({message:"Bienvenido"})

})

app.get('/api/product',(req,res)=>{

    res.status(200).send('Aqui devolveremos los productos')

})

app.get('/api/product/:productId',(req,res)=>{

    let ProductId = req.params.productId
    Product.findById(ProductId,(err,product)=>{

        if(err) return res.status(500).send({message: 'error al realizar peticion'})
        if(!product) return res.status(404).send({message: 'error el producto no existe'})

        res.status(200).send({product})

    })

})

/* TAREA TALLER 5 */

/*  PUT   */
app.post('/api/product/:productId/update',(req,res)=>{

    let ProductId = req.params.productId
    Product.findByIdAndUpdate(ProductId, {$set: req.body},(err,product)=>{

        if(err) return res.status(500).send({message: 'error al actualizar'})
        if(!product) return res.status(404).send({message: 'error el producto no existe'})

        res.status(200).send('Producto actualizado')

    })

})

/*  DELETE    */
app.post('/api/product/:productId/delete',(req,res)=>{

    let ProductId = req.params.productId
    Product.findByIdAndRemove(ProductId,(err,product)=>{

        if(err) return res.status(500).send({message: 'error al eliminar'})
        if(!product) return res.status(404).send({message: 'error el producto no existe'})

        res.status(200).send('Producto eliminado')

    })

})

app.post('/api/product',(req,res)=>{

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStore)=>{

        if(err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({product:productStore})

    })


})

mongoose.connect('mongodb+srv://sebastianfredes:Carrillo7@cluster0-lhgxm.gcp.mongodb.net/test?retryWrites=true&w=majority',(err,res)=>{
//AGREGAR IP ACTUAL EN LA WHITELIST DE mongoDB

    if(err) throw err
    console.log('Conexion establecida')

    app.listen(8000,()=>{

        console.log("Esta corriendo en el puerto 8000")

    })

})

