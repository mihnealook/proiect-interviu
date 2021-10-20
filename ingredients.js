var allIngredients

window.onload = () => { getIngredients(); };

function getIngredients() {
    let searchQuerry = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() { allIngredients = JSON.parse(this.responseText); console.log(allIngredients); };
    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}