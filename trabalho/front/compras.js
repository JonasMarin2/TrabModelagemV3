let res = document.getElementById('res');
let cadastrar = document.getElementById('cadastrar');

// Evento de cadastro
cadastrar.addEventListener('click', (e) => {
    e.preventDefault();

    const price = Number(document.getElementById('price').value);
    const discountPercentage = Number(document.getElementById('discountPercentage').value);
    const finalPrice = price * (discountPercentage / 100);

    const valores = {
        quant: Number(document.getElementById('quant').value),
        date: document.getElementById('date').value,
        price,
        discountPercentage,
        finalPrice,
        paymentWay: document.getElementById('paymentWay').value,
        status: document.getElementById('status').value
    };

    res.innerHTML = '';

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro na resposta: ${resp.status}`);
        return resp.json();
    })
    .then(dados => {
        console.log('Cadastro feito:', dados);
        res.innerHTML = `<p style="color:green;">Compra registrada! ID: ${dados.id}</p>`;
    })
    .catch(err => {
        console.error('Falha ao cadastrar:', err);
        res.innerHTML = `<p style="color:red;">Falha ao cadastrar item.</p>`;
    });
});

// Listar produtos
const listarBtn = document.getElementById('listar');
const tabelaProdutos = document.querySelector('#produtos-table tbody');

listarBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/compra')
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
        return resp.json();
    })
    .then(produtos => {
        tabelaProdutos.innerHTML = '';

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.quant}</td>
                <td>${new Date(produto.date).toLocaleDateString()}</td>
                <td>${produto.price.toFixed(2)}</td>
                <td>${produto.discountPercentage.toFixed(2)}</td>
                <td>${produto.finalPrice.toFixed(2)}</td>
                <td>${produto.paymentWay}</td>
                <td>${produto.status}</td>
            `;
            tabelaProdutos.appendChild(linha);
        });
    })
    .catch(err => {
        console.error('Erro ao buscar lista:', err);
        tabelaProdutos.innerHTML = `<tr><td colspan="8">Erro ao listar dados.</td></tr>`;
    });
});

// Atualizar produto
const res2 = document.getElementById('res2');
const atualizarBtn = document.getElementById('atualizar');

atualizarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    const price = Number(document.getElementById('price').value);
    const discountPercentage = Number(document.getElementById('discountPercentage').value);
    const finalPrice = price * (discountPercentage / 100);

    const valores = {
        quant: Number(document.getElementById('quant').value),
        date: document.getElementById('date').value,
        price,
        discountPercentage,
        finalPrice,
        paymentWay: document.getElementById('paymentWay').value,
        status: document.getElementById('status').value
    };

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
    .then(resp => {
        if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
        return resp.json();
    })
    .then(dados => {
        console.log('Atualização concluída:', dados);
        res2.innerHTML = `<p style="color:green;">Compra atualizada com sucesso!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Erro na atualização:', err);
        res2.innerHTML = `<p style="color:red;">Erro ao tentar atualizar compra.</p>`;
    });
});

// Apagar produto
const res3 = document.getElementById('res3');
const apagarBtn = document.getElementById('apagar');

apagarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('id3').value;

    fetch(`http://localhost:3000/compra/${id}`, {
        method: 'DELETE'
    })
    .then(resp => {
        if (resp.status === 404) throw new Error('Item não encontrado');
        if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
        return resp.json();
    })
    .then(() => {
        console.log(`Item ${id} apagado.`);
        res3.innerHTML = `<p style="color:green;">Compra excluída com sucesso!</p>`;
        if (listarBtn) listarBtn.click();
    })
    .catch(err => {
        console.error('Erro na exclusão:', err);
        res3.innerHTML = `<p style="color:red;">Erro ao excluir compra.</p>`;
    });
});
