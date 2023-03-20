import { arrayVideos } from "../scripts/data.js";


// Actualización del array de videos cuando se añade uno nuevo.
const arrayVideosFinal = JSON.parse(sessionStorage.getItem("videos")) || arrayVideos;

// 1. Si se clickea el logo o el título de la página se lleva a la página principal.
document.addEventListener("click", (event) => {
    const dataCardAttribute = event.target.getAttribute("data-video");
    if (dataCardAttribute == "videoTube") {
      window.location.href = "../index.html";
    }
});

// 2. Estilizamos la etiqueta con clase .addVideos cuando estemos en la página del formulario de añadir un video.
const linkActive = document.querySelector(".addVideos");
linkActive.classList.add("active");

// 3. Creamos una función para crear el formulario de forma dinámica con las diferentes propiedades que tiene el objeto de un video.

const form = document.getElementById("form");
const formLabels = document.querySelector(".form__labels");
const formInputs = document.querySelector(".form__inputs");

const constructorForm = (formLabels, formInputs, videoList) =>{
    formLabels.innerHTML = "";
    formInputs.innerHTML = "";
    for(const property in videoList[3]){
        if (property !== "seeIn" && property !== "id"){
            formLabels.innerHTML += `
            <label for="${property}">Ingrese ${property} del video:</label>`

            formInputs.innerHTML += `
            <input id="${property}" type="text" placeholder="${videoList[3][property]} ">`
        } else if(property == "seeIn"){
            for(const property2 in videoList[3][property]){
                formLabels.innerHTML += `
                <label for="${property2}">Ingrese ${property2} del video:</label>`

                formInputs.innerHTML += `
                <input id="${property2}" type="text" placeholder="${videoList[3][property][property2]}">`
            };
        };
    };
};

// 4. Llamos la función para crear el formulario de forma dinámica.
constructorForm(formLabels, formInputs, arrayVideosFinal);

// 5. Capturamos el evento click del botón para añadir un nuevo video. Creamos un objeto vacío con la misma estructura de los videos que ya hay creados. Y posteriormente con dos for in le asignamos el valor a cada una de las propiedades del video que se está añadiendo.

const botonAñadir = document.getElementById("añadirVideo");
botonAñadir.addEventListener("click", ()=>{
    const arrayInput = Array.from(formInputs.children);

    const newVideo = {
        backgroundImage:"",
        duration: "",
        linkVideo: "",
        seeIn: {
            title: "",
            author: "",
            imageAuthor:"",
            views: "",
            category: "",
            publication: "",
        },
    }

    for (const key in newVideo) {
        if(typeof newVideo[key] === "object"){
            for (const propertyName in newVideo[key]) {
                const input = arrayInput.find(item => item.id === propertyName)
                newVideo[key][propertyName] = input.value;
            }   
        } else {
            const input = arrayInput.find(item => item.id === key)
            newVideo[key] = input.value;
        }
    }
    const validateCampos = validateInputs(newVideo);
    if(validateCampos){
        newVideo.id = arrayVideosFinal.length + 1;
        arrayVideosFinal.push(newVideo);
        sessionStorage.setItem("videos", JSON.stringify(arrayVideosFinal));
        Swal.fire("¡Excelente!", "El video fue añadido exitosamente.", "success");
        form.reset();
    }
});

const validateInputs = (objetcData) => {
    let camposVacios = "";
    for (const key in objetcData) {
        if(typeof objetcData[key] === "object"){
            for (const propertyName in objetcData[key]) {
                const valueProperty = objetcData[key][propertyName]
                camposVacios += !valueProperty ? `${propertyName} ` : "";
            }
        } else{
            const valueProperty = objetcData[key]
                camposVacios += !valueProperty ? `${key} ` : "";
        }
    }

    if(camposVacios){
        Swal.fire("Oops!", `Hay campos vacíos en: ${camposVacios}`, "error");
        return false;
    } else {
        return true;
    }
}
