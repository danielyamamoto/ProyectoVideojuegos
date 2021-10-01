const { sql,poolPromise } = require('../database/db')

class MainController {

    async getConceptos(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPGetConceptos")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }
    async addConcepto(req , res){
        console.log('hola')
      try {
        if(req.body.nom_grupo != null && req.body.concepto != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('conceptoGrupo',sql.VarChar, req.body.nom_grupo)
          .input('conceptoNombre',sql.VarChar, req.body.concepto)
          .query("exec SPAddConcepto @nom_grupo= @conceptoGrupo, @concepto = @conceptoNombre")
          
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
          
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

}

const conceptoController = new MainController()
module.exports = conceptoController;