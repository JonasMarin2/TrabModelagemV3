const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const Compra = conn.define('produto',{
    idCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'usuarios',
            key: 'id'
        }
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descontoAplicado: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precoFinal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.CHAR,
        allowNull: false
    }
},{
    tableName: 'compras',
    timestamps: false
})

module.exports = Compra
