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