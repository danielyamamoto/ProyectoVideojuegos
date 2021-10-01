const express = require('express')
const configuracionRouter = express.Router()
const axios = require('axios')

configuracionRouter.get('', (req,res)=>{

    res.render("configuracion")
//res.render('usuarios')
});

configuracionRouter.post('',(req, res) =>{
    const { nom_grupo, concepto  } = req.body


    axios.post('http://localhost:3001/api/addConcepto', { 
        nom_grupo: nom_grupo,
        concepto: concepto
        })
        .then(function (response) {
            console.log(response);
        })

    //res.redirect('home')
    res.redirect('addConcepto')
})


module.exports = configuracionRouter