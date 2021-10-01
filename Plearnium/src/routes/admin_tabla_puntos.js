const express = require('express')
const usuariosRouter = express.Router()
const axios = require('axios')

usuariosRouter.get('',async(req,res)=>{
    //res.render('usuarios')
    try{
        const webAPI = await
        axios.get(`http://localhost:3001/api/getusuarios/`) 
        //console.log(webAPI.data)
        res.render('usuario',{users:webAPI.data})
    }catch(err){
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        }else if(err.request){
            console.log(err.request)
        }else{
            console.error('Error',err.message)
        }
    }
})

module.exports = usuariosRouter