//traer elementos
const form = document.getElementById("search-form");
const searchField = document.getElementById("search-keyword");
const responseContainer = document.getElementById("response-container");
let searchedForText;

//agregando evento al formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;
    getNews();
});

//funcion para crear las peticiones
function getNews() {
    const articleRequest = new XMLHttpRequest(); //crear objeto
    articleRequest.open("GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e98c9111b40848d9a1c05597baaf3024`); //metodo open para iniciar request
    articleRequest.onload = addNews; // funcion ejecutada abajo en la que funciona la peticion
    articleRequest.onerror = handleError; //funcion ejecutada abajo para mostrar en consola mensaje de error
    articleRequest.send(); //envia peticion al servidor
};

function handleError() {
    console.log("se ha producido un error");
};

//funcion para agregar noticias al html dependiendo del filtro de busqueda
function addNews() {

    const data = JSON.parse(this.responseText); //objeto de la data
    //console.log(data);

    const response = data.response.docs; //arreglo de objetos de la propiedad docs del objeto response de la data
    console.log(response);
    const arraySplice = response.splice(0, 5); // array con los objetos seleccionados de acuerdo a los indices cortados que se indican con el metodo splice
    //console.log(arraySplice);

    response.forEach((element, index, array) => {

        const snippet = element.snippet; //accediendo a la propiedad snippet del arreglo
        console.log(snippet);
        const multimedia1 = element.multimedia; //accediendo a los objetos multimedia del arreglo
        console.log(multimedia1);
        const image = element.web_url;
        console.log(image);

        let li = document.createElement("li");
        li.className = "articleClass";
        li.innerText = snippet;

        responseContainer.appendChild(li);
    });
};