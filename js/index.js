const listaLibros = document.getElementById("lista-libros");
const libroTemplate = document.getElementById("libro-template");

const RUTA_IMAGENES = "./img";

document.addEventListener("DOMContentLoaded", async () => {
  const spreadsheetId = "17jbbRjyGTDMS6HRJwEloNJ5RFZVTDxJw21qkitfJoZs";

  const parser = new PublicGoogleSheetsParser();
  const data = await parser.parse(spreadsheetId);
  console.log(data);
  renderLibros(data);

  // fetch("./js/libros.json")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     renderLibros(data);
  //   });
});

function renderLibros(data) {
  data.forEach((libro) => {
    const libroDiv = document.importNode(libroTemplate.content, true);

    libroDiv.querySelector(".titulo").textContent = libro.titulo;
    libroDiv.querySelector(".autor").textContent = libro.autor;
    // libroDiv.querySelector(".precio").textContent = libro.precio;
    // libroDiv.querySelector("img").src = `${RUTA_IMAGENES}/${libro.imagen}`;
    libroDiv.querySelector("img").src = `${libro.imagen}`;

    listaLibros.appendChild(libroDiv);
  });
}
