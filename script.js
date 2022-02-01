var searchBar = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var mainRecipe = document.querySelector('#main-recipe')

var mainImg = document.querySelector('#main-img');
var mainVid = document.querySelector('#main-video');
var mainInstructions = document.querySelector('#main-instr');
var mainIngredients = document.querySelector('#main-ingre');

var secondRecipe = document.querySelector('#main-recipe')
var secondImg = document.querySelector('#second-img');
var secondVid = document.querySelector('#second-video');
var secondInstructions = document.querySelector('#second-instr');
var secondIngredients = document.querySelector('#second-ingre');

var thirdRecipe = document.querySelector('#main-recipe')
var thirdImg = document.querySelector('#third-img');
var thirdVid = document.querySelector('#third-video');
var thirdInstructions = document.querySelector('#third-instr');
var thirdIngredients = document.querySelector('#third-ingre');

var fourthRecipe = document.querySelector('#main-recipe')
var fourthImg = document.querySelector('#fourth-img');
var fourthVid = document.querySelector('#fourth-video');
var fourthInstructions = document.querySelector('#fourth-instr');
var fourthIngredients = document.querySelector('#fourth-ingre');

var fifthRecipe = document.querySelector('#main-recipe')
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
                mainImg.setAttribute('src', data.meals[0].strMealThumb);
            } else {
                mainRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient"
                mainImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                mainVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
            }
            
            if(data.meals !== null){
                mealName = data.meals[0].strMeal
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
                    mainInstructions.innerHTML = "Instructions: " + data.meals[0].strInstructions 
                    // console.log(data.meals[0].strInstructions)
                    // console.log(Object.entries(data.meals[0]))
                    dataArray = Object.entries(data.meals[0])
                    // console.log(dataArray.slice(9,49))
                    // console.log(dataArray[10][0], dataArray[10][1])
                    for (each of dataArray.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                          } 
                    }
    // still working on the ingredients if no info returns
     
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