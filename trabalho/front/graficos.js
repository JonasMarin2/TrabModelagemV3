const maxItems = 10;

// Ao clicar no botão, inicia o carregamento dos gráficos
document.getElementById('gerarGraficos').addEventListener('click', async () => {
  const startId = Number(document.getElementById('startId').value);
  const endId = Number(document.getElementById('endId').value);

  if (isNaN(startId) || isNaN(endId) || startId > endId) {
    alert('Por favor, insira IDs válidos');
    return;
  }

  // Garante no máximo 10 registros
  const limite = Math.min(endId - startId + 1, maxItems);

  // Obter produtos
  const productPromises = [];
  for (let i = startId; i <= endId && productPromises.length < maxItems; i++) {
    productPromises.push(
      fetch(`https://dummyjson.com/products/${i}`).then(resp => resp.json())
    );
  }

  const productData = await Promise.all(productPromises);
  const productLabels = productData.map(item => item.title);
  const productStock = productData.map(item => item.stock);

  // Obter usuários
  const userPromises = [];
  for (let i = startId; i <= endId && userPromises.length < maxItems; i++) {
    userPromises.push(
      fetch(`https://dummyjson.com/users/${i}`).then(resp => resp.json())
    );
  }

  const userData = await Promise.all(userPromises);
  const userLabels = userData.map(user => `${user.firstName} ${user.lastName}`);
  const userAges = userData.map(user => user.age);

  // Desenhar gráficos
  renderChart('productChart', 'Produtos por Estoque', productLabels, productStock, 'Estoque');
  renderChart('userChart', 'Idade dos Usuários', userLabels, userAges, 'Idade');
});

// Função para renderizar gráfico com Chart.js
function renderChart(canvasId, title, labels, data, label) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  // Remove gráfico anterior se existir
  if (window[canvasId + 'Instance']) {
    window[canvasId + 'Instance'].destroy();
  }

  // Cria novo gráfico
  window[canvasId + 'Instance'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
