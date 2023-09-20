document.addEventListener('DOMContentLoaded', async () => {
  const spreadsheetId = '17jbbRjyGTDMS6HRJwEloNJ5RFZVTDxJw21qkitfJoZs';

  const parser = new PublicGoogleSheetsParser();
  const data = await parser.parse(spreadsheetId);

  const listaLibros = document.getElementById('lista-libros');
  const libroTemplate = document.getElementById('libro-template');

  data.forEach(libro => {
    const libroDiv = document.importNode(libroTemplate.content, true);

    libroDiv.querySelector('.titulo').textContent = libro.titulo;
    libroDiv.querySelector('.autor').textContent = libro.autor;
    libroDiv.querySelector('.genero').textContent = libro.genero;
    libroDiv.querySelector('.publicacion').textContent = libro.publicacion;

    listaLibros.appendChild(libroDiv);
  });
});
