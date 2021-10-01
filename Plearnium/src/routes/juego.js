const express = require('express')
const juegoRouter = express.Router()
const axios = require('axios')

juegoRouter.get('', async(req, res) => {
    try {
        const webAPI = await
        axios.get(`http://localhost:3001/api/getRanking/`) 
        res.render('juego', {players: webAPI.data, user: req.user})
    } catch(err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.error('Error',err.message)
        }
    }
})

module.exports = juegoRouter