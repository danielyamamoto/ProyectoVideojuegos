const { sql,poolPromise } = require('../database/db')

class MainController {
    async getUsuarios(req, res){
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .query("exec SPLoadUsers")
          res.json(result.recordset)
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getUsuario(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
            .input('usuarioID',sql.VarChar, req.params.id)
            .query("exec SPLoadUser @id = @usuarioID")
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addUsuario(req , res){
      try {
        if(req.body.id != null && req.body.password != null && req.body.nombre != null && req.body.email != null && req.body.tipo != null && req.body.id_grupo != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.body.id)
          .input('usuarioName',sql.VarChar, req.body.nombre)
          .input('usuarioPassword',sql.VarChar, req.body.password)
          .input('usuarioMail',sql.VarChar, req.body.email)
          .input('groupID',sql.Int, req.body.id_grupo)
          .input('usuariotypeID',sql.VarChar, req.body.tipo)
          .input('usuarioEstatus',sql.VarChar, req.body.estatus)
          .query("exec SPAddUser @id= @usuarioID, @password = @UsuarioPassword, @nombre = @usuarioName, @email = @usuarioMail, @estatus= @usuarioEstatus, @tipo = @usuariotypeID, @id_grupo = @groupID")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async createUser(req , res){ 
      try {
        if(req.body.id != null && req.body.password != null && req.body.nombre != null && req.body.email != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.body.id)
          .input('usuarioName',sql.VarChar, req.body.nombre)
          .input('usuarioPassword',sql.VarChar, req.body.password)
          .input('usuarioMail',sql.VarChar, req.body.email)
          .input('estatus',sql.VarChar, 'Activo')
          .input('tipo',sql.VarChar, 'Usuario')
          .input('grupoID',sql.Int, 0)
          .query("exec SPCreateUser @id= @usuarioID, @password = @UsuarioPassword, @nombre = @usuarioName, @email = @usuarioMail, @estatus = @estatus, @tipo = @tipo, @id_grupo = @grupoID")
          res.json(result)
        } else {
          res.send('Por favor llena todos los datos!')
        }
      } catch (error) {
        console.log(error)
        res.status(500)
        res.send(error.message)
      }
    }

    async updateUsuario(req, res) {
      try {
        if(req.body.nombre != null && req.body.id_grupo != null) {
          const pool = await poolPromise
          const result = await pool.request()
          .input('usuarioID',sql.VarChar, req.params.id)
          .input('groupID',sql.Int, req.body.id_grupo)
          .query("exec SPUpdateUserGroup @id = @usuarioID, @id_grupo = @groupID")
          res.json(result)
        } else {
          res.send('Todos los campos obligatorios!')
        }
      } catch (error) {
        res.status(500)
        res.send(error.message)
      }
    }

    async getUserbyEmail(req , res) {
      try {
          const pool = await poolPromise
          const result = await pool.request()
          .input('email',sql.VarChar, req.params.email)
          .query("exec SPLoadUserByEmail @email = @email")
          res.json(result.recordset)
      } catch (error) {
          console.error(error)
          res.status(500)
          res.send(error.message)
      }
  }

  async updateAdmin(req, res) {
    try {
      if(req.body.nombre != null) {
        const pool = await poolPromise
        const result = await pool.request()
        .input('usuarioNombre',sql.VarChar, req.params.nombre)
        .query("exec S @nombre = @usuarioNombre")
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

const userController = new MainController()
module.exports = userController;