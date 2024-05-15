// Funktion zum Laden der Mahlzeiten aus der JSON-Datei
function loadMeals() {
    return fetch('meals.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading meals:', error);
        });
}

// Funktion zum Auswählen einer zufälligen Mahlzeit und Anzeigen der Details
function displayRandomMeal(meals) {
    const randomIndex = Math.floor(Math.random() * meals.length);
    const meal = meals[randomIndex];

    document.getElementById('mealTitle').textContent = meal.title;
    document.getElementById('mealDetails').innerHTML = `
        <div>${meal.details.duration}</div>
        <div>${meal.details.difficulty}</div>
        <div>${meal.details.servings}</div>
    `;
    document.getElementById('mealIngredients').innerHTML = `<ul>${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>`;
    document.getElementById('mealImage').innerHTML = `<img src="${meal.image}" alt="${meal.title}">`;
    document.getElementById('mealInstructions').innerHTML = `<p>${meal.instructions}</p>`;

    document.getElementById('ingredientsTitle').classList.remove('hidden');
    document.getElementById('detailsTitle').classList.remove('hidden');
    document.getElementById('instructionsTitle').classList.remove('hidden');

    fadeInMealCard();
}

// Funktion zum Einblenden der Mahlkarte
function fadeInMealCard() {
    document.getElementById('mealCard').classList.add('fade-in');
}

// Ereignisbehandlung für den Klick auf den "Mahlzeit auswählen"-Button
function getRandomMeal() {
    loadMeals()
        .then(meals => {
            displayRandomMeal(meals);
        });
}

// Initialisierung der Seite
document.addEventListener('DOMContentLoaded', () => {
    const randomButton = document.querySelector('.random-button');
    randomButton.addEventListener('click', getRandomMeal);
});