import { arrayVideos } from "./data.js";

// Actualización del array de videos cuando se añade uno nuevo.
const arrayVideosFinal =
  JSON.parse(sessionStorage.getItem("videos")) || arrayVideos;

// Mostrar los videos listados en containers.
// 1. Capturamos el contenedor donde vamos a pintar todos los videos.
const containerVideos = document.querySelector(".main__videos");

// 2. Construir una función que nos permita pintar los backgroundImage de cada video en el contenedor.
const printVideos = (container, videosList) => {
  // Vaciar el contenedor
  container.innerHTML = "";
  // Recorrer el array
  videosList.forEach((video) => {
    container.innerHTML += `
        <article class="videos" data-video="videos" name=${video.id}>
            <figure class="videos__figure" data-video="videos" name=${video.id}>
                <img class="videos__backbroundImage" name=${video.id} src=${video.backgroundImage} alt=${video.seeIn.title} data-video="videos">
            </figure>
            <button class="deleteVideo" data-video="deleteVideos" name=${video.id}><span class="material-symbols-outlined"  data-video="deleteVideos" name=${video.id}>delete</span></button>
            <div class="container__duration" data-video="videos" name=${video.id}><p class="videos__duration" data-video="videos" name=${video.id}>${video.duration}</p></div>
            <section class="infoVideos" data-video="videos" name=${video.id}>
                <div class="contenedor__title" data-video="videos" name=${video.id}>
                    <figure class="infoVideos__figure" data-video="videos" name=${video.id}>
                        <img class="infoVideos__imageAuthor" name=${video.id} src=${video.seeIn.imageAuthor} alt=${video.seeIn.author} data-video="videos">
                    </figure>
                    <h3 class="infoVideos__title" name=${video.id} data-video="videos">${video.seeIn.title}</h3>
                </div>
                <h4 class="infoVideos__author" data-video="videos" name=${video.id}>${video.seeIn.author}</h4>
                <h4 class="infoVideos__viewsAndPublication" data-video="videos" name=${video.id}>${video.seeIn.views} - ${video.seeIn.publication}</h4>
             </section>
        </article>`;
  });
};

// 3. Escuchar el evento DomConentLoad y cuando suceda este evento se deben imprimir los background de los videos y su información.
document.addEventListener("DOMContentLoaded", () => {
  printVideos(containerVideos, arrayVideosFinal);
});

// 4. Escuchar evento de click en la página, para cuando se haga click en las diferentes categorías flitre los videos que se muestran en pantalla.
let category = {};
document.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "category__Todos":
      category = arrayVideosFinal;
      printVideos(containerVideos, category);
      break;
    case "category__Música":
      category = arrayVideosFinal.filter(
        (video) => video.seeIn.category === "Música"
      );
      printVideos(containerVideos, category);

      break;
    case "category__Programación":
      category = arrayVideosFinal.filter(
        (video) => video.seeIn.category === "Programación"
      );
      printVideos(containerVideos, category);
      break;
    case "category__Motivación":
      category = arrayVideosFinal.filter(
        (video) => video.seeIn.category === "Motivación"
      );
      printVideos(containerVideos, category);
      break;

    case "category__LaPulla":
      category = arrayVideosFinal.filter(
        (video) => video.seeIn.category === "La Pulla"
      );
      printVideos(containerVideos, category);
      break;
  }
});

// 5. Escuchar el evento click y si se da sobre las cards lleva a la página de detalles y reproduce el video, si se da al logo o título de VideoTube recargará la página y otro elseif para eliminar un video.
document.addEventListener("click", (event) => {
  const dataCardAttribute = event.target.getAttribute("data-video");
  const classCardAttribute = event.target.getAttribute("class");
  const idVideo = event.target.getAttribute("name");

  if (dataCardAttribute == "videos") {
    sessionStorage.setItem("idVideo", JSON.stringify(idVideo));
    window.location.href = "./pages/details.html";
  } else if (dataCardAttribute == "videoTube") {
    window.location.href = "../index.html";
  } else if (
    dataCardAttribute == "deleteVideos" &&
    classCardAttribute == "material-symbols-outlined"
  ) {
    const indexVideoEliminar = arrayVideosFinal.findIndex(
      (video) => video.id == idVideo
    );
    arrayVideosFinal.splice(indexVideoEliminar, 1);
    sessionStorage.setItem("videos", JSON.stringify(arrayVideosFinal));
    window.location.href = "../index.html";
  }
});

// 6. Busqueda de videos por título.
const filterByTitle = (termSearch = "", videosList) => {
  const videosFiltred = videosList.filter((video) =>
    video.seeIn.title.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = videosFiltred.length ? videosFiltred : videosList;

  const messageResult = videosFiltred.length ? false : "Este video no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 7. Capturamos el form y luego escuchamos el evento submit para realizar la búsqueda del video por el título. Se deben colocar las tíldes como están los nombres
const formSearch = document.querySelector(".header__containerSearch");

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value;

  if (searchTerm) {
    const searchResult = filterByTitle(searchTerm, arrayVideosFinal);
    printVideos(containerVideos, searchResult.resultSearch);

    if (searchResult.messageSearch) {
      Swal.fire("Oops!", searchResult.messageSearch, "error");
    }
  } else {
    Swal.fire("Oops!", "No has ingresado un video para buscar.", "error");
  }
});

// const categorys = [];
// arrayVideosFinal.forEach(video=>{
//     if(!categorys.includes(video.seeIn.category)){
//         categorys.push(video.seeIn.category);
//     }
// })

// console.log(categorys);

// 8. Crea dos funciones para crear un slider dinámico
const slider = document.querySelector(".header__nav");

let maxScrollLeft = slider.scrollWidth - slider.clientWidth;
let interval = null;
let step = 1;

const start = () => {
  interval = setInterval(function () {
    slider.scrollLeft += step;
    if (Math.ceil(slider.scrollLeft) === maxScrollLeft) {
      step *= -1;
    } else if (slider.scrollLeft === 0) {
      step *= -1;
    }
  }, 20);
};

const stop = () => {
  clearInterval(interval);
};

slider.addEventListener("mouseover", () => {
  stop();
});

slider.addEventListener("mouseout", () => {
  start();
});

start();
