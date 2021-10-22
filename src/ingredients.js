/**
 * @fileoverview Rezolvarea exercițiului 2
 */

var allIngredients = []; /* Conține toate ingredientele primite de la API */
var lastResponse; /* Conține băuturile primite în ultimul querry efectuat */
/* Dicționar în care cheile sunt numele băuturilor din dicționar,
 * iar valorile sunt numărul de ingrediente dorite pe care băutura
 * respectivă le conține
 */
var dictionaryOfDrinks = new Map(); 
const ingredientQuerryLink =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

/* Ingredientele se preiau după încărcarea paginii */
window.onload = () => { getIngredients(); };

/**
 * Funcție care apelează API-ul de ingrediente și populează
 * listele din care utilizatorul poate selecta ingrediente
 * dorite sau nedorite
 */
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

/**
 * Se generează cod HTML pentru checkbox-urile cu care poate interacționa
 * utilizatorul pentru a selecta ingrediente dorite și nedorite
 */
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

/**
 * Funcție apelată de butonul de căutare care preia în 2 liste
 * ingredientele dorite și nedorite în funcție de valorile
 * checkbox-urilor generate anterior
 */
function searchForCocktail() {
    const wantedIngredients = [];
    const unwantedIngredients = [];

    /* Se golește dicționarul de băuturi */
    dictionaryOfDrinks = new Map();
    lastResponse = "";

    for (let i = 0; i < allIngredients.length; i++) {
        const checkedWanted =
            document.getElementById("btn-wanted"+i.toString()).checked;
        const checkedUnwanted =
            document.getElementById("btn-unwanted"+i.toString()).checked;

        if (checkedWanted && checkedUnwanted) {
            /* Utilizatorul nu poate bifa același ingredient în ambele liste */
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
        /* Utilizatorul trebuie să selecteze cel puțin un ingredient dorit */
        alert("Trebuie să alegi cel puțin un ingredient dorit!!");
        return;
    }

    /*
     * Se face un querry pentru fiecare element dorit și
     * se adaugă rezultatele în dicționar
     */
    for (let i = 0; i < wantedIngredients.length; i++) {
        searchByIngredients(wantedIngredients, i);
    }

    /*
     * Se face un querry pentru fiecare element nedorit și
     * se scot rezultatele din dicționar
     */
    for (let i = 0; i < unwantedIngredients.length; i++) {
        removeByIngredients(unwantedIngredients, i);
    }

    /* Se afișează elementele rămase */
    renderResults(wantedIngredients.length);
}

/**
 * Funcție care face un apel de API pentru ingredientul curent
 * și adaugă băuturile primite în dicționar
 * @param {Array<string>} wantedIngredients Lista de ingrediente dorite
 * @param {int} index Index-ul ingredientului curent
 */
function searchByIngredients(wantedIngredients, index) {
    let currentIngredient = wantedIngredients[index];
    let searchQuerry = ingredientQuerryLink + currentIngredient;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { addToDictionary(this); };

    xhttp.open("GET", searchQuerry, false);
    xhttp.send();
}

/**
 * Funcție care face un apel de API pentru ingredientul curent
 * și scoate băuturile primite din dicționar
 * @param {Array<string>} wantedIngredients Lista de ingrediente nedorite
 * @param {int} index Index-ul ingredientului curent
 */
function removeByIngredients(unwantedIngredients, index) {
    let currentIngredient = unwantedIngredients[index];
    let searchQuerry = ingredientQuerryLink + currentIngredient;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { removeFromDictionary(this); };

    xhttp.open("GET", searchQuerry, false);
    xhttp.send();
}

/**
 * Funcție care crește valoarea din dicționar (adică numărul de elemente dorite
 * pe care îl conține băutura respectivă) pentru băuturile primite ca
 * răspuns de la API.
 * @param {Object} context Context-ul din funcția de onload a request-ului
 */
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

/**
 * Funcție care șterge din dicționar băuturile primite ca răspuns de la API
 * deoarece conțin ingrediente nedorite.
 * @param {Object} context Context-ul din funcția de onload a request-ului
 */
function removeFromDictionary(context) {
    let temporaryResponse = JSON.parse(context.responseText)["drinks"];

    for (let drink of temporaryResponse) {
        if (dictionaryOfDrinks.has(drink["strDrink"])) {
            dictionaryOfDrinks.delete(drink["strDrink"]);
        }
    }
}

/**
 * Funcție care concatenează numele băuturilor rămase în dicționar
 * care conțin toate ingredientele dorite și afișează string-ul rezultat
 * @param {int} numberOfWantedIngredients Numărul de ingrediente dorite
 */
function renderResults(numberOfWantedIngredients) {
    /* Verificăm ce băuturi conțin toate ingredientele dorite */
    dictionaryOfDrinks.forEach( function(value, key) {
        if (value == numberOfWantedIngredients) {
            lastResponse += key + ", ";
        }
    });

    /* Dăm unhide la secțiunea unde se afisează rezultatele */
    document.getElementById("container-results").hidden = false;

    if(!lastResponse) {
        /* Dacă nu a fost găsit niciun rezultat */
        document.getElementById("drinks").innerHTML =
            "Nu a fost găsit niciun rezultat"
    } else {
        /* Scăpăm de ultima "," și de trailing whitespace */
        document.getElementById("drinks").innerHTML =
            lastResponse.trim().slice(0, -1);
    }
}