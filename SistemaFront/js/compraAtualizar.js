document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn')

    // Quando o botão for clicado, pega os dados e atualiza a compra
    btn.addEventListener('click', () => {
        const idCompra = Number(document.getElementById('idCompra'))
        const idUsuario = Number(document.getElementById('idUsuario').value)
        const idProduto = Number(document.getElementById('idProduto').value)
        const quantidade = Number(document.getElementById('quantidade').value)
        const dataCompra = document.getElementById('dataCompra').value
        const precoUnitario = Number(document.getElementById('precoUnitario').value)
        const descontoAplicado = Number(document.getElementById('descontoAplicado').value)

        const precoFinal = precoUnitario - (precoUnitario * (descontoAplicado / 100))
        const formaPagamento = document.getElementById('formaPagamento').value
        const statusCompra = document.getElementById('statusCompra').value

        const valores = {
            idUsuario,
            idProduto,
            quantidade,
            dataCompra,
            precoUnitario,
            precoFinal,
            formaPagamento,
            statusCompra
        }

        fetch(`http://localhost:3000/compra/${idCompra}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(dados => {
                window.alert(`Informações da compra atualizadas com êxito!`)
            })
            .catch((err) => {
                console.error('Algo deu errado ao tentar atualizar a compra:', err)
                window.alert('Falha ao atualizar os dados da compra.')
            })
    })
})
