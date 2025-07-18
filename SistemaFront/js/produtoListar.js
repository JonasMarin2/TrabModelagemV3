let res = document.getElementById('res')

let btn = document.getElementById('btn')

btn.addEventListener('click', ()=>{
    res.innerHTML = ''
    fetch(`http://localhost:3000/produto`)
    .then(resp => resp.json())
    .then(dados =>{
        dados.forEach(dad => {
            res.innerHTML += `{<br>${dad}<br>}<br>`
        })
    })
    .catch((err)=>{
        console.error('Erro ao listar os produtos!',err)
    })
})