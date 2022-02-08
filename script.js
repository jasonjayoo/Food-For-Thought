// Removes all search history from the local storage upon page refresh
localStorage.removeItem("searchHistory");

// variables for search bar and search button
var searchBar = document.querySelector("#search-bar");
var searchBtn = document.querySelector("#search-button");

// variables for all five recipes sections
var mainRecipe = document.querySelector("#main-recipe");
var secondRecipe = document.querySelector("#second-recipe");
var thirdRecipe = document.querySelector("#third-recipe");
var fourthRecipe = document.querySelector("#fourth-recipe");
var fifthRecipe = document.querySelector("#fifth-recipe");

// variables for all five recipe images
var mainImg = document.querySelector("#main-img");
var secondImg = document.querySelector("#second-img");
var thirdImg = document.querySelector("#third-img");
var fourthImg = document.querySelector("#fourth-img");
var fifthImg = document.querySelector("#fifth-img");

// variables for all five recipe videos
var mainVid = document.querySelector("#main-video");
var secondVid = document.querySelector("#second-video");
var thirdVid = document.querySelector("#third-video");
var fourthVid = document.querySelector("#fourth-video");
var fifthVid = document.querySelector("#fifth-video");

// variables for all five recipe instructions
var mainInstructions = document.querySelector("#main-instr");
var secondInstructions = document.querySelector("#second-instr");
var thirdInstructions = document.querySelector("#third-instr");
var fourthInstructions = document.querySelector("#fourth-instr");
var fifthInstructions = document.querySelector("#fifth-instr");

// variables for all five recipe ingredients
var mainIngredients = document.querySelector("#main-ingre");
var secondIngredients = document.querySelector("#second-ingre");
var thirdIngredients = document.querySelector("#third-ingre");
var fourthIngredients = document.querySelector("#fourth-ingre");
var fifthIngredients = document.querySelector("#fifth-ingre");

// var for main ingredient and instructions container - for readjustment for no data returns - hidden class
var mainInfo = document.querySelector("#mainInfo");

// var for main ingredient and instructions container - for readjustment for no data returns
var mainContainer = document.querySelector("#main-container");

// var for main ingredients and instructions containers - html recipe-box - to hide and show depending on available data
var IngreInstrContainer = document.querySelector("#recipe-box");

// var for additional ingredients and instructions containers - html recipe-box - to hide and show depending on available data
var additionalRecipes = document.querySelector("#more-recipes");

// var for search history to be used with local storage of user ingredient inputs
var recipeList = document.querySelector("#search-history");

// car for clear button so user to can chose to delete their search history
var resetBtn = document.querySelector("#reset-button");

// global variables purposely left empty in order to reuse with different values where needed
var recipeSearched = "";
var mealId = "";
var mealName = "";
var mealName1 = "";
var mealName2 = "";
var mealName3 = "";
var mealName4 = "";

// var for retrieving stored search history in the local storage
var savedRecipes = JSON.parse(localStorage.getItem("searchHistory")) || [];

// event listener for when user inputs an ingredient and clicks the search button - initiates all created functions
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // takes the users input but removes all blank spaces
  var mealSearch = searchBar.value.trim();

  recipeSearched = mealSearch;
  // if user clicks search with nothing in the search bar it will send them back to the search bar
  if (recipeSearched === "") {
    getIngredientInfo();
  } else {
    // if user inputs an ingredient spelled correctly or not it will push the searched ingredient into the local storage and call the functions to pull data from the api and render it to the page
    savedRecipes.push(mealSearch);

    localStorage.setItem("searchHistory", JSON.stringify(savedRecipes));

    getIngredientInfo();
    createSearchHistory();
  }
  // upon clicking the search button the page will auto float down to the recipes section of the page - for user friendliness
  location.href = "#recipes";
});

// function to pull searched ingredients from the local storage and render it into buttons that will be displayed under a search history title.
function createSearchHistory() {
  recipeList.innerHTML = "";
  // retrieving searched ingredients from the local storage
  var listOfSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  // only if there is anything in the local storage will this continue to run. If nothing is there, it will stop here.
  if (listOfSearchHistory !== null) {
    listOfRecipes = listOfSearchHistory;
  }
  // loops through the list of searched ingredients and creates buttons for each value
  for (var i = 0; i < listOfRecipes.length; i++) {
    // dynamically creating buttons for searched ingredients
    var recipeButtons = document.createElement("button");
    // the text in the button will be whatever user typed into the search bar
    recipeButtons.textContent = listOfRecipes[i];
    // dynamically appends the buttons to the search history section
    recipeList.appendChild(recipeButtons);
    // loops through all the buttons and attaches event listeners to each button, so that if the user clicks on a previous recipe, it will re-display.
    for (let i = 0; i <= recipeList.childElementCount; i++) {
      if (recipeList.children.item(i) != null) {
        recipeList.children.item(i).addEventListener("click", function () {
          recipeSearched = recipeList.children.item(i).textContent;
          getIngredientInfo();
          // takes the user to the recipes section after clicking on a previously searched button
          location.href = "#recipes";
        });
      }
    }
  }
}

// first fetch function
function getIngredientInfo() {
  // made this for possible consollogging early on...
  if (recipeSearched === "") {
    recipeSearched = "pasta";
  }
  // initial fetch for obtaining data from the first api for ingredients
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeSearched}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      searchBar.value = "";
      // arguments for all 5 recipes if they return actual data
      if (data.meals !== null) {
        // sets the retrieved data for the first meal recipe into the DOM
        mainRecipe.innerHTML = data.meals[0].strMeal;
        mainImg.src = data.meals[0].strMealThumb;
        // removes hidden class attached as default for none existing recipes
        mainContainer.classList.remove("error-container");
        // mainInfo.removeAttribute ("class", "hidden");
        mainInfo.classList.remove("hidden");
        // var for main ingredient and instructions container

        IngreInstrContainer.removeAttribute("class", "hidden");
        additionalRecipes.removeAttribute("class", "hidden");

        // from here to line 171 the if statements do the same things just for the additional ingredients
        if (data.meals[1]) {
          secondRecipe.innerHTML = data.meals[1].strMeal;
          secondImg.src = data.meals[1].strMealThumb;
          secondVid.innerHTML = "Click For YouTube Video";
        }

        if (data.meals[2]) {
          thirdRecipe.innerHTML = data.meals[2].strMeal;
          thirdImg.src = data.meals[2].strMealThumb;
          thirdVid.innerHTML = "Click For YouTube Video";
        }

        if (data.meals[3]) {
          fourthRecipe.innerHTML = data.meals[3].strMeal;
          fourthImg.src = data.meals[3].strMealThumb;
          fourthVid.innerHTML = "Click For YouTube Video";
        }

        if (data.meals[4]) {
          fifthRecipe.innerHTML = data.meals[4].strMeal;
          fifthImg.src = data.meals[4].strMealThumb;
          fifthVid.innerHTML = "Click For YouTube Video";
        }
        // this if statement is set if only one recipe is received from the api, simply empties out all other recipes.
        if (data.meals[1] === undefined) {
          secondRecipe.innerHTML = "";
          thirdRecipe.innerHTML = "";
          secondImg.setAttribute("src", "");
          thirdImg.setAttribute("src", "");
          secondVid.innerHTML = "";
          thirdVid.innerHTML = "";
          secondInstructions.innerHTML = "";
          thirdInstructions.innerHTML = "";
          secondIngredients.innerHTML = "";
          thirdIngredients.innerHTML = "";
          fourthRecipe.innerHTML = "";
          fifthRecipe.innerHTML = "";
          fourthImg.setAttribute("src", "");
          fifthImg.setAttribute("src", "");
          fourthVid.innerHTML = "";
          fifthVid.innerHTML = "";
          fourthInstructions.innerHTML = "";
          fifthInstructions.innerHTML = "";
          fourthIngredients.innerHTML = "";
          fifthIngredients.innerHTML = "";
        }
        // this if statement is set if only two recipes is received from the api, simply empties out all other recipes.
        else if (data.meals[2] === undefined) {
          thirdRecipe.innerHTML = "";
          thirdImg.setAttribute("src", "");
          thirdVid.innerHTML = "";
          thirdInstructions.innerHTML = "";
          thirdIngredients.innerHTML = "";
          fourthRecipe.innerHTML = "";
          fifthRecipe.innerHTML = "";
          fourthImg.setAttribute("src", "");
          fifthImg.setAttribute("src", "");
          fourthVid.innerHTML = "";
          fifthVid.innerHTML = "";
          fourthInstructions.innerHTML = "";
          fifthInstructions.innerHTML = "";
          fourthIngredients.innerHTML = "";
          fifthIngredients.innerHTML = "";
        }
        // this if statement is set if only three recipes is received from the api, simply empties out all other recipes.
        else if (data.meals[3] === undefined) {
          fourthRecipe.innerHTML = "";
          fifthRecipe.innerHTML = "";
          fourthImg.setAttribute("src", "");
          fifthImg.setAttribute("src", "");
          fourthVid.innerHTML = "";
          fifthVid.innerHTML = "";
          fourthInstructions.innerHTML = "";
          fifthInstructions.innerHTML = "";
          fourthIngredients.innerHTML = "";
          fifthIngredients.innerHTML = "";
          // this if statement is set if only four recipes is received from the api, simply empties out all other recipes.
        } else if (data.meals[4] === undefined) {
          fifthRecipe.innerHTML = "";
          fifthImg.setAttribute("src", "");
          fifthVid.innerHTML = "";
          fifthInstructions.innerHTML = "";
          fifthIngredients.innerHTML = "";
        }
        // if no recipes are retrieved from the api it will empty everything out
      } else {
        mainRecipe.innerHTML =
          "No Recipes Found Please Try A Different Ingredient";
        mainImg.src =
          "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
        mainVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";

        mainInfo.classList.add("hidden");
        mainContainer.classList.add("error-container");

        IngreInstrContainer.setAttribute("class", "hidden");
        additionalRecipes.setAttribute("class", "hidden");
        mainIngredients.innerHTML = "";
        mainInstructions.innerHTML = "";
      }
      // if data exist for the first recipe then the it will run the function for that recipe
      if (data.meals !== null) {
        mealName = data.meals[0].strMeal;
        getMealInfo(mealName);
        // if data exist for the second recipe then the it will run the function for that recipe
        if (data.meals[1] !== undefined) {
          mealName1 = data.meals[1].strMeal;
          additionalRecipes.removeAttribute("class", "hidden");
          getMealInfo1(mealName1);
        } else {
          additionalRecipes.setAttribute("class", "hidden");
        }
        // if data exist for the third recipe then the it will run the function for that recipe
        if (data.meals[2] !== undefined) {
          mealName2 = data.meals[2].strMeal;
          getMealInfo2(mealName2);
        } else {
          mealName2 = "No Recipes Found Please Try A Different Ingredient";
        }
        // if data exist for the fourth recipe then the it will run the function for that recipe
        if (data.meals[3] !== undefined) {
          mealName3 = data.meals[3].strMeal;
          getMealInfo3(mealName3);
        } else {
          mealName3 = "No Recipes Found Please Try A Different Ingredient";
        }
        // if data exist for the fifth recipe then the it will run the function for that recipe
        if (data.meals[4] !== undefined) {
          mealName4 = data.meals[4].strMeal;
          getMealInfo4(mealName4);
        } else {
          mealName4 = "No Recipes Found Please Try A Different Ingredient";
        }
        // if no data exists these messages will render
      } else {
        mealName = "No Recipes Found Please Try A Different Ingredient";
        mealName1 = "No Recipes Found Please Try A Different Ingredient";
        mealName2 = "No Recipes Found Please Try A Different Ingredient";
      }
    });
}

// function to fetch data from second API passing it a parameter - var mealName
function getMealInfo(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // if data for first recipe exists the ingredients, instructions and videos will be set to its designated places in the DOM
      if (data.meals !== null) {
        mainIngredients.innerHTML = "Ingredients: <br><br>";
        let firstInstructions = data.meals[0].strInstructions.replace(
          /\r\n/g,
          "<br>"
        );
        console.log(firstInstructions);
        mainInstructions.innerHTML =
          "Instructions: <br><br>" + firstInstructions;
        console.log(data.meals[0].strInstructions.replace(/\r\n/g, "<br>"));
        // dataArray set to the object entries (retrieves the key value pairs of the specified array) of the first data array
        dataArray = Object.entries(data.meals[0]);
        // this is to obtain the ingredients names and amounts
        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each[1], dataArray[dataArray.indexOf(each) + 20][1]);
          }
        }
        // appends the ingredients names and amounts to the DOM
        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            const newIngredient = document.createElement("div");
            newIngredient.textContent =
              each[1] + " :   " + dataArray[dataArray.indexOf(each) + 20][1];
            mainIngredients.append(newIngredient);
          }
        }
        // to append video to the DOM, if none exists it will render no video available, if it does exist then the next message and link will render.
        if (data.meals[0].strYoutube === "") {
          mainVid.innerHTML = "No Video Available";
          mainVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";
        } else {
          mainVid.innerHTML = "Click For YouTube Video";
          mainVid.href = data.meals[0].strYoutube;
        }
        // if no data exists this message will render
      } else {
        mainInstructions.innerHTML = "Please Try A Different Ingredient";
        mainIngredients.innerHTML = "";
      }
    });
}

// The function below works the same way as the function between lines 289-338, except its for the SECOND recipe. Please Reference lines 289-338 for explanation of how the function works.
function getMealInfo1(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.meals !== null) {
        secondIngredients.innerHTML = "Ingredients: <br><br>";
        let firstInstructions = data.meals[0].strInstructions.replace(
          /\r\n/g,
          "<br>"
        );
        secondInstructions.innerHTML =
          "Instructions: <br><br>" + firstInstructions;
        dataArray = Object.entries(data.meals[0]);

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each[1], dataArray[dataArray.indexOf(each) + 20][1]);
          }
        }

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            const newIngredient = document.createElement("div");
            newIngredient.textContent =
              each[1] + " :   " + dataArray[dataArray.indexOf(each) + 20][1];
            secondIngredients.append(newIngredient);
          }
        }
        if (data.meals[0].strYoutube === "") {
          secondVid.innerHTML = "No Video Available";
          secondVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";
        } else {
          secondVid.innerHTML = "Click For YouTube Video";
          secondVid.href = data.meals[0].strYoutube;
        }
      } else {
        secondInstructions.innerHTML = "Please Try A Different Ingredient";
        secondIngredients.innerHTML = "";
      }
    });
}

// The function below works the same way as the function between lines 289-338, except its for the THIRD recipe. Please Reference lines 289-338 for explanation of how the function works.
function getMealInfo2(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.meals !== null) {
        thirdIngredients.innerHTML = "Ingredients: <br><br>";
        let firstInstructions = data.meals[0].strInstructions.replace(
          /\r\n/g,
          "<br>"
        );
        thirdInstructions.innerHTML =
          "Instructions: <br><br>" + firstInstructions;
        dataArray = Object.entries(data.meals[0]);

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each[1], dataArray[dataArray.indexOf(each) + 20][1]);
          }
        }
        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            const newIngredient = document.createElement("div");
            newIngredient.textContent =
              each[1] + " :   " + dataArray[dataArray.indexOf(each) + 20][1];
            thirdIngredients.append(newIngredient);
          }
        }
        if (data.meals[0].strYoutube === "") {
          thirdid.innerHTML = "No Video Available";
          thirdVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";
        } else {
          thirdVid.innerHTML = "Click For YouTube Video";
          thirdVid.href = data.meals[0].strYoutube;
        }
      } else {
        thirdInstructions.innerHTML = "Please Try A Different Ingredient";
        thirdIngredients.innerHTML = "";
      }
    });
}

// The function below works the same way as the function between lines 289-338, except its for the FOURTH recipe. Please Reference lines 289-338 for explanation of how the function works.

function getMealInfo3(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.meals !== null) {
        fourthIngredients.innerHTML = "Ingredients: <br><br>";
        let firstInstructions = data.meals[0].strInstructions.replace(
          /\r\n/g,
          "<br>"
        );
        fourthInstructions.innerHTML =
          "Instructions: <br><br>" + firstInstructions;
        dataArray = Object.entries(data.meals[0]);

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each[1], dataArray[dataArray.indexOf(each) + 20][1]);
          }
        }

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            const newIngredient = document.createElement("div");
            newIngredient.textContent =
              each[1] + " :   " + dataArray[dataArray.indexOf(each) + 20][1];
            fourthIngredients.append(newIngredient);
          }
        }
        if (data.meals[0].strYoutube === "") {
          fourthVid.innerHTML = "No Video Available";
          fourthVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";
        } else {
          fourthVid.innerHTML = "Click For YouTube Video";
          fourthVid.href = data.meals[0].strYoutube;
        }
      } else {
        fourthInstructions.innerHTML = "Please Try A Different Ingredient";
        fourthIngredients.innerHTML = "";
      }
    });
}

// The function below works the same way as the function between lines 289-338, except its for the FIFTH recipe. Please Reference lines 289-338 for explanation of how the function works.

function getMealInfo4(mealName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.meals !== null) {
        fifthIngredients.innerHTML = "Ingredients: <br><br>";
        let firstInstructions = data.meals[0].strInstructions.replace(
          /\r\n/g,
          "<br>"
        );
        fifthInstructions.innerHTML =
          "Instructions: <br><br>" + firstInstructions;

        dataArray = Object.entries(data.meals[0]);

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each[1], dataArray[dataArray.indexOf(each) + 20][1]);
          }
        }

        for (each of dataArray.slice(9, 29)) {
          if (each[1] === "" || each[1] === null) {
          } else {
            console.log(each);
            const newIngredient = document.createElement("div");
            newIngredient.textContent =
              each[1] + " :   " + dataArray[dataArray.indexOf(each) + 20][1];
            fifthIngredients.append(newIngredient);
          }
        }
        if (data.meals[0].strYoutube === "") {
          fifthVid.innerHTML = "No Video Available";
          fifthVid.href = "https://www.youtube.com/watch?v=INscMGmhmX4";
        } else {
          fifthVid.innerHTML = "Click For YouTube Video";
          fifthVid.href = data.meals[0].strYoutube;
        }
      } else {
        fifthInstructions.innerHTML = "Please Try A Different Ingredient";
        fifthIngredients.innerHTML = "";
      }
    });
}

// nav bar variables
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

// nav bar implementation
hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

// nav bar menu item event listeners
menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// Clears the search history list upon reset button being clicked by the user.
resetBtn.addEventListener("click", function () {
    window.location.reload();
  });