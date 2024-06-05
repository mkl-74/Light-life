document.addEventListener('DOMContentLoaded', function() {
    const forms = [
        { form: 'baseForm', input: 'baseIngredient', list: 'baseList', endpoint: '/save-base-list', loadEndpoint: '/load-base-list' },
        { form: 'fraisForm', input: 'fraisIngredient', list: 'fraisList', endpoint: '/save-frais-list', loadEndpoint: '/load-frais-list' },
        { form: 'entretienForm', input: 'entretienIngredient', list: 'entretienList', endpoint: '/save-entretien-list', loadEndpoint: '/load-entretien-list' },
    ];

    forms.forEach(({ form, input, list, endpoint, loadEndpoint }) => {
        const shoppingForm = document.getElementById(form);
        const ingredientInput = document.getElementById(input);
        const shoppingList = document.getElementById(list);

        // Charger la liste de courses depuis la base de données
        loadShoppingList(loadEndpoint, shoppingList);

        shoppingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const ingredient = ingredientInput.value.trim();
            if (ingredient !== '') {
                addIngredientToList(ingredient, shoppingList);
                ingredientInput.value = ''; // Efface le champ de saisie
                saveShoppingList(endpoint, shoppingList); // Sauvegarder la liste de courses
            }
        });
    });

    function addIngredientToList(ingredient, shoppingList) {
        const li = document.createElement('li');

        const div = document.createElement('div'); // Conteneur pour le texte et le bouton
        div.classList.add('list-item-container');

        const span = document.createElement('span');
        span.textContent = ingredient;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;'; // Utiliser la croix Unicode
        deleteButton.classList.add('delete-button'); // Ajouter une classe pour styliser
        deleteButton.addEventListener('click', function() {
            shoppingList.removeChild(li);
            saveShoppingList(endpoint, shoppingList); // Sauvegarder la liste de courses après suppression
        });

        div.appendChild(span);
        div.appendChild(deleteButton);
        li.appendChild(div);
        shoppingList.appendChild(li);
    }

    function saveShoppingList(endpoint, shoppingList) {
        const ingredients = [];
        shoppingList.querySelectorAll('li').forEach(li => {
            ingredients.push(li.querySelector('span').textContent.trim());
        });

        // Sauvegarder la liste de courses dans la base de données
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        }).then(response => {
            if (!response.ok) {
                console.error('Erreur lors de la sauvegarde de la liste de courses');
            }
        });
    }

    function loadShoppingList(endpoint, shoppingList) {
        // Charger la liste de courses depuis la base de données
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                data.ingredients.forEach(ingredient => {
                    addIngredientToList(ingredient, shoppingList);
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement de la liste de courses', error);
            });
    }

    function imprimer_page() {
        // Sélectionner la section à imprimer
        const sectionToPrint = document.querySelector('section.triple_section');
    
        // Cloner la section à imprimer pour éviter de modifier la page actuelle
        const sectionClone = sectionToPrint.cloneNode(true);
    
        // Créer un élément div pour contenir le clone de la section
        const printableArea = document.createElement('div');
        printableArea.appendChild(sectionClone);
    
        // Ajouter la section clonée à la fin du body
        document.body.appendChild(printableArea);
    
        // Appeler la fonction d'impression
        window.print();
    
        // Supprimer la section clonée après l'impression
        printableArea.remove();
    }
    
});
