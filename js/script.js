const url = "https://tvicyqelenfmtfgzzgsi.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWN5cWVsZW5mbXRmZ3p6Z3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxMjIwMjksImV4cCI6MjAzOTY5ODAyOX0.Fk89n5nX-hiF5NXrddczvtzoZLdrlrjKdvuogTAxjTc";
document
  .getElementById("formulario")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key,
        },
        body: JSON.stringify({ nome, comentario }),
      });

      document.getElementById("formulario").reset();
      buscarComentarios();
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  });

async function buscarComentarios() {
  try {
    const response = await fetch(url, {
      headers: {
        apikey: key,
      },
    });

    const comentarios = await response.json();
    const listaComentarios = document.getElementById("lista-comentarios");

    comentarios.sort((a, b) => b.id - a.id);

    listaComentarios.innerHTML = "";

    comentarios.forEach((comentario) => {
      const item = document.createElement("div");
      item.className = "item-comentario";
      item.innerHTML = `
                <strong class="nome-comentario">${comentario.nome}:</strong>
                <p>${comentario.comentario}</p>
            `;
      listaComentarios.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
  }
}

// Carrega os comentários quando a página é carregada
document.addEventListener("DOMContentLoaded", buscarComentarios);
