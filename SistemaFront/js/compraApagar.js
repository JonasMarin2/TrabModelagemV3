let res = document.getElementById('res')
let btn = document.getElementById('apagFab')

// Quando o botão for clicado, tenta apagar a compra com o ID informado
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const idCompra = Number(document.getElementById('idCompra').value)
    console.log(id)

    res.innerHTML = ''

    fetch(`http://localhost:3000/compra/${idCompra}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => {
        if (resp.status === 204) {
            res.innerHTML += `Compra removida com sucesso!`
        } else {
            res.innerHTML += `Não foi possível localizar essa compra.`
        }
    })
    .catch((err) => {
        console.error('Houve um problema ao tentar deletar a compra:', err)
    })

})
