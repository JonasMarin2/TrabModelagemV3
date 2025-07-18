document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn')

    // Ao clicar no botão, envia os dados para cadastrar uma nova compra
    btn.addEventListener('click', () => {
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

        fetch(`http://localhost:3000/compra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(dados => {
                window.alert(`Nova compra registrada com êxito!`)
            })
            .catch((err) => {
                console.error('Ocorreu um erro ao tentar registrar a compra:', err)
                window.alert('Não foi possível finalizar o cadastro da compra.')
            })
    })
})
