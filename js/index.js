const listaLibros = document.getElementById("lista-libros");
const libroTemplate = document.getElementById("libro-template");

const RUTA_IMAGENES = "./img";

let articulosCarrito = [];

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
    libroDiv.querySelector(".libro").dataset.id = libro.id;
    libroDiv.querySelector(".titulo").textContent = libro.titulo;
    libroDiv.querySelector(".autor").textContent = libro.autor;
    // libroDiv.querySelector(".precio").textContent = libro.precio;
    // libroDiv.querySelector("img").src = `${RUTA_IMAGENES}/${libro.imagen}`;
    libroDiv.querySelector("img").src = `${libro.imagen}`;

    listaLibros.appendChild(libroDiv);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const libroSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(libroSeleccionado);   
    const boton = libroSeleccionado.querySelector("button");

    if (!libroSeleccionado.classList.contains("selected")) {
      boton.textContent = "Agregado";
      libroSeleccionado.classList.add("selected");
      libroSeleccionado.classList.add("!bg-sky-200");
      boton.classList.add("!bg-blue-700");
      boton.classList.add("!hover:bg-blue-800");
    } else {
      boton.textContent = "Agregar";
      libroSeleccionado.classList.remove("selected");
      libroSeleccionado.classList.remove("!bg-sky-200");
      boton.classList.remove("!bg-blue-700");
      boton.classList.remove("!hover:bg-blue-800");
    }
  }
  


});

function leerDatosCurso(curso) {
  const infoLibro = {
      titulo: curso.querySelector('.titulo').textContent,
      id: curso.getAttribute('data-id'),
      cantidad: 1

  }
  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoLibro.id);

  if (existe) {
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== infoLibro.id);
     
  } else {
      articulosCarrito = [...articulosCarrito, infoLibro];
  }

}


// Obtener botón para enviar por WhatsApp
const botonWhatsapp = document.getElementById('link-whatsapp'); 

// Añadir listener al botón
botonWhatsapp.addEventListener('click', (e) => {
  // e.preventDefault();
  // Obtener los datos de articulosCarrito
  let mensaje = '';
  mensaje = "*Buenas estoy interesado en los siguiente libros:* \%0A"
  articulosCarrito.forEach(articulo => {
    mensaje += encodeURIComponent(articulo.titulo);
    mensaje += "%0A"
  });
  // Crear enlace de WhatsApp con los datos
  const url = `https://wa.me/987654321?text=${(mensaje)}`;  
  
  console.log(url)
  // Abrir enlace en nueva pestaña
  window.open(url);

});


