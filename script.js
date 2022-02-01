var searchBar = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var mainRecipe = document.querySelector('#main-recipe')

var mainImg = document.querySelector('#main-img');
var mainVid = document.querySelector('#main-video');
var mainInstructions = document.querySelector('#main-instr');
var mainIngredients = document.querySelector('#main-ingre');

var recipeList = document.querySelector("#search-history")

var recipeSearched = "";
var mealId = "";

var savedRecipes = JSON.parse(localStorage.getItem("searchHistory")) || [];

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    var mealSearch = searchBar.value.trim(); 

    recipeSearched = mealSearch;

    savedRecipes.push(mealSearch);

    localStorage.setItem("searchHistory", JSON.stringify(savedRecipes));
 
    getIngredientInfo()
    
});

// need to create buttons for previously searched receipes, local storage made above
function createSearchHistory() {
    
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
                mainRecipe.innerHTML = "No Recipes Found"
                mainImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                mainVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
            }
            
            if(data.meals !== null){
                mealName = data.meals[0].strMeal
            } else {mealName = "No Recipes Found - Please Try A Different Ingredient"
            }
            
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
                    console.log(data.meals[0].strInstructions)
                    console.log(Object.entries(data.meals[0]))
                    dataArray = Object.entries(data.meals[0])
                    console.log(dataArray.slice(9,49))
                    console.log(dataArray[10][0], dataArray[10][1])
                    for (each of dataArray.slice(9,29)) {
                        if(each[1] != "") {
                          console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                          } 
                    }
    // still working on the ingredients if no info returns
     
                    for (each of dataArray.slice(9,29)) {
                        if(each[1] != "") {
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
// getIngredientInfo()