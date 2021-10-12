// Server=tcp:plearniumserver.database.windows.net,1433;Initial Catalog=PlearniumDB;Persist Security Info=False;User ID=Terny;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
const sql = require('mssql')

const config = {
    user: 'Terny',
    password: 'Hola1234',
    database: 'PlearniumDB',
    server: 'plearniumserver.database.windows.net',
    options: {
    trustedConnection: true
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}