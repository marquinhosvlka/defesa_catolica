document.addEventListener('DOMContentLoaded', function() {
    fetchLiturgiaDiaria();
});

function fetchLiturgiaDiaria() {
    fetch('https://liturgiadiaria.site/') 
        .then(response => response.json())
        .then(data => {
            const liturgiaContent = document.getElementById('liturgia-content');
            liturgiaContent.innerHTML = formatLiturgia(data);
        })
        .catch(error => {
            console.error('Erro ao buscar a liturgia diária:', error);
            document.getElementById('liturgia-content').innerHTML = 'Erro ao carregar a liturgia diária.';
        });
}

function formatLiturgia(data) {
    return `
        <h3>${data.data} - ${data.liturgia}</h3>
        <p><strong>Cor Litúrgica:</strong> ${data.cor}</p>
        <p><strong>Oração do Dia:</strong> ${data.dia}</p>
        <p><strong>Oração das Oferendas:</strong> ${data.oferendas}</p>
        <p><strong>Oração da Comunhão:</strong> ${data.comunhao}</p>
        <div>
            <h4>Primeira Leitura</h4>
            <p><strong>${data.primeiraLeitura.titulo}</strong> (${data.primeiraLeitura.referencia})</p>
            <p>${data.primeiraLeitura.texto}</p>
        </div>
        <div>
            <h4>Salmo Responsorial</h4>
            <p><strong>${data.salmo.referencia}</strong></p>
            <p><em>${data.salmo.refrao}</em></p>
            <p>${data.salmo.texto}</p>
        </div>
        <div>
            <h4>Evangelho</h4>
            <p><strong>${data.evangelho.titulo}</strong> (${data.evangelho.referencia})</p>
            <p>${data.evangelho.texto}</p>
        </div>
        ${data.segundaLeitura !== "Não há segunda leitura hoje!" ? `
        <div>
            <h4>Segunda Leitura</h4>
            <p>${data.segundaLeitura}</p>
        </div>
        ` : ''}
    `;
}
