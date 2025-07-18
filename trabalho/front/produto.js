let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

// Cadastro de novo produto
cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const valores = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        percentualDesconto: parseFloat(document.getElementById('percentualDesconto').value),
        estoque: parseInt(document.getElementById('estoque').value),
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
        return resp.json();
    })
    .then(dados => {
        res.innerHTML = `<p style="color:green;">Produto registrado! ID gerado: ${dados.id}</p>`;
    })
    .catch(err => {
        console.error('Falha ao cadastrar produto:', err);
        res.innerHTML = `<p style="color:red;">Não foi possível concluir o cadastro.</p>`;
    });
});

// Listagem de produtos
const listarBtn = document.getElementById('listar');
const tabelaProdutos = document.querySelector('#produtos-table tbody');

listarBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/produto')
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
        return resp.json();
    })
    .then(produtos => {
        tabelaProdutos.innerHTML = '';

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.titulo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.categoria}</td>
                <td>${produto.preco.toFixed(2)}</td>
                <td>${produto.percentualDesconto.toFixed(2)}</td>
                <td>${produto.estoque}</td>
                <td>${produto.marca}</td>
                <td><img src="${produto.imagem}" width="50" alt="imagem" /></td>
            `;
            tabelaProdutos.appendChild(linha);
        });
    })
    .catch(err => {
        console.error('Erro na obtenção dos produtos:', err);
        tabelaProdutos.innerHTML = `<tr><td colspan="9">Erro ao carregar os dados da tabela.</td></tr>`;
    });
});

// Atualização de produto
const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    const valores = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        percentualDesconto: parseFloat(document.getElementById('percentualDesconto').value),
        estoque: parseInt(document.getElementById('estoque').value),
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    };

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
        return resp.json();
    })
    .then(dados => {
        res2.innerHTML = `<p style="color:green;">Produto atualizado corretamente!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Problema na atualização:', err);
        res2.innerHTML = `<p style="color:red;">Erro ao tentar atualizar o produto.</p>`;
    });
});

// Exclusão de produto
const res3 = document.getElementById('res3');
const apagarBtn = document.getElementById('apagar');

apagarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('id3').value;

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if (resp.status === 404) throw new Error('Produto não localizado');
        if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
        return resp.json();
    })
    .then(() => {
        res3.innerHTML = `<p style="color:green;">Remoção efetuada com êxito!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Falha ao apagar o item:', err);
        res3.innerHTML = `<p style="color:red;">Não foi possível apagar o produto.</p>`;
    });
});
