document.addEventListener('DOMContentLoaded', () => {
    const api = document.getElementById('cadastrarAPI')
    const btn = document.getElementById('btn')

    // Ao clicar no botão, busca usuários na API dummyjson e cadastra localmente
    api.addEventListener('click', () => {
        let sucesso = true
        fetch('https://dummyjson.com/user')
            .then(resp => resp.json())
            .then(dados => {
                console.log(dados.users)
                dados.users.forEach(dad => {
                    let numeroTelefoneFormatado = dad.phone
                    let numeroInteiro = numeroTelefoneFormatado.replace(/\D/g, '')
                    const valores = {
                        id: dad.id,
                        primeiroNome: dad.firstName,
                        sobrenome: dad.lastName,
                        idade: dad.age,
                        email: dad.email,
                        telefone: numeroInteiro,
                        endereco: dad.address.address,
                        cidade: dad.address.city,
                        estado: dad.address.state,
                        dataNasc: dad.birthDate
                    }
                    fetch('http://localhost:3000/usuario', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(valores)
                    })
                        .then(resp => resp.json())
                        .then(() => {
                            console.log(`Usuário ${dad.firstName} inserido com sucesso.`)
                        })
                })
            })
            .catch((err) => {
                sucesso = false
                console.error('Falha ao buscar os dados da API:', err)
            })
        if (sucesso) {
            window.alert('Todos os usuários foram cadastrados com sucesso!')
        } else {
            window.alert('Ocorreu um erro ao cadastrar os usuários.')
        }
    })

    // Ao clicar no botão, cadastra um usuário com os dados do formulário
    btn.addEventListener('click', () => {
        const primeiroNome = document.getElementById('primeiroNome').value
        const sobrenome = document.getElementById('sobrenome').value
        const idade = Number(document.getElementById('idade').value)
        const email = document.getElementById('email').value
        const telefone = document.getElementById('telefone').value
        const endereco = document.getElementById('endereco').value
        const cidade = document.getElementById('cidade').value
        const estado = document.getElementById('estado').value
        const dataNasc = document.getElementById('dataNasc').value

        const valores = {
            primeiroNome,
            sobrenome,
            idade,
            email,
            telefone,
            endereco,
            cidade,
            estado,
            dataNasc
        }

        fetch(`http://localhost:3000/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        })
            .then(resp => resp.json())
            .then(dados => {
                window.alert(`Usuário "${dados.nome}" cadastrado com sucesso!`)
            })
            .catch((err) => {
                console.error('Erro ao tentar salvar o usuário:', err)
                window.alert('Não foi possível concluir o cadastro do usuário.')
            })
    })
})
