/**
 * @fileoverview Rezolvarea exercițiului 1
 */

var lastResponse; /* Conține băuturile primite în ultimul querry efectuat */
const querryLink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

/**
 * Funcție apelată de butonul de căutare care inițializează valorile
 * unor elemente HTML și apelează funcția de API Call
 */
function searchForCocktail() {
    /* Topicul căutării preluat din form-ul completat de user */
    let searchTopic = document.getElementById("text-cocktail").value;
    /* 
     * Valoarea checkbox-ului de "Conține alcool" preluată din
     * form-ul completat de user
     */
    let alcoholCheck = document.getElementById("check-alcohol").checked;
    document.getElementById("container-cocktail-list").innerHTML = "";
    document.getElementById("container-card").hidden = true;
    document.getElementById("container-results").hidden = false;
    submitQuerry(searchTopic, alcoholCheck);
}

/**
 * Funcție care apelează API-ul și trimite datele către funcția
 * de parsare a răspunsului
 * @param {string} searchTopic Topic-ul căutării
 * @param {boolean} alcoholCheck Valoarea checkbox-ului de alcohol check
 */
function submitQuerry(searchTopic, alcoholCheck) {
    let searchQuerry = querryLink + searchTopic;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { parseResponse(alcoholCheck, this); };

    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

/**
 * Funcție care parează raspunsul primit de la API și adaugă în
 * lista de băuturi obiecte de tip drink după ce verifică dacă
 * respectă condiția dată de alcoholCheck
 * @param {boolean} alcoholCheck Valoarea checkbox-ului de alcohol check
 * @param {Object} context Context-ul din funcția de onload a request-ului
 */
function parseResponse(alcoholCheck, context) {
    let addedElem = 0; /* Contor cu numărul de elemente adăugate în listă */
    let indexOfAddedElem = 0; /* Index-ul ultimului element adăugat */
    const noResultString =
        `<h3 class="col-sm-4 mb-1 ms-3">Nu a fost găsit niciun rezultat</h3>`;
    const cocktailList = document.getElementById("container-cocktail-list");

    lastResponse = JSON.parse(context.responseText)["drinks"];

    /* Îm cazul în care querry-ul nu a întors niciun rezultat */
    if (!lastResponse) {
        cocktailList.innerHTML = noResultString;
        return;
    }
    
    /* 
     * Filtrăm prin rezultatele primite și le adăugăm în
     * listă doar pe cele care se potrivesc cu condiția
     */
    for (let result of lastResponse) {
        if (alcoholCheck ||
            (!alcoholCheck && result["strAlcoholic"] != "Alcoholic")) {
            addedElem++;
            addElemToList(result, lastResponse.indexOf(result));
            indexOfAddedElem = lastResponse.indexOf(result);
        }
    }

    /* Îm cazul în care niciun rezultat nu se potrivește cu condiția */
    if (!addedElem) {
        cocktailList.innerHTML = noResultString;
    }

    /* În cazul în care un singur rezultat este valid apar automat detaliile */
    if (addedElem == 1) {
        showDetails(indexOfAddedElem)
    }
}

/**
 * Funcție care preia un drink și generează cod HTML pentru numele băuturii
 * trimise ca parametru și pentru butonul de mai multe detalii
 * @param {Drink} elem Băutura curenta
 * @param {int} index Indexul băuturii curente din array-ul de băuturi
 */
function addElemToList(elem, index) {
    const divParent = document.getElementById("container-cocktail-list");
    /* Adăugăm la final-ul div-ului de băuturi elementul curent */
    divParent.innerHTML+=
    `<div class="d-flex flex-row align-items-center col-sm-6 mb-1 ms-3 pe-3">
      <p class="my-auto">${elem["strDrink"]}</p>
      <button class="btn btn-outline-info my-auto btn-sm ms-auto text-center" id="button-extend${index}" onclick="showDetails(${index})">Detalii</button>
    </div>`
}

/**
 * Funcție care updatează informațiile din card-ul cu detalii (în funcție
 * de băutura selectată), îl face vizibil și dă autoscroll până la el
 * @param {int} index Indexul băuturii curente din array-ul de băuturi
 */
function showDetails(index) {
    const target = lastResponse[index]; /* Băutura selectată */
    /*
     * Fiecare variabilă de mai jos corespunde unui element HTML
     * din card-ul cu detalii (imaginea, titlul, descrierea,
     * lista de ingrediente)
     */
    const image = document.getElementById("card-image");
    const title = document.getElementById("card-title");
    const description = document.getElementById("card-description");
    const ingredients = document.getElementById("card-ingredients");
    let stringIngredients = "";

    /* Modificăm detaliile de pe card cu datele curente */
    image.src = target["strDrinkThumb"];
    title.innerHTML = target["strDrink"];
    description.innerHTML = target["strInstructions"];

    /* Iteram prin câmpurile de ingrediente din obiectul de tip drink */
    for (let i = 1; i <= 15; i++) {
        /* Ingredientele sunt reținute în câmpuri de tip strIngredient[1-15] */
        const ingredient = target["strIngredient" + i.toString()]; 
        /* Măsurile sunt reținute în câmpuri de tip strMeasure[1-15] */
        const measure = target["strMeasure" + i.toString()];

        /* Verificăm dacă mai există ingrediente */
        if (!ingredient) {
            break;
        }

        /*
         * Generăm un string care are toate numele și valorile ingredientelor
         * concatenate
         */
        stringIngredients += ingredient
        if (measure) {
            stringIngredients += "(" + measure.trim() + ")";
        }
        stringIngredients += ", ";
    }
    /* Scăpăm de ultima "," și de trailing whitespace */
    ingredients.innerHTML = stringIngredients.slice(0, -2);

    /* Dăm unhide la card-ul cu detalii */
    document.getElementById("container-card").hidden = false;

    /* Dăm autoscroll până în josul paginii, unde se află card-ul */
    window.scrollTo(0, document.body.scrollHeight);
}