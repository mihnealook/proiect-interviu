var lastResponse;

function cautaCocktail() {
    let searchTopic = document.getElementById("inputCocktail").value;
    let alcoholCheck = document.getElementById("checkAlcool").checked;
    document.getElementById("container-cocktail").innerHTML = "";
    document.getElementById("descriere").hidden = true;
    document.getElementById("rezultate").hidden = false;
    submitQuerry(searchTopic, alcoholCheck);
}

function submitQuerry(searchTopic, alcoholCheck) {
    let searchQuerry = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTopic;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() { parseResponse(alcoholCheck, this); };
    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

function parseResponse(alcoholCheck, context) {
    let addedElem = 0;
    let indexOfAddedElem = 0;
    lastResponse = JSON.parse(context.responseText)["drinks"];
    if(!lastResponse) {
        document.getElementById("container-cocktail").innerHTML = `"<h3 class="col-sm-4 mb-1 ms-3">Nu a fost gasit niciun rezultat</h3>"`;
        return;
    }
    
    for(let result of lastResponse) {
        if(alcoholCheck || (!alcoholCheck && result["strAlcoholic"] != "Alcoholic")) {
            addedElem++;
            addElemToList(result, lastResponse.indexOf(result));
            indexOfAddedElem = lastResponse.indexOf(result);
        }
    }

    if(!addedElem) {
        document.getElementById("container-cocktail").innerHTML = `<h3 class="col-sm-4 mb-1 ms-3">Nu a fost gasit niciun rezultat</h3>`;
    }

    if(addedElem == 1) {
        showDetails(indexOfAddedElem)
    }
}

function addElemToList(elem, index) {
    const divParent = document.getElementById("container-cocktail");
    divParent.innerHTML+=
    `<div class="d-flex flex-row align-items-center col-sm-6 mb-1 ms-3 pe-3">
      <p class="my-auto">${elem["strDrink"]}</p>
      <button class="btn btn-outline-info my-auto btn-sm ms-auto text-center" id="buttonExtend${index}" onclick="showDetails(${index})">Extend</button>
    </div>`
}

function showDetails(index) {
    let target = lastResponse[index];
    let imagine = document.getElementById("descriere-imagine");
    let titlu = document.getElementById("descriere-titlu");
    let descriere = document.getElementById("descriere-descriere");
    let ingrediente = document.getElementById("descriere-ingrediente");
    let stringIngrediente = "";

    imagine.src = target["strDrinkThumb"];
    titlu.innerHTML = target["strDrink"];
    descriere.innerHTML = target["strInstructions"];

    for(let i = 1; i <= 15; i++) {
        let ingredient = target["strIngredient" + i.toString()];
        let measure = target["strMeasure" + i.toString()];
        if(!ingredient) {
            break;
        }
        stringIngrediente += ingredient
        if(measure) {
            stringIngrediente += "(" + measure.trim() + ")";
        }
        stringIngrediente += ", ";
    }
    ingrediente.innerHTML = stringIngrediente.slice(0, -2);
    document.getElementById("descriere").hidden = false;
}