const url = 'https://tvicyqelenfmtfgzzgsi.supabase.co/rest/v1/comentarios';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWN5cWVsZW5mbXRmZ3p6Z3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMjIwMjksImV4cCI6MjAzOTY5ODAyOX0.Fk89n5nX-hiF5NXrddczvtzoZLdrlrjKdvuogTAxjTc';
const comentariosPorPagina = 5; // Número de comentários por página
let paginaAtual = 1;
let identificadorPagina = '';

// Captura o identificador da página da URL ou do nome do arquivo
function obterIdentificadorPagina() {
    const urlParams = new URLSearchParams(window.location.search);
    identificadorPagina = urlParams.get('pagina') || window.location.pathname.split('/').pop();
}

document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const comentario = document.getElementById('comentario').value;

    console.log('Enviando comentário:', { nome, comentario, identificadorPagina });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': key
            },
            body: JSON.stringify({ nome, comentarios: comentario, pagina: identificadorPagina })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao enviar comentário: ${response.status} - ${errorText}`);
        }

        document.getElementById('formulario').reset();
        buscarComentarios();
    } catch (error) {
        console.error('Erro ao enviar comentário:', error);
    }
});

async function buscarComentarios() {
    console.log('Buscando comentários para a página:', identificadorPagina);

    try {
        const response = await fetch(`${url}?pagina=eq.${encodeURIComponent(identificadorPagina)}&limit=${comentariosPorPagina}&offset=${(paginaAtual - 1) * comentariosPorPagina}`, {
            headers: {
                'apikey': key
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar comentários: ${response.status} - ${errorText}`);
        }

        const comentarios = await response.json();
        const listaComentarios = document.getElementById('lista-comentarios');

        listaComentarios.innerHTML = '';

        comentarios.sort((a, b) => b.id - a.id);

        comentarios.forEach(comentario => {
            const item = document.createElement('div');
            item.className = 'item-comentario';
            item.innerHTML = `<strong class="nome-comentario">${comentario.nome}:</strong><p>${comentario.comentarios}</p>`;
            listaComentarios.appendChild(item);
        });

        document.getElementById('pagina-info').textContent = `Página ${paginaAtual}`;
        verificarBotoesNavegacao();
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
    }
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    if (paginaAtual < 1) paginaAtual = 1;
    buscarComentarios();
}

function verificarBotoesNavegacao() {
    document.getElementById('btn-anterior').disabled = paginaAtual <= 1;
    // A lógica para habilitar o botão "Próximo" pode ser ajustada conforme necessário
    // Exemplo: você pode verificar o número total de comentários e ajustar a lógica
    // Para fins de exemplo, assumimos que sempre haverá mais comentários se houver navegação.
    document.getElementById('btn-proximo').disabled = false; // Ajuste conforme a lógica de paginação
}

// Carrega os comentários quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    obterIdentificadorPagina();
    paginaAtual = parseInt(new URLSearchParams(window.location.search).get('pagina-atual'), 10) || 1;
    buscarComentarios();
});
