let res = document.getElementById('res')
let btn = document.getElementById('apagFab')

// Ao clicar no botão, tenta excluir o produto pelo ID informado
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const idProduto = Number(document.getElementById('idProduto').value)
    console.log(id)

    res.innerHTML = ''

    fetch(`http://localhost:3000/produto/${idProduto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => {
        if (resp.status === 204) {
            res.innerHTML += `Produto removido com sucesso!`
        } else {
            res.innerHTML += `Nenhum produto foi localizado com esse ID.`
        }
    })
    .catch((err) => {
        console.error('Ocorreu um erro ao tentar deletar o produto:', err)
    })
})
