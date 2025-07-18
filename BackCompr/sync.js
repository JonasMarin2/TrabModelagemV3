require('dotenv').config()
const conn = require('./db/conn')
const Usuario = require('./model/Usuario')
const Produto = require('./model/Produto')
const Compra = require('./model/Compra')

async function sincronizarBancoDeDados() {
    try {
        await Compra.drop({ force: true });
        console.log('Tabela Compra removida com sucesso (caso existisse).');
        await Produto.drop({ force: true });
        console.log('Tabela Produto removida com sucesso (caso existisse).');
        await Usuario.drop({ force: true });
        console.log('Tabela Usuario removida com sucesso (caso existisse).');
        await Usuario.sync({ force: true });
        console.log('Tabela Usuario criada com sucesso.');
        await Produto.sync({ force: true });
        console.log('Tabela Produto criada com sucesso.');
        await Compra.sync({ force: true });
        console.log('Tabela Compra criada com sucesso.');

        console.log('Tabelas atualizadas e banco de dados sincronizado!');
    } catch (err) {
        console.error('Erro ao criar as tabelas e sincronizar o banco de dados!', err);
    } finally {
        await conn.close();
        console.log('Conexão com o banco encerrada!');
    }
}

sincronizarBancoDeDados();
