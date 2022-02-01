var searchBar = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var mainRecipe = document.querySelector('#main-recipe')

var mainImg = document.querySelector('#main-img');
var mainVid = document.querySelector('#main-video');
var mainInstructions = document.querySelector('#main-instr');
var mainIngredients = document.querySelector('#main-ingre');

var secondRecipe = document.querySelector('#second-recipe')
var secondImg = document.querySelector('#second-img');
var secondVid = document.querySelector('#second-video');
var secondInstructions = document.querySelector('#second-instr');
var secondIngredients = document.querySelector('#second-ingre');

var thirdRecipe = document.querySelector('#third-recipe')
var thirdImg = document.querySelector('#third-img');
var thirdVid = document.querySelector('#third-video');
var thirdInstructions = document.querySelector('#third-instr');
var thirdIngredients = document.querySelector('#third-ingre');

var fourthRecipe = document.querySelector('#fourth-recipe')
var fourthImg = document.querySelector('#fourth-img');
var fourthVid = document.querySelector('#fourth-video');
var fourthInstructions = document.querySelector('#fourth-instr');
var fourthIngredients = document.querySelector('#fourth-ingre');

var fifthRecipe = document.querySelector('#fifth-recipe')
var fifthImg = document.querySelector('#fifth-img');
var fifthVid = document.querySelector('#fifth-video');
var fifthInstructions = document.querySelector('#fifth-instr');
var fifthIngredients = document.querySelector('#fifth-ingre');

var recipeList = document.querySelector("#search-history")


var recipeSearched = "";
var mealId = "";
var mealName = "";

var savedRecipes = JSON.parse(localStorage.getItem("searchHistory")) || [];

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    var mealSearch = searchBar.value.trim(); 

    recipeSearched = mealSearch;

    savedRecipes.push(mealSearch);

    localStorage.setItem("searchHistory", JSON.stringify(savedRecipes));
 
    getIngredientInfo();
    createSearchHistory();
    
});

// need to create buttons for previously searched receipes, local storage made above
function createSearchHistory() {
    recipeList.innerHTML = "";

    var listOfSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (listOfSearchHistory !== null) {
        listOfRecipes = listOfSearchHistory
    }

    for (var i = 0; i < listOfRecipes.length; i++) {
        var recipeButtons = document.createElement("button");

        recipeButtons.textContent = listOfRecipes[i];

        recipeList.appendChild(recipeButtons);

        for (let i = 0; i <= recipeList.childElementCount; i++) {

            if(recipeList.children.item(i) != null) {
                recipeList.children.item(i).addEventListener("click", function () {
                    console.log(recipeList.children.item(i));
                    recipeSearched = recipeList.children.item(i).textContent
                    getIngredientInfo();
                });
            }
        }
    }
}

function getIngredientInfo() {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearched}`)
        .then(function (response){
            console.log(response)
            return response.json();
            
        })
        .then(function (data){
            console.log(data)

            if(data.meals !== null) {        
                mainRecipe.innerHTML = data.meals[0].strMeal;
                secondRecipe.innerHTML = data.meals[1].strMeal;
                thirdRecipe.innerHTML = data.meals[2].strMeal;
                fourthRecipe.innerHTML = data.meals[3].strMeal;
                fifthRecipe.innerHTML = data.meals[4].strMeal;
                mainImg.setAttribute('src', data.meals[0].strMealThumb);
                secondImg.setAttribute('src', data.meals[1].strMealThumb);
                thirdImg.setAttribute('src', data.meals[2].strMealThumb);
                fourthImg.setAttribute('src', data.meals[3].strMealThumb);
                fifthImg.setAttribute('src', data.meals[4].strMealThumb);
            } else {
                mainRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                secondRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient"
                thirdRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient"
                fourthRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient"
                fifthRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient"
                mainImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                secondImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                thirdImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                fourhtImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                fifthImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                mainVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                secondVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                thirdVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                fourthVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                fifthVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
            }
            
            if(data.meals !== null){
                mealName = data.meals.strMeal;
                // mealName = data.meals.strMeal
                // mealName = data.meals.strMeal
                // mealName = data.meals.strMeal
                // mealName = data.meals.strMeal
            } else {mealName = "No Recipes Found Please Try A Different Ingredient"
            }

            console.log(mealName)
            
            // console.log(data.meals[0].strMeal)

            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
            .then (function (response){
                console.log(response)

                return response.json()

            })
            .then(function(data){
                console.log(data)
                if (data.meals !== null){
                    mainIngredients.innerHTML = "Ingredients: "
                    secondIngredients.innerHTML = "Ingredients: "
                    thirdIngredients.innerHTML = "Ingredients: "
                    fourthIngredients.innerHTML = "Ingredients: "
                    fifthIngredients.innerHTML = "Ingredients: "
                    mainInstructions.innerHTML = "Instructions: " + data.meals[0].strInstructions 
                    secondInstructions.innerHTML = "Instructions: " + data.meals[1].strInstructions 
                    thirdInstructions.innerHTML = "Instructions: " + data.meals[2].strInstructions 
                    fourthInstructions.innerHTML = "Instructions: " + data.meals[3].strInstructions 
                    fifthInstructions.innerHTML = "Instructions: " + data.meals[4].strInstructions 
                    console.log(data.meals[1].strInstructions)
                    // console.log(Object.entries(data.meals[0]))
                    dataArray = Object.entries(data.meals[0])
                    dataArray2 = Object.entries(data.meals[1])
                    dataArray3 = Object.entries(data.meals[2])
                    dataArray4 = Object.entries(data.meals[3])
                    dataArray5 = Object.entries(data.meals[4])
                    // console.log(dataArray.slice(9,49))
                    // console.log(dataArray[10][0], dataArray[10][1])
                    for (each of dataArray.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                          } 
                    }
                    for (each of dataArray2.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray2[dataArray2.indexOf(each)+20][1])
                          } 
                    }
                    for (each of dataArray3.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray3[dataArray3.indexOf(each)+20][1])
                          } 
                    }
                    for (each of dataArray4.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray4[dataArray4.indexOf(each)+20][1])
                          } 
                    }
                    for (each of dataArray5.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray5[dataArray5.indexOf(each)+20][1])
                          } 
                    }
    
     
                    for (each of dataArray.slice(9,29)) {
                        if(each[1] != "") {
                            console.log(each)
                            const newIngredient = document.createElement('div')
                            newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                            mainIngredients.append(newIngredient)
    
                            } 
                       }
    
                       mainVid.href = data.meals[0].strYoutube;
                       console.log(mainVid.href)
            } else {
                mainInstructions.innerHTML = "Please Try A Different Ingredient"
                mainIngredients.innerHTML = "";   
            }
          })           
        });

}

createSearchHistory();
getIngredientInfo()