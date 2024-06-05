// script_repas.js
document.addEventListener('DOMContentLoaded', () => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
    const tbody = document.querySelector('tbody');
    const saveMealsBtn = document.getElementById('saveMealsBtn');
    const dishList = document.getElementById('dishList');
    let currentIndex = 0;

    // Initialisation du planning
    const initPlanning = () => {
        days.forEach(day => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${day}</td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
                <td contenteditable="true"></td>
            `;
            tbody.appendChild(row);
        });
    };

    // Sauvegarde des repas dans le localStorage
    const saveMeals = () => {
        const meals = [];
        tbody.querySelectorAll('tr').forEach(row => {
            const dayMeals = {
                day: row.children[0].textContent,
                breakfast: row.children[1].textContent,
                lunch: row.children[2].textContent,
                dinner: row.children[3].textContent
            };
            meals.push(dayMeals);
        });
        localStorage.setItem('weeklyMeals', JSON.stringify(meals));
        updateDishListFromMeals(meals);
    };

    // Chargement des repas depuis le localStorage
    const loadMeals = () => {
        const savedMeals = JSON.parse(localStorage.getItem('weeklyMeals'));
        if (savedMeals) {
            savedMeals.forEach((meal, index) => {
                const row = tbody.children[index];
                row.children[1].textContent = meal.breakfast;
                row.children[2].textContent = meal.lunch;
                row.children[3].textContent = meal.dinner;
            });
        }
    };

    // Mise à jour de la liste des plats à partir des repas
    const updateDishListFromMeals = (meals) => {
        meals.forEach(meal => {
            if (meal.breakfast && !dishes.some(d => d.name === meal.breakfast)) {
                dishes.push({ name: meal.breakfast, image: '' });
            }
            if (meal.lunch && !dishes.some(d => d.name === meal.lunch)) {
                dishes.push({ name: meal.lunch, image: '' });
            }
            if (meal.dinner && !dishes.some(d => d.name === meal.dinner)) {
                dishes.push({ name: meal.dinner, image: '' });
            }
        });
        localStorage.setItem('dishes', JSON.stringify(dishes));
        displayDishes();
    };

    // Affichage des plats prédéfinis
    const displayDishes = () => {
        dishList.innerHTML = '';
        dishes.forEach((dish, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${dish.name}
                <input type="file" class="uploadImage" data-index="${index}" accept="image/*">
                <button class="addDishBtn" data-dish="${dish.name}">Ajouter</button>
                <button class="deleteDishBtn" data-index="${index}">Supprimer</button>
                <img src="${dish.image}" alt="${dish.name}" class="dishImage" style="display: ${dish.image ? 'block' : 'none'};">
            `;
            dishList.appendChild(listItem);
        });
    };

    // Ajouter un plat au planning
    const addDishToPlanning = (dish) => {
        const selectedDay = prompt('Pour quel jour souhaitez-vous ajouter ce plat ? (Lundi, Mardi, etc.)');
        const dayIndex = days.indexOf(selectedDay);
        if (dayIndex !== -1) {
            const mealType = prompt('Pour quel repas souhaitez-vous ajouter ce plat ? (Petit Déjeuner, Déjeuner, Dîner)');
            const row = tbody.children[dayIndex];
            if (mealType.toLowerCase() === 'petit déjeuner') {
                row.children[1].textContent = dish;
            } else if (mealType.toLowerCase() === 'déjeuner') {
                row.children[2].textContent = dish;
            } else if (mealType.toLowerCase() === 'dîner') {
                row.children[3].textContent = dish;
            } else {
                alert('Type de repas invalide.');
            }
        } else {
            alert('Jour invalide.');
        }
    };

    // Supprimer un plat de la liste
    const deleteDish = (index) => {
        dishes.splice(index, 1);
        localStorage.setItem('dishes', JSON.stringify(dishes));
        displayDishes();
    };

    // Gestion des boutons Ajouter et Supprimer
    dishList.addEventListener('click', (e) => {
        if (e.target.classList.contains('addDishBtn')) {
            const dish = e.target.getAttribute('data-dish');
            addDishToPlanning(dish);
        } else if (e.target.classList.contains('deleteDishBtn')) {
            const index = e.target.getAttribute('data-index');
            deleteDish(index);
        }
    });

    // Gestion de l'upload d'image
    dishList.addEventListener('change', (e) => {
        if (e.target.classList.contains('uploadImage')) {
            const index = e.target.getAttribute('data-index');
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                dishes[index].image = event.target.result;
                localStorage.setItem('dishes', JSON.stringify(dishes));
                displayDishes();
            };
            reader.readAsDataURL(file);
        }
    });

    // Sauvegarde des repas lors de la modification
    saveMealsBtn.addEventListener('click', saveMeals);

    // Initialisation
    initPlanning();
    loadMeals();
    displayDishes();
});
