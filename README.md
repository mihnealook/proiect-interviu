# Cocktailpedia

Cocktailpedia este o aplicație care le oferă utilizatorilor un mod de a căuta cocktail-uri folosind API-ul [thecocktaildb](https://www.thecocktaildb.com/drink/12450-Victor)

## Rulare

Pentru a rula proiectul trebuie:
- extrase într-un folder toate fișierele din arhivă (păstrând ierarhia)
- deschis unul dintre cele 2 fișiere .html folosind un browser modern (Google Chrome, Mozilla Firefox, Microsoft Edge, Opera)


## Probleme Întâmpinate

### 1. API-ul pentru ingrediente nu întoarce un obiect complet de tip "Drink"

Un obiect complet de tip drink are forma:
```JSON
{
    "idDrink": "",
    "strDrink": "",
    "strDrinkAlternate": "",
    "strTags": "",
    "strVideo": "",
    "strCategory": "",
    "strIBA": "",
    "strAlcoholic": "",
    "strGlass": " ",
    "strInstructions": "",
    "strInstructionsES": "",
    "strInstructionsDE": "",
    "strInstructionsFR": "",
    "strInstructionsIT": "",
    "strInstructionsZH-HANS": "",
    "strInstructionsZH-HANT": "",
    "strDrinkThumb": "",
    "strIngredient1": "",
    "strIngredient2": "",
    "strIngredient3": "",
    "strIngredient4": "",
    "strIngredient5": "",
    "strIngredient6": "",
    "strIngredient7": "",
    "strIngredient8": "",
    "strIngredient9": "",
    "strIngredient10": "",
    "strIngredient11": "",
    "strIngredient12": "",
    "strIngredient13": "",
    "strIngredient14": "",
    "strIngredient15": "",
    "strMeasure1": "",
    "strMeasure2": "",
    "strMeasure3": "",
    "strMeasure4": "",
    "strMeasure5": "",
    "strMeasure6": "",
    "strMeasure7": "",
    "strMeasure8": "",
    "strMeasure9": "",
    "strMeasure10": "",
    "strMeasure11": "",
    "strMeasure12": "",
    "strMeasure13": "",
    "strMeasure14": "",
    "strMeasure15": "",
    "strImageSource": "",
    "strImageAttribution": "",
    "strCreativeCommonsConfirmed": "",
    "dateModified": ""
}
```

Un obiect întors de API-ul de ingrediente are forma:
```JSON
{
    "strDrink": "",
    "strDrinkThumb": "",
    "idDrink": ""
}
```

Deoarece obiectele primite nu conțineau lista întreagă de ingrediente, am fost nevoit să fac un apel de API pentru fiecare ingredient (în loc sa apelez o singură dată API-ul și să filtrez folosindu-mă de obiectele primite și de listele de ingrediente)

### 2. API-urile pentru ingrediente și pentru search întorc un număr limitat de obiecte

Apelul care listează ingredientele întoarce doar 100 de răspunsuri (deși în baza de date se regăsesc 488) iar apelul care realizează un search querry întoarce doar 25.

## Precizări

Coding style-ul folosit este [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

Favicon-ul a fost preluat de pe [flaticon.com](https://www.flaticon.com/premium-icon/cocktail_3086535?term=cocktail&related_id=3086535)

Câteva elemente din codul de HTML au fost preluate din tutorialele de Bootstrap 5 de [aici](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

Proiectul a fost testat pe: Google Chrome (94.0.4606.81), Mozilla Firefox (93.0), Microsoft Edge (94.0.992.50) și Opera (80.0.4170.40)

Detalii despre implementare se regăsesc în comentariile din cod

Proiectul este disponibil și pe [github](https://github.com/mihnealook/proiect-interviu)