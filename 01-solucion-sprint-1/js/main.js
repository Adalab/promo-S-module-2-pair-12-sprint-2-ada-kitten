'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const inputRaceForm = document.querySelector('.js-input-form-race');
// Variables para almacenar la información del usuario de github y la url del endpoint
const GITHUB_USER = 'irenemez';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

//Objetos con cada gatito
// const kittenData_1 = {
//     image: "https://dev.adalab.es/gato-siames.webp",
//     name: "Anastacio",
//     desc: "Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.",
//     race: "Siamés",
// };
// const kittenData_2 = {
//     image: "https://dev.adalab.es/sphynx-gato.webp",
//     name: "Fiona",
//     desc: "Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.",
//     race: "Sphynx",
// };
// const kittenData_3 = {
//     image: "https://dev.adalab.es/maine-coon-cat.webp",
//     name: "Cielo",
//     desc: " Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.",
//     race: "Maine Coon",
// };

// constante del listado kittenDataList que sea una variable
let kittenDataList = [];

// Fetch para obtener el listado los gatitos
/* fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
    .then(function (response) {
        return response.json();
    })
    .then(function (responseData) {
        console.log(responseData);
        kittenDataList = responseData.results;
        renderKittenList(kittenDataList);
    }) */


// Crea una variable para almacenar los gatitos que se encuentren el local storage:
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

// Modifica la petición al servidor que hiciste en la sesión anterior, para que solo se realice la petición cuando no hay gatitos en el local storage:
if (kittenListStored) {
    renderKittenList(kittenListStored);
    kittenDataList = kittenListStored;
} else {
    fetch(SERVER_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            console.log(responseData);
            kittenDataList = responseData.results;
            localStorage.setItem('kittensList', JSON.stringify(kittenDataList));
            renderKittenList(kittenDataList);
        })
        .catch((error) => {
            console.error(error);
        });
}


//Funciones
function renderKitten(kittenData) {
    // DOM avanzado crear elemento
    const kitten = document.createElement('li');
    kitten.setAttribute('class', 'card');
    // listElement.appendChild(kitten);
    
    // DOM avanzado article
    const articleKitten = document.createElement('article');
    kitten.appendChild(articleKitten);

    // DOM avanzado imagen
    const imgKitten = document.createElement('img');
    imgKitten.setAttribute('class', 'card_img');
    imgKitten.setAttribute('src', kittenData.image);
    imgKitten.setAttribute('alt', 'gatito');
    articleKitten.appendChild(imgKitten);

    // DOM avanzado h3
    const cardTitle = document.createElement('h3');
    const cardRace = document.createElement('h3');
    cardTitle.setAttribute('class', 'card_title');
    cardRace.setAttribute('class', 'card_race');
    const textTitle = document.createTextNode(`${kittenData.name}`);
    const textRace = document.createTextNode(`${kittenData.race}`);
    cardTitle.appendChild(textTitle);
    cardRace.appendChild(textRace);
    articleKitten.appendChild(cardTitle);
    articleKitten.appendChild(cardRace);

    // DOM avanzado p
    const cardDescription = document.createElement('p');
    cardDescription.setAttribute('class', 'card_description');
    const textDesc = document.createTextNode(`${kittenData.desc}`);
    cardDescription.appendChild(textDesc);
    articleKitten.appendChild(cardDescription);

    // Código pasado a DOM posteriormente arriba
    // <article>
    //   <img
    //     class="card_img"
    //     src=${kittenData.image}
    //     alt="gatito"
    //   />
    //   <h3 class="card_title">${kittenData.name}</h3>
    //   <h3 class="card_race">${kittenData.race}</h3>
    //   <p class="card_description">
    //   ${kittenData.desc}
    //   </p>
    // </article>
    // </li>`;
    console.log(kitten);
    return kitten;
}
function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
       // listElement.innerHTML += renderKitten(kittenItem);
        listElement.appendChild(renderKitten(kittenItem));
    }
}
//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}
//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMessageError.innerHTML = "¡Uy! parece que has olvidado algo";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMessageError.innerHTML = "";
        }
    }
    //Crear nuevo objeto
    const newKittenDataObject = {
        image: inputPhoto.value,
        name: inputName.value,
        desc: inputDesc.value,
        race: inputRace.value,
    };
    //Introducir datos en el objeto
    kittenDataList.push(newKittenDataObject);
    //Mensaje de confirmación de creación de nuevo objeto
    labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
    renderKittenList(kittenDataList);
    //Borrar los datos del objeto 
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
    inputRace.value = "";
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}
//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    const raceResult = inputRaceForm.value;
    listElement.innerHTML = "";
    console.log(raceResult);
    const kittenListFiltered = kittenDataList
        .filter((kitten) => kitten.desc.includes(descrSearchText))
        .filter((kitten) => kitten.race.includes(raceResult));

    renderKittenList(kittenListFiltered);

    /* for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    } */
}

//Mostrar el litado de gatitos en el HTML
//renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);






