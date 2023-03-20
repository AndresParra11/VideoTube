import { arrayVideos } from "./data.js";

// Mostrar los videos listados en containers.
// 1. Capturamos el contenedor donde vamos a pintar todos los videos.
const containerVideos = document.querySelector(".main__videos");

// 2. Construir una función que nos permita pintar los backgroundImage de cada video en el contenedor.
const printVideos = (container, videosList) => {
    // Vaciar el contenedor
    container.innerHTML = "";
    // Recorrer el array
    videosList.forEach(video => {
        container.innerHTML += `
        <article class="videos" data-video="videos" name=${video.id}>
            <figure class="videos__figure" data-video="videos" name=${video.id}>
                <img class="videos__backbroundImage" name=${video.id} src=${video.backgroundImage} alt=${video.seeIn.title} data-video="videos">
            </figure>
            <div class="container__duration" data-video="videos" name=${video.id}><p class="videos__duration" data-video="videos" name=${video.id}>${video.duration}</p></div>
            <section class="infoVideos" data-video="videos" name=${video.id}>
                <div class="contenedor__title" data-video="videos" name=${video.id}>
                    <figure class="infoVideos__figure" data-video="videos" name=${video.id}>
                        <img class="infoVideos__imageAuthor" name=${video.seeIn.author} src=${video.seeIn.imageAuthor} alt=${video.seeIn.author} data-video="videos">
                    </figure>
                    <h3 class="infoVideos__title" name=${video.seeIn.title} data-video="videos">${video.seeIn.title}</h3>
                </div>
                <h4 class="infoVideos__author" data-video="videos" name=${video.id}>${video.seeIn.author}</h4>
                <h4 class="infoVideos__viewsAndPublication" data-video="videos" name=${video.id}>${video.seeIn.views} - ${video.seeIn.publication}</h4>
             </section>
        </article>`;
    });
};

// 3. Escuchar el evento DomConentLoad y cuando suceda este evento se deben imprimir los background de los videos y su información.
document.addEventListener('DOMContentLoaded', ()=>{
    printVideos(containerVideos, arrayVideos);
});

// 4. Escuchar evento de click en la página, para cuando se haga click en las diferentes categorías flitre los videos que se muestran en pantalla.
let category = {};
document.addEventListener("click", (event)=>{
    switch(event.target.id){
        case ("category__Todos"):
            category = arrayVideos;
            printVideos(containerVideos, category);
            break;
        case ("category__Música"):
            category = arrayVideos.filter(video => video.seeIn.category === "Música");
            printVideos(containerVideos, category);

            break;
        case ("category__Programación"):
            category = arrayVideos.filter(video => video.seeIn.category === "Programación");
            printVideos(containerVideos, category);
            break;
        case ("category__Motivación"):
            category = arrayVideos.filter(video => video.seeIn.category === "Motivación");
            printVideos(containerVideos, category);
            break;

        case ("category__LaPulla"):
            category = arrayVideos.filter(video => video.seeIn.category === "La Pulla");
            printVideos(containerVideos, category);
            break;
    };
});

// 5. Escuchar el evento click sobre las cards.
document.addEventListener("click", (event)=>{
    const dataCardAttribute = event.target.getAttribute("data-video");
    if(dataCardAttribute == "videos"){
        const idVideo = event.target.getAttribute('name');
        sessionStorage.setItem("idVideo", JSON.stringify(idVideo));
        window.location.href = "./pages/details.html"
    };
});

// 6. Escuchar el evento click sobre el logo y título de VideoTube. y que redirigirá a la página principal.
document.addEventListener("click", (event)=>{
    const dataCardAttribute = event.target.getAttribute("data-video");
    if(dataCardAttribute == "videoTube"){
        window.location.href = "/index.html"
    };
});

// 7. Busqueda de videos por título.
const filterByTitle = (termSearch = '', videosList) =>{
    const videosFiltred = videosList.filter(video => video.seeIn.title.toLowerCase().includes(termSearch.toLowerCase()));
    const result = videosFiltred.length ? videosFiltred : videosList;

    const messageResult = videosFiltred.length ? true : "Este video no existe."

    return{
        resultSearch: result,
        messageSearch: messageResult       
    }
};

// 8. Capturamos el form y luego escuchamos el evento submit para realizar la búsqueda del video por el título. Se deben colocar las tíldes como están los nombres 
const formSearch = document.querySelector(".header__containerSearch");

formSearch.addEventListener("submit", (event)=>{
    event.preventDefault();
    const inputSearch = formSearch.children[0];
    const searchTerm = inputSearch.value;

    if(searchTerm){
        const searchResult= filterByTitle(searchTerm, arrayVideos);
        printVideos(containerVideos, searchResult.resultSearch);

    } else {
        alert("No has ingresado un video para buscar.");
    };
});

// const categorys = [];
// arrayVideos.forEach(video=>{
//     if(!categorys.includes(video.seeIn.category)){
//         categorys.push(video.seeIn.category);
//     }
// })

// console.log(categorys);


