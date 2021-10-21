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