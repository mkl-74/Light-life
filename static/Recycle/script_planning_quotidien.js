document.addEventListener('DOMContentLoaded', function() {
    const accordion = document.querySelector('.accordion');
    const panel = document.querySelector('.panel1');
    const addRandomTaskButton = document.getElementById('addRandomTask');
    const taskTableBody = document.querySelector('#taskTable tbody');


    const familyMembers = [
        { name: 'Merlin', age: 4 },
        { name: 'Timaël', age: 10 },
        { name: 'Charlie', age: 13 },
        { name: 'Papa', age: 43 }
    ];

    const tasks = [
        { task: 'Faire la vaisselle', minAge: 10 },
        { task: 'Sortir les poubelles', minAge: 8 },
        { task: 'Faire les courses', minAge: 18 },
        { task: 'Nettoyer la maison', minAge: 12 }
    ];

    
    accordion.addEventListener('click', function() {
        this.classList.toggle('active');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });

    addRandomTaskButton.addEventListener('click', function() {
        addRandomTask();
    });

    function addRandomTask() {
        const familyMembers = ['Timaël', 'Merlin', 'Charlie', 'Papa'];
        const tasks = ['Faire la vaisselle', 'Sortir les poubelles', 'Faire les courses', 'Passer l\'aspirateur à l\'étage', 'Passer l\'aspirateur au RDC', 'Mettre la table'];
        const randomMember = familyMembers[Math.floor(Math.random() * familyMembers.length)];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        const randomDate = new Date().toLocaleDateString();

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${randomMember}</td>
            <td>${randomTask}</td>
            <td>${randomDate}</td>
            <td><button class="deleteTask">Supprimer</button></td>
        `;
        taskTableBody.appendChild(row);

        row.querySelector('.deleteTask').addEventListener('click', function() {
            row.remove();
        });
    }
});