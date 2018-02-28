const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e){
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
});

function getNews() {
    console.log(searchedForText)
    const articleRequest = new XMLHttpRequest();
    articleRequest.open(`GET`, `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=990cd4440d8144d89ab304393b77ab2e`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();

}

function handleError() {
    console.log('Se ha presentado un error');
}

function addNews() {
    const data = JSON.parse(this.responseText);
    const article = data.response.docs[0]
    const articleArray = data.response.docs;
    const title = article.headline.main;
    const snippet = article.snippet;
articleArray.forEach(element =>{
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;
    responseContainer.appendChild(li)

})

}
