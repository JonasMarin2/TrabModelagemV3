document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn')

    // Quando o botão for clicado, envia os dados atualizados do produto
    btn.addEventListener('click', () => {
        const idProduto = Number(document.getElementById('idProduto').value)
        const titulo = document.getElementById('titulo').value
        const descricao = document.getElementById('descricao').value
        const categoria = document.getElementById('categoria').value
        const preco = document.getElementById('preco').value
        const percentualDesconto = document.getElementById('percentualDesconto').value
        const estoque = document.getElementById('estoque').value
        const marca = document.getElementById('marca').value
        const imagem = document.getElementById('imagem').value

        const valores = {
            titulo,
            descricao,
            categoria,
            preco,
            percentualDesconto,
            estoque,
            marca,
            imagem
        }

        fetch(`http://localhost:3000/produto/${idProduto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(dados => {
                window.alert(`Informações do produto "${dados.titulo}" foram atualizadas com êxito!`)
            })
            .catch((err) => {
                console.error('Algo deu errado ao tentar atualizar os dados do produto:', err)
                window.alert('Não foi possível concluir a atualização do produto.')
            })
    })
})
