// import express from 'express'

const { sql, poolPromise } = require('../database/db')

class MainController {

  async getRanking(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .query("exec SPGetRanking")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async getJugador(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .input('playerID', sql.Int, req.params.id)
        .query("exec SPLoadPlayer @id = @playerID")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
  async updatePlayer(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise
        const result = await pool.request()
          .input('playerID', sql.VarChar, req.params.id)
          .input('playerColor', sql.VarChar, req.body.color)
          .input('playerPoints', sql.Int, req.body.puntaje)
          .input('playerDays', sql.Int, req.body.diasConsec)
          .query("exec SPUpdatePlayer @id = @playerID, @color = @playerColor, @puntaje = @playerPoints, @diasConsec = @playerDays")
        res.json(result)
      } else {
        res.send('Todos los campos obligatorios!')
      }
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }
}

const playerController = new MainController()
module.exports = playerController;