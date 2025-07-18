const Compra = require('../model/Compra')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Compra.create(valores)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Falha ao cadastrar os dados!', err)
        res.status(500).json({ message: 'Não foi possível cadastrar os dados!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Compra.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Falha ao listar os dados!', err)
        res.status(500).json({ message: 'Não foi possível listar os dados!' })
    }
}

const apagar = async (req, res) => {
    const idCompra = req.params.id
    try {
        const dados = await Compra.findByPk(idCompra)
        if (dados) {
            await Compra.destroy({ where: { idCompra: idCompra } })
            res.status(204).json({ message: 'Registro excluído com sucesso!' })
        } else {
            res.status(404).json({ message: 'Compra não encontrada!' })
        }
    } catch (err) {
        console.error('Falha ao excluir os dados!', err)
        res.status(500).json({ message: 'Erro ao excluir os dados!' })
    }
}

const atualizar = async (req, res) => {
    const idCompra = req.params.id
    const valores = req.body
    try {
        let dados = await Compra.findByPk(idCompra)
        if (dados) {
            await Compra.update(valores, { where: { idCompra: idCompra } })
            dados = await Compra.findByPk(idCompra)
            res.status(200).json(dados)
        } else {
            res.status(404).json({ message: 'Compra não localizada!' })
        }
    } catch (err) {
        console.error('Falha ao atualizar os dados!', err)
        res.status(500).json({ message: 'Erro ao atualizar os dados!' })
    }
}

module.exports = { cadastrar, listar, apagar, atualizar }
