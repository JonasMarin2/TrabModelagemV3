const Produto = require('../model/produtos')

const cadastrar = async (req, res) => {
  const valores = req.body
  try {
    const dados = await Produto.create(valores)
    res.status(201).json(dados) // 201 Created é o ideal para POST
  } catch (err) {
    console.error('Erro ao cadastrar os dados!', err)
    res.status(500).json({ message: 'Erro ao cadastrar os dados!' })
  }
}

const listar = async (req, res) => {
  try {
    const dados = await Produto.findAll()
    res.status(200).json(dados)
  } catch (err) {
    console.error('Erro ao listar os dados!', err)
    res.status(500).json({ message: 'Erro ao listar os dados!' })
  }
}

const apagar = async (req, res) => {
  const id = req.params.id
  try {
    const dados = await Produto.findByPk(id)
    if (dados) {
      await Produto.destroy({ where: { id } })
      res.status(204).end() // 204 No Content não deve ter corpo
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' })
    }
  } catch (err) {
    console.error('Erro ao apagar os dados!', err)
    res.status(500).json({ message: 'Erro ao apagar os dados!' })
  }
}

const atualizar = async (req, res) => {
  const id = req.params.id
  const valores = req.body
  try {
    let dados = await Produto.findByPk(id)
    if (dados) {
      await Produto.update(valores, { where: { id } })
      dados = await Produto.findByPk(id)
      res.status(200).json(dados)
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' })
    }
  } catch (err) {
    console.error('Erro ao atualizar os dados!', err)
    res.status(500).json({ message: 'Erro ao atualizar os dados!' })
  }
}

const findbyid = async (req, res) => {
  const id = req.params.id
  try {
    const dados = await Produto.findByPk(id)
    if (dados) {
      res.status(200).json(dados)
    } else {
      res.status(404).json({ message: 'Produto não encontrado!' })
    }
  } catch (err) {
    console.error('Erro ao buscar os dados!', err)
    res.status(500).json({ message: 'Erro ao buscar os dados!' })
  }
}

module.exports = { cadastrar, listar, apagar, atualizar, findbyid }
