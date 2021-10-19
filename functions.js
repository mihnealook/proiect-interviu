var lastResponse;

function cautaCocktail() {
    let searchTopic = document.getElementById("inputCocktail").value;
    let alcoholCheck = document.getElementById("checkAlcool").checked;
    document.getElementById("container-cocktail").innerHTML = "";
    submitQuerry(searchTopic, alcoholCheck);
}

function submitQuerry(searchTopic, alcoholCheck) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() { parseResponse(alcoholCheck, this); };
    let searchQuerry = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTopic;
    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

function parseResponse(alcoholCheck, context) {
    let addedElem = false;
    lastResponse = JSON.parse(context.responseText)["drinks"];
    if(!lastResponse) {
        return;
    }
    
    for(let result of lastResponse) {
        if(alcoholCheck || (!alcoholCheck && result["strAlcoholic"] != "Alcoholic")) {
            addedElem = true;
            addElemToList(result, lastResponse.indexOf(result));
        }
    }

    if(!addedElem) {
        document.getElementById("container-cocktail").innerHTML = `"<h3 class="col-sm-4 mb-1 ms-3">Nu a fost gasit niciun rezultat</h3>"`;
    }
}

function addElemToList(elem, index) {
    const divParent = document.getElementById("container-cocktail");
    divParent.innerHTML+=
    `<div class="d-flex flex-row align-items-center col-sm-4 mb-1 ms-3">
      <p class="my-auto">${elem["strDrink"]}</p>
      <button class="btn btn-outline-info my-auto btn-sm ms-auto text-center">Extend</button>
    </div>`
}