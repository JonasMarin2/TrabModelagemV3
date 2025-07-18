const Usuario = require('./Usuario/')
const Produto = require('./Produto/')
const Compra = require('./Compra/')

Usuario.hasMany(Compra,{
    foreignKey: 'idUsuario',
    as: 'usuariosCompra',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Usuario,{
    foreignKey: 'idUsuario',
    as: 'compraUsuario',
    allowNull: false
})

Produto.hasMany(Compra,{
    foreignKey: 'idProduto',
    as: 'produtoCompra',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'compraProduto',
    allowNull: false
})

module.exports = { Usuario, Produto, Compra }