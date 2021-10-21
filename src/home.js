var lastResponse;
const querryLink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function searchForCocktail() {
    let searchTopic = document.getElementById("text-cocktail").value;
    let alcoholCheck = document.getElementById("check-alcohol").checked;
    document.getElementById("container-cocktail-list").innerHTML = "";
    document.getElementById("container-card").hidden = true;
    document.getElementById("container-results").hidden = false;
    submitQuerry(searchTopic, alcoholCheck);
}

function submitQuerry(searchTopic, alcoholCheck) {
    let searchQuerry = querryLink + searchTopic;
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() { parseResponse(alcoholCheck, this); };

    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

function parseResponse(alcoholCheck, context) {
    let addedElem = 0;
    let indexOfAddedElem = 0;
    const noResultString =
        `"<h3 class="col-sm-4 mb-1 ms-3">Nu a fost găsit niciun rezultat</h3>"`;
    const cocktailList = document.getElementById("container-cocktail-list");

    lastResponse = JSON.parse(context.responseText)["drinks"];

    if (!lastResponse) {
        cocktailList.innerHTML = noResultString;
        return;
    }
    
    for (let result of lastResponse) {
        if (alcoholCheck ||
            (!alcoholCheck && result["strAlcoholic"] != "Alcoholic")) {
            addedElem++;
            addElemToList(result, lastResponse.indexOf(result));
            indexOfAddedElem = lastResponse.indexOf(result);
        }
    }

    if (!addedElem) {
        cocktailList.innerHTML = noResultString;
    }

    if (addedElem == 1) {
        showDetails(indexOfAddedElem)
    }
}

function addElemToList(elem, index) {
    const divParent = document.getElementById("container-cocktail-list");
    divParent.innerHTML+=
    `<div class="d-flex flex-row align-items-center col-sm-6 mb-1 ms-3 pe-3">
      <p class="my-auto">${elem["strDrink"]}</p>
      <button class="btn btn-outline-info my-auto btn-sm ms-auto text-center" id="button-extend${index}" onclick="showDetails(${index})">Extend</button>
    </div>`
}

function showDetails(index) {
    const target = lastResponse[index];
    const image = document.getElementById("card-image");
    const title = document.getElementById("card-title");
    const description = document.getElementById("card-description");
    const ingredients = document.getElementById("card-ingredients");
    let stringIngredients = "";

    image.src = target["strDrinkThumb"];
    title.innerHTML = target["strDrink"];
    description.innerHTML = target["strInstructions"];

    for (let i = 1; i <= 15; i++) {
        const ingredient = target["strIngredient" + i.toString()];
        const measure = target["strMeasure" + i.toString()];

        if (!ingredient) {
            break;
        }

        stringIngredients += ingredient
        if (measure) {
            stringIngredients += "(" + measure.trim() + ")";
        }
        stringIngredients += ", ";
    }
    ingredients.innerHTML = stringIngredients.slice(0, -2);

    document.getElementById("container-card").hidden = false;
}