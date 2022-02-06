localStorage.removeItem("searchHistory");

var searchBar = document.querySelector('#search-bar');
var searchBtn = document.querySelector('#search-button');

var mainRecipe = document.querySelector('#main-recipe')
var secondRecipe = document.querySelector('#second-recipe')
var thirdRecipe = document.querySelector('#third-recipe')
var fourthRecipe = document.querySelector('#fourth-recipe')
var fifthRecipe = document.querySelector('#fifth-recipe')

var mainImg = document.querySelector('#main-img');
var secondImg = document.querySelector('#second-img');
var thirdImg = document.querySelector('#third-img');
var fourthImg = document.querySelector('#fourth-img');
var fifthImg = document.querySelector('#fifth-img');


var mainVid = document.querySelector('#main-video');
var secondVid = document.querySelector('#second-video');
var thirdVid = document.querySelector('#third-video');
var fourthVid = document.querySelector('#fourth-video');
var fifthVid = document.querySelector('#fifth-video');


var mainInstructions = document.querySelector('#main-instr');
var secondInstructions = document.querySelector('#second-instr');
var thirdInstructions = document.querySelector('#third-instr');
var fourthInstructions = document.querySelector('#fourth-instr');
var fifthInstructions = document.querySelector('#fifth-instr');


var mainIngredients = document.querySelector('#main-ingre');
var secondIngredients = document.querySelector('#second-ingre');
var thirdIngredients = document.querySelector('#third-ingre');
var fourthIngredients = document.querySelector('#fourth-ingre');
var fifthIngredients = document.querySelector('#fifth-ingre');

var fourthContainer = document.querySelector('#fourth-container');
var fifthContainer = document.querySelector('#fifth-container');

var IngreInstrContainer = document.querySelector('#recipe-box')
var additionalRecipes = document.querySelector('#more-recipes')

var recipeList = document.querySelector("#search-history")

var resetBtn = document.querySelector("#reset-button")

var recipeSearched = "";
var mealId = "";
var mealName = "";
var mealName1 = "";
var mealName2 = "";
var mealName3 = "";
var mealName4 = "";


var savedRecipes = JSON.parse(localStorage.getItem("searchHistory")) || [];

searchBtn.addEventListener('click', function(event){
    event.preventDefault();

    var mealSearch = searchBar.value.trim(); 

    recipeSearched = mealSearch;
    if(recipeSearched === ""){
        getIngredientInfo();
    } else {
        savedRecipes.push(mealSearch);

        localStorage.setItem("searchHistory", JSON.stringify(savedRecipes));
     
        getIngredientInfo();
        createSearchHistory();
        
    }

    location.href = "#recipes";

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
console.log("clicked")
                    recipeSearched = recipeList.children.item(i).textContent
                    getIngredientInfo();

                    location.href = "#recipes";
                });
            }
        }
    }
    
}

function getIngredientInfo() {
if(recipeSearched === "") {
    recipeSearched = "pasta"
}
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearched}`)
        .then(function (response){
            return response.json();
            
        })
        .then(function (data){
            searchBar.value = "";

            if(data.meals !== null) {  
                    
                mainRecipe.innerHTML = data.meals[0].strMeal;
                // secondRecipe.innerHTML = data.meals[1].strMeal;
                // thirdRecipe.innerHTML = data.meals[2].strMeal;

                mainImg.src = data.meals[0].strMealThumb;
                // secondImg.src = data.meals[1].strMealThumb;
                // thirdImg.src = data.meals[2].strMealThumb;
                IngreInstrContainer.removeAttribute("class", "hidden");
                additionalRecipes.removeAttribute("class", "hidden")  

                if (data.meals[1]){
                    secondRecipe.innerHTML = data.meals[1].strMeal;
                    secondImg.src = data.meals[1].strMealThumb;
                    secondVid.innerHTML = 'YouTube Video';    
                }

                if (data.meals[2]){
                    thirdRecipe.innerHTML = data.meals[2].strMeal;
                    thirdImg.src = data.meals[2].strMealThumb;
                    thirdVid.innerHTML = 'YouTube Video';
                }

                if (data.meals[3]){
                    fourthRecipe.innerHTML = data.meals[3].strMeal;
                    fourthImg.src = data.meals[3].strMealThumb;
                    fourthVid.innerHTML = 'YouTube Video';    
                }

                if (data.meals[4]){
                    fifthRecipe.innerHTML = data.meals[4].strMeal;
                    fifthImg.src = data.meals[4].strMealThumb;
                    fifthVid.innerHTML = 'YouTube Video';
                }

                if(data.meals[1] === undefined){
                    secondRecipe.innerHTML = "";
                    thirdRecipe.innerHTML = "";
                    secondImg.setAttribute('src', '');
                    thirdImg.setAttribute('src', '');
                    secondVid.innerHTML = "";
                    thirdVid.innerHTML = "";
                    secondInstructions.innerHTML = "";
                    thirdInstructions.innerHTML = "";
                    secondIngredients.innerHTML = "";
                    thirdIngredients.innerHTML = "";
                    fourthRecipe.innerHTML = "";
                    fifthRecipe.innerHTML = "";
                    fourthImg.setAttribute('src', '');
                    fifthImg.setAttribute('src', '');
                    fourthVid.innerHTML = '';
                    fifthVid.innerHTML = '';
                    fourthInstructions.innerHTML = '';
                    fifthInstructions.innerHTML = '';
                    fourthIngredients.innerHTML = '';
                    fifthIngredients.innerHTML = ''; 
                } else 

                if(data.meals[2] === undefined){
                    thirdRecipe.innerHTML = "";
                    thirdImg.setAttribute('src', '');
                    thirdVid.innerHTML = "";
                    thirdInstructions.innerHTML = "";
                    thirdIngredients.innerHTML = "";
                    fourthRecipe.innerHTML = "";
                    fifthRecipe.innerHTML = "";
                    fourthImg.setAttribute('src', '');
                    fifthImg.setAttribute('src', '');
                    fourthVid.innerHTML = '';
                    fifthVid.innerHTML = '';
                    fourthInstructions.innerHTML = '';
                    fifthInstructions.innerHTML = '';
                    fourthIngredients.innerHTML = '';
                    fifthIngredients.innerHTML = ''; 
                } else 

                if(data.meals[3] === undefined){
                    fourthRecipe.innerHTML = "";
                    fifthRecipe.innerHTML = "";
                    fourthImg.setAttribute('src', '');
                    fifthImg.setAttribute('src', '');
                    fourthVid.innerHTML = '';
                    fifthVid.innerHTML = '';
                    fourthInstructions.innerHTML = '';
                    fifthInstructions.innerHTML = '';
                    fourthIngredients.innerHTML = '';
                    fifthIngredients.innerHTML = ''; 

                } else if (data.meals[4] === undefined) {
                    fifthRecipe.innerHTML = "";
                    fifthImg.setAttribute('src', '');
                    fifthVid.innerHTML = '';
                    fifthInstructions.innerHTML = '';
                    fifthIngredients.innerHTML = ''; 
                } 

            } else {
                mainRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                // secondRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                // thirdRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                // fourthRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                // fifthRecipe.innerHTML = "No Recipes Found Please Try A Different Ingredient";
                mainImg.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
                // secondImg.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
                // thirdImg.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
                // fourthImg.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
                // fifthImg.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
                mainVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                // secondVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                // thirdVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4'; 
                // fourthVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                // fifthVid.href = 'https://www.youtube.com/watch?v=INscMGmhmX4';
                // fourthVid.innerHTML = "YouTube Video";
                // fifthVid.innerHTML = "YouTube Video";
                IngreInstrContainer.setAttribute("class", "hidden");
                additionalRecipes.setAttribute("class", "hidden")
                mainIngredients.innerHTML = "";
                // secondIngredients.innerHTML = "";
                // thirdIngredients.innerHTML = "";
                // fourthIngredients.innerHTML = "";
                // fifthIngredients.innerHTML = "";
                mainInstructions.innerHTML = "";
                // secondInstructions.innerHTML = "";
                // thirdInstructions.innerHTML = "";
                // fourthInstructions.innerHTML = "";
                // fifthInstructions.innerHTML =  "";
            }

            if(data.meals !== null){
                mealName = data.meals[0].strMeal
                // mealName1 = data.meals[1].strMeal
                // mealName2 = data.meals[2].strMeal
                getMealInfo(mealName)

                if(data.meals[1] !== undefined) {
                    mealName1 = data.meals[1].strMeal
                    additionalRecipes.removeAttribute("class", "hidden")
                  getMealInfo1(mealName1)}
                  else {
                    additionalRecipes.setAttribute("class", "hidden")
                  }

                  if(data.meals[2] !== undefined) {
                    mealName2 = data.meals[2].strMeal
                  getMealInfo2(mealName2)}
                  else {
                    mealName2 = "No Recipes Found Please Try A Different Ingredient"
                  }

                
                // getMealInfo1(mealName1)
                // getMealInfo2(mealName2)

            if(data.meals[3] !== undefined) {
                mealName3 = data.meals[3].strMeal
              getMealInfo3(mealName3)}
              else {
                mealName3 = "No Recipes Found Please Try A Different Ingredient"
              }

            if(data.meals[4] !== undefined) {
                mealName4 = data.meals[4].strMeal
                getMealInfo4(mealName4)

            } else { 
                mealName4 = "No Recipes Found Please Try A Different Ingredient"
            }
                
            } else {mealName = "No Recipes Found Please Try A Different Ingredient"
            mealName1 = "No Recipes Found Please Try A Different Ingredient"
            mealName2 = "No Recipes Found Please Try A Different Ingredient"
            }
  
        });
}

function getMealInfo (mealName) {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
    .then (function (response){
        return response.json()

    })
    .then(function(data){
        if (data.meals !== null){
            mainIngredients.innerHTML = "Ingredients: <br><br>"
            let firstInstructions = data.meals[0].strInstructions.replace(/\r\n/g, "<br><br>")
            console.log(firstInstructions)
            mainInstructions.innerHTML = "Instructions: <br><br>" + firstInstructions
            // let apiInstruction = data.meals[0].strInstructions
            console.log(data.meals[0].strInstructions.replace(/\r\n/g, "<br>"))
            dataArray = Object.entries(data.meals[0])

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else {
                  console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                  } 
            }
            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else{
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                    mainIngredients.append(newIngredient)
                    } 
               }
               mainVid.href = data.meals[0].strYoutube;
    } else {
        mainInstructions.innerHTML = "Please Try A Different Ingredient"
        mainIngredients.innerHTML = "";   
    }

  })   
}


function getMealInfo1 (mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
    .then (function (response){
        return response.json()

    })
    .then(function(data){
        if (data.meals !== null){
            secondIngredients.innerHTML = "Ingredients: <br><br>"
            let firstInstructions = data.meals[0].strInstructions.replace(/\r\n/g, "<br><br>")
            secondInstructions.innerHTML = "Instructions: <br><br>" + firstInstructions
            dataArray = Object.entries(data.meals[0])

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else {
                  console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                  } 
            }

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else{
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                    secondIngredients.append(newIngredient)
                    } 
               }
               secondVid.href = data.meals[0].strYoutube;
    } else {
        secondInstructions.innerHTML = "Please Try A Different Ingredient"
        secondIngredients.innerHTML = "";   
    }
  })   
}

function getMealInfo2 (mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
    .then (function (response){
        return response.json()

    })
    .then(function(data){
        console.log(data)
        if (data.meals !== null){
            thirdIngredients.innerHTML = "Ingredients: <br><br>"
            let firstInstructions = data.meals[0].strInstructions.replace(/\r\n/g, "<br><br>")
            thirdInstructions.innerHTML = "Instructions: <br><br>" + firstInstructions
            dataArray = Object.entries(data.meals[0])
            
            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else {
                  console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                  } 
            }
            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else{
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                    thirdIngredients.append(newIngredient)
                    } 
               }
               thirdVid.href = data.meals[0].strYoutube;
    } else {
        thirdInstructions.innerHTML = "Please Try A Different Ingredient"
        thirdIngredients.innerHTML = "";   
    }
  })   
}

function getMealInfo3 (mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
    .then (function (response){
        return response.json()

    })
    .then(function(data){
        console.log(data)
        if (data.meals !== null){
            fourthIngredients.innerHTML = "Ingredients: <br><br>"
            let firstInstructions = data.meals[0].strInstructions.replace(/\r\n/g, "<br><br>")
            fourthInstructions.innerHTML = "Instructions: <br><br>" + firstInstructions
            dataArray = Object.entries(data.meals[0])
 
            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else {
                  console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                  } 
            }

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else{
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                    fourthIngredients.append(newIngredient)
                    } 
               }

               fourthVid.href = data.meals[0].strYoutube;
    } else {
        fourthInstructions.innerHTML = "Please Try A Different Ingredient"
        fourthIngredients.innerHTML = "";   
    }
  })   
}

function getMealInfo4 (mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
         
    .then (function (response){
        return response.json()

    })
    .then(function(data){
        console.log(data)
        if (data.meals !== null){
            fifthIngredients.innerHTML = "Ingredients: <br><br>"
            let firstInstructions = data.meals[0].strInstructions.replace(/\r\n/g, "<br><br>")
            fifthInstructions.innerHTML = "Instructions: <br><br>" + firstInstructions

            dataArray = Object.entries(data.meals[0])

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else {
                  console.log(each[1], dataArray[dataArray.indexOf(each)+20][1])
                  } 
            }

            for (each of dataArray.slice(9,29)) {
                if(each[1] === "" || each[1] === null) {
                } else{
                    console.log(each)
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] +' :   ' + dataArray[dataArray.indexOf(each)+20][1]
                    fifthIngredients.append(newIngredient)
                    } 
               }
               fifthVid.href = data.meals[0].strYoutube;
    } else {
        fifthInstructions.innerHTML = "Please Try A Different Ingredient"
        fifthIngredients.innerHTML = "";   
    }
  })   
}

resetBtn.addEventListener('click', function(){
    // window.localStorage.clear();
    window.location.reload();
})