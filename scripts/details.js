import { arrayVideos } from "../scripts/data.js";


// Actualización del array de videos cuando se añade uno nuevo.
const arrayVideosFinal = JSON.parse(sessionStorage.getItem("videos")) || arrayVideos;

// 5. Creamos la función para pintar el video principal que se va a reproducir y la lista de los otros videos que hay por reproducir.
const printVideo = (containerOne, containerTwo, videoPrincipal, videosList) => {
  // Vaciar los contenedores
  containerOne.innerHTML = "";
  containerTwo.innerHTML = "";
  // Recorrer el array y escribir lo necesario en el HTML para el video principal que se va a reproducir
  containerOne.innerHTML = `
  <iframe src=${videoPrincipal.linkVideo} allow="autoplay"></iframe>
  <section class="videoPrincipal__authorTitle">
    <figure class="videoPrincipal__author">
      <img src=${videoPrincipal.seeIn.imageAuthor} alt=${videoPrincipal.seeIn.author}>
    </figure>
    <h3 class="videoPrincipal__title">${videoPrincipal.seeIn.title}</h3>
  </section>
  <h4 class="infoVideos__viewsAndPublication">${videoPrincipal.seeIn.views} - ${videoPrincipal.seeIn.publication}</h4>`;

  videosList.forEach((video) => {
    containerTwo.innerHTML += `
    <article class="container__videoSugerido" data-video="videos" name=${video.id}>
      <div class="videosSugeridos__video" data-video="videos" name=${video.id}>
          <figure class="videosSugeridos__figure" data-video="videos" name=${video.id}>
              <img src=${video.backgroundImage} alt=${video.seeIn.title} data-video="videos" name=${video.id}>
          </figure>
          <p data-video="videos" name=${video.id}>${video.duration}</p>
      </div>
      <section class="details__infoVideos" data-video="videos" name=${video.id}>
          <h3 data-video="videos" name=${video.id}>${video.seeIn.title}</h3>
          <h4 data-video="videos" name=${video.id}>${video.seeIn.author}</h4>
          <h4 data-video="videos" name=${video.id}>${video.seeIn.views} - ${video.seeIn.publication}</h4>
      </section>
    </article>`;
  });
};


// 6. Filtrar los otros vídeos diferentes al video principal que se pintarán en la barra lateral de los videos.

// 7. Se pinta el video principal que se va a reproducir y la lista de los otros videos que hay por reproducir.
document.addEventListener("DOMContentLoaded", () => {
  // 1. Capturar la información que se tiene guardada en el Session Storage
  const idCVideoString =
    JSON.parse(sessionStorage.getItem("idVideo")) ||
    "No hay información en el Session Storage";
  const idVideoNumber = Number(idCVideoString);

  // 2. Hacer la busqueda del video al cual le hemos dado click
  const videoClick = arrayVideosFinal.find((video) => video.id === idVideoNumber);
  //console.log(videoClick);

  // 3. Cambiando el contenido de la etiqueta título con el nombre del video.
  const title = document.getElementById("title");
  title.innerText = videoClick.seeIn.title;

  // 4. Capturamos el contenedor donde vamos a pintar todos los videos. Los videos sugeridos no tendrán en cuenta el video que se estará mostrando.
  const containerVideo = document.querySelector(".main__videoPrincipal");
  const containerVideos = document.querySelector(".videosSugeridos");
  const videosLateral = arrayVideosFinal.filter(
    (video) => video.id !== idVideoNumber
  );

  printVideo(containerVideo, containerVideos, videoClick, videosLateral);
});

//8. Escuchar el evento click sobre el logo y título de VideoTube y que redirigirá a la página principal. y si se hace click sobre alguno de los videos sugeridos y se reproduce en lugar del que se está reproduciendo.
document.addEventListener("click", (event) => {
  const dataCardAttribute = event.target.getAttribute("data-video");
  if (dataCardAttribute == "videoTube") {
    window.location.href = "../index.html";
  } else if (dataCardAttribute == "videos") {
    const idVideo = event.target.getAttribute("name");
    sessionStorage.setItem("idVideo", JSON.stringify(idVideo));
    window.location.href = "../pages/details.html";
  }
});




