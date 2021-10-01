const express = require('express')
const asignar_adminRouter = express.Router()
const axios = require('axios')

asignar_adminRouter.get('/:nombre', (req,res)=>{
    res.render("asignar_admin")
});

asignar_adminRouter.post('/',(req, res) =>{
    const { nombre } = req.body
    console.log(nombre);
    console.log(`http://localhost:3001/api/updateAdmin/${nombre}`);
    axios.put(`http://localhost:3001/api/updateAdmin/${nombre}`, { 
        nombre: nombre
        })
        .then(function (response) {
            console.log(response);
        })
    res.redirect('addConcepto')
    //res.render('addConcepto')
})


module.exports = asignar_adminRouter