let res = document.getElementById('res')
let btn = document.getElementById('apagFab')

// Quando clicar no botão, tenta remover o usuário pelo ID informado
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const idUsuario = Number(document.getElementById('idUsuario').value)
    console.log(id)

    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => {
        if (resp.status === 204) {
            res.innerHTML += `Usuário removido com sucesso!`
        } else {
            res.innerHTML += `Nenhum usuário foi encontrado com esse ID.`
        }
    })
    .catch((err) => {
        console.error('Ocorreu um erro ao tentar excluir o usuário:', err)
    })
})
