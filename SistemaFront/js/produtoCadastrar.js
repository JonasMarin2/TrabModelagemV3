document.addEventListener('DOMContentLoaded', () => {
    const api = document.getElementById('cadastrarAPI')
    const btn = document.getElementById('btn')

    // Ao clicar no botão da API, busca produtos da dummyjson e cadastra localmente
    api.addEventListener('click', () => {
        let a = true
        fetch('https://dummyjson.com/products')
            .then(resp => resp.json())
            .then(dados => {
                dados.products.forEach(dad => {
                    const valores = {
                        id: dad.id,
                        titulo: dad.title,
                        descricao: dad.description,
                        categoria: dad.category,
                        preco: dad.price,
                        percentualDesconto: dad.discountPercentage,
                        estoque: dad.stock,
                        marca: dad.brand,
                        imagem: dad.thumbnail
                    }

                    fetch('http://localhost:3000/produto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(valores)
                    })
                        .then(resp => resp.json())
                        .then(dados => {
                            console.log(`Produto ${dados.title} foi inserido com sucesso.`)
                        })
                })
            })
            .catch((err) => {
                a = false
                console.error('Não foi possível obter os dados da API:', err)
            })
        if (a) {
            window.alert('Produtos importados e cadastrados com êxito!')
        } else {
            window.alert('Falha ao cadastrar os produtos vindos da API.')
        }
    })

    // Ao clicar no botão, cadastra um novo produto com os dados do formulário
    btn.addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value
        const descricao = document.getElementById('descricao').value
        const categoria = document.getElementById('categoria').value
        const preco = Number(document.getElementById('preco').value)
        const percentualDesconto = Number(document.getElementById('percentualDesconto').value)
        const estoque = Number(document.getElementById('estoque').value)
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

        fetch(`http://localhost:3000/produto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(dados => {
                window.alert(`Produto "${dados.titulo}" foi cadastrado com sucesso!`)
            })
            .catch((err) => {
                console.error('Erro ao tentar salvar o produto:', err)
                window.alert('Não foi possível concluir o cadastro do produto.')
            })
    })
})
