const express = require('express')
const juego_adminRouter = express.Router()
const axios = require('axios')

juego_adminRouter.get('',async(req,res)=>{
    //res.render('usuarios')
    try{
        const webAPI = await
        axios.get(`http://localhost:3001/api/getRanking/`) 
        //console.log(webAPI.data)
        res.render('juego_admin',{players: webAPI.data})
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

module.exports = juego_adminRouter