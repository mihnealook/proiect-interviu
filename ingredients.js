var allIngredients = [];

window.onload = () => { getIngredients(); };

function getIngredients() {
    let searchQuerry = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    document.getElementById("container-cocktail").innerHTML = "";
    document.getElementById("descriere").hidden = true;
    document.getElementById("rezultate").hidden = true;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        for(let ingredient of JSON.parse(this.responseText)["drinks"]) {
            allIngredients.push(ingredient["strIngredient1"]);
        };
        addIngredientsToList()
    };
    xhttp.open("GET", searchQuerry, true);
    xhttp.send();
}

function addIngredientsToList() {
    const wantedIngredients = document.getElementById("butoane-dorite");
    const unwantedIngredients = document.getElementById("butoane-nedorite");
    for(let ingredient of allIngredients) {
        wantedIngredients.innerHTML +=
        `<input type="checkbox" class="btn-check mb-5 me-2" id="btn-dorit${allIngredients.indexOf(ingredient)}" autocomplete="off">
        <label class="btn-sm btn-outline-info" for="btn-dorit${allIngredients.indexOf(ingredient)}">${ingredient}</label>` + "\n";

        unwantedIngredients.innerHTML +=
        `<input type="checkbox" class="btn-check mb-5 me-2" id="btn-nedorit${allIngredients.indexOf(ingredient)}" autocomplete="off">
        <label class="btn-sm btn-outline-danger" for="btn-nedorit${allIngredients.indexOf(ingredient)}">${ingredient}</label>` + "\n";
    }
}

function cautaCocktail() {
    const wantedIngredients = [];
    const unwantedIngredients = [];

    for(let i = 0; i < allIngredients.length; i++) {
        let checkedWanted = document.getElementById("btn-dorit"+i.toString()).checked;
        let checkedUnwanted = document.getElementById("btn-nedorit"+i.toString()).checked;

        if(checkedWanted && checkedUnwanted) {
            alert("Nu poți bifa un element și ca dorit și ca nedorit!!");
            return;
        } else {
            if(checkedWanted)
                wantedIngredients.push(allIngredients[i]);
            if(checkedUnwanted)
            unwantedIngredients.push(allIngredients[i]);
        }
    }

    console.log(wantedIngredients);
    console.log(unwantedIngredients);
}