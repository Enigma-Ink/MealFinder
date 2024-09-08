// Function to show meals for a specific category
const showMealInfo = (meal) => {
    const { strMeal, strMealThumb, idMeal } = meal;
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");
  
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
  
    // Clear ingredients info (since we are showing just the meal list on category click)
    info.textContent = "Click the meal for more details";
    ingredientsOutput.innerHTML = "";
  
    // Add a click event to fetch and show details of a specific meal by its id
    img.addEventListener("click", async () => {
      const mealDetail = await fetchMealById(idMeal);
      showMealDetails(mealDetail);
    });
  };
  
  // Fetch meals by category
  const fetchMealsByCategory = async (category) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const { meals } = await res.json();
    return meals;
  };
  
  // Fetch detailed meal info by id
  const fetchMealById = async (id) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const { meals } = await res.json();
    return meals[0];
  };
  
  // Show meal details and ingredients
  const showMealDetails = (meal) => {
    const { strMeal, strMealThumb, strInstructions } = meal;
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");
  
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;
  
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
  
    const html = `
      <span>${ingredients
        .map((ing) => `<li class="ing">${ing}</li>`)
        .join("")}</span>
    `;
  
    ingredientsOutput.innerHTML = html;
  };
  
  // Add event listeners to navbar items
  const navItems = document.querySelectorAll("nav ul li");
  navItems.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const category = e.target.dataset.category;
      const meals = await fetchMealsByCategory(category);
  
      // Show the first meal from the selected category
      if (meals && meals.length > 0) {
        showMealInfo(meals[0]);
      } else {
        alert("No meals found for this category.");
      }
    });
  });
  
  // Search functionality
  const searchMeal = async (e) => {
    e.preventDefault();
  
    const input = document.querySelector(".input");
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");
  
    const showMealInfo = (meal) => {
      const { strMeal, strMealThumb, strInstructions } = meal;
      title.textContent = strMeal;
      img.style.backgroundImage = `url(${strMealThumb})`;
      info.textContent = strInstructions;
  
      const ingredients = [];
  
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
  
      const html = `
      <span>${ingredients
        .map((ing) => `<li class="ing">${ing}</li>`)
        .join("")}</span>
      `;
  
      ingredientsOutput.innerHTML = html;
    };
  
    const showAlert = () => {
      alert("Meal not found :(");
    };
  
    // Fetch Data
    const fetchMealData = async (val) => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
      );
  
      const { meals } = await res.json();
      return meals;
    };
  
    // Get the user value
    const val = input.value.trim();
  
    if (val) {
      const meals = await fetchMealData(val);
  
      if (!meals) {
        showAlert();
        return;
      }
  
      meals.forEach(showMealInfo);
    } else {
      alert("Please try searching for meal :)");
    }
  };
  
  // Attach search functionality to form
  const form = document.querySelector("form");
  form.addEventListener("submit", searchMeal);
  const magnifier = document.querySelector(".magnifier");
  magnifier.addEventListener("click", searchMeal);  