// import express from 'express'

const { sql, poolPromise } = require('../database/db')

class MainController {
  async cargaAcomoda(req, res) {
    try {
      const pool = await poolPromise
      const result = await pool.request()
        .input('idProceso', sql.Int, req.params.id_proceso)
        .query("exec SPCargaAcomoda @id_proceso = @idProceso")
      res.json(result.recordset)
    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }

}

const acomodaController = new MainController()
module.exports = acomodaController;