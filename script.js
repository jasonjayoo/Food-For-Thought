var searchBar = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');
var mainRecipe = document.querySelector('#main-recipe')

var mainImg = document.querySelector('#main-img');
var mainVid = document.querySelector('#main-video');
var mainInstructions = document.querySelector('#main-instr');
var mainIngredients = document.querySelector('#main-ingre');

var recipeSearched = "";
var mealId = "";

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    
    var mealSearch = searchBar.value.trim(); 

    recipeSearched = mealSearch;
 
    getIngredientInfo()
});


function getIngredientInfo() {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearched}`)
        .then(function (response){
            console.log(response)
            return response.json();
            
        })
        .then(function (data){
            console.log(data)
            // if(error === remove hidden class in modal html) unhide modal & "no recipes for pasta"
            if(data.meals !== null) {        
                mainRecipe.innerHTML = data.meals[0].strMeal;
                mainImg.setAttribute('src', data.meals[0].strMealThumb);
                // mainVid.href = data.meals[0]
            } else {
                mainRecipe.innerHTML = "No Recipes Found"
                mainImg.setAttribute('src', "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg");
                mainVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
            }
            
            mealName = data.meals[0].strMeal
            console.log(data.meals[0].strMeal)

            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
            .then (function (response){
                console.log(response)
                return response.json()

            })
            .then(function(data){
                console.log(Object.entries(data.meals[0]))
                dataArray = Object.entries(data.meals[0])
                console.log(dataArray.slice(9,49))
                console.log(dataArray[10][0], dataArray[10][1])
                for (each of dataArray.slice(9,29)) {
                    if(each[1] != "") {
                      console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                      } 
                }
                mainInstructions.innerHTML = data.meals[0].strInstructions
 
                for (each of dataArray.slice(9,29)) {
                    if(each[1] != "") {
                        const newIngredient = document.createElement('div')
                        newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                        mainIngredients.append(newIngredient)

                        } 
                   }

                mainVid.href = data.meals[0].strYoutube;
                console.log(strYoutube)
            })           
        });

        // non-functional
       


    // .then(response => response.json())
    // .then(data => {
    //     console.log(data)
    //     mainRecipe.innerHTML = data.meals[1].strMeal;
    //     mainImg.setAttribute('src', data.meals[1].strMealThumb);
        
    // })
}
// getIngredientInfo()