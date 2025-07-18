const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB_BANCO, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
})

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco realizada com sucesso.')
    })
    .catch((err) => {
        console.error('Falha ao conectar ao banco de dados:', err)
    })

module.exports = sequelize
