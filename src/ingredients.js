var allIngredients = [];
var lastResponse;
var dictionaryOfDrinks = new Map();
const ingredientQuerryLink =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

window.onload = () => { getIngredients(); };

function getIngredients() {
    let searchQuerry =
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    const xhttp = new XMLHttpRequest();

    document.getElementById("container-results").hidden = true;

    xhttp.onload = function() {
        for (let ingredient of JSON.parse(this.responseText)["drinks"]) {
            allIngredients.push(ingredient["strIngredient1"]);
        };
        addIngredientsToList()
    };

    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

function addIngredientsToList() {
    const wantedIngredients = document.getElementById("buttons-wanted");
    const unwantedIngredients = document.getElementById("buttons-unwanted");

    for (let ingredient of allIngredients) {
        wantedIngredients.innerHTML +=
        `<input type="checkbox" class="btn-check mb-5 me-2" id="btn-wanted${allIngredients.indexOf(ingredient)}" autocomplete="off">
        <label class="btn-sm btn-outline-info" for="btn-wanted${allIngredients.indexOf(ingredient)}">${ingredient}</label>` + "\n";

        unwantedIngredients.innerHTML +=
        `<input type="checkbox" class="btn-check mb-5 me-2" id="btn-unwanted${allIngredients.indexOf(ingredient)}" autocomplete="off">
        <label class="btn-sm btn-outline-danger" for="btn-unwanted${allIngredients.indexOf(ingredient)}">${ingredient}</label>` + "\n";
    }
}

function searchForCocktail() {
    const wantedIngredients = [];
    const unwantedIngredients = [];

    dictionaryOfDrinks = new Map();
    lastResponse = "";

    for (let i = 0; i < allIngredients.length; i++) {
        const checkedWanted =
            document.getElementById("btn-wanted"+i.toString()).checked;
        const checkedUnwanted =
            document.getElementById("btn-unwanted"+i.toString()).checked;

        if (checkedWanted && checkedUnwanted) {
            alert("Nu poți bifa un element și ca dorit și ca nedorit!!");
            return;
        } else {
            if (checkedWanted)
                wantedIngredients.push(allIngredients[i]);
            if (checkedUnwanted)
                unwantedIngredients.push(allIngredients[i]);
        }
    }

    if (!wantedIngredients.length) {
        alert("Trebuie să alegi cel puțin un ingredient dorit!!");
        return;
    }

    for (let i = 0; i < wantedIngredients.length; i++) {
        searchByIngredients(wantedIngredients, i);
    }

    for (let i = 0; i < unwantedIngredients.length; i++) {
        removeByIngredients(unwantedIngredients, i);
    }

    renderResults(wantedIngredients.length);
}

function searchByIngredients(wantedIngredients, index) {
    let currentIngredient = wantedIngredients[index];
    let searchQuerry = ingredientQuerryLink + currentIngredient;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { addToDictionary(this); };

    xhttp.open("GET", searchQuerry, false);
    xhttp.send();
}

function removeByIngredients(unwantedIngredients, index) {
    let currentIngredient = unwantedIngredients[index];
    let searchQuerry = ingredientQuerryLink + currentIngredient;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { removeFromDictionary(this); };

    xhttp.open("GET", searchQuerry, false);
    xhttp.send();
}

function addToDictionary(context) {
    let temporaryResponse = JSON.parse(context.responseText)["drinks"];

    for (let drink of temporaryResponse) {
        if (dictionaryOfDrinks.has(drink["strDrink"])) {
            dictionaryOfDrinks.set(
                drink["strDrink"],
                dictionaryOfDrinks.get(drink["strDrink"]) + 1);
        } else {
            dictionaryOfDrinks.set(drink["strDrink"], 1);
        }
        
    }
}

function removeFromDictionary(context) {
    let temporaryResponse = JSON.parse(context.responseText)["drinks"];

    for (let drink of temporaryResponse) {
        if (dictionaryOfDrinks.has(drink["strDrink"])) {
            dictionaryOfDrinks.delete(drink["strDrink"]);
        }
    }
}

function renderResults(numberOfWantedIngredients) {
    dictionaryOfDrinks.forEach( function(value, key) {
        if (value == numberOfWantedIngredients) {
            lastResponse += key + ", ";
        }
    });

    document.getElementById("container-results").hidden = false;

    if(!lastResponse) {
        document.getElementById("drinks").innerHTML =
            "Nu a fost găsit niciun rezultat"
    } else {
        document.getElementById("drinks").innerHTML =
            lastResponse.trim().slice(0, -1);
    }
}