const Usuario = require('../model/Usuario')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Usuario.create(valores)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Falha ao registrar os dados!', err)
        res.status(500).json({ message: 'Não foi possível registrar os dados!' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Falha ao recuperar os dados!', err)
        res.status(500).json({ message: 'Não foi possível recuperar os dados!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (dados) {
            await Usuario.destroy({ where: { id: id } })
            res.status(204).json({ message: 'Registro excluído com sucesso!' })
        } else {
            res.status(404).json({ message: 'Usuário não localizado!' })
        }
    } catch (err) {
        console.error('Falha ao excluir os dados!', err)
        res.status(500).json({ message: 'Erro ao excluir os dados!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Usuario.findByPk(id)
        if (dados) {
            await Usuario.update(valores, { where: { id: id } })
            dados = await Usuario.findByPk(id)
            res.status(200).json(dados)
        } else {
            res.status(404).json({ message: 'Usuário não encontrado!' })
        }
    } catch (err) {
        console.error('Falha ao atualizar os dados!', err)
        res.status(500).json({ message: 'Erro ao atualizar os dados!' })
    }
}

module.exports = { cadastrar, listar, apagar, atualizar }
