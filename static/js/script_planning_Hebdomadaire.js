// script_planning_Hebdomadaire.js
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion');
    const panels = document.querySelectorAll('.panel');
    const addWeeklyTaskButton = document.getElementById('addWeeklyTask');
    const addDailyTaskButton = document.getElementById('addDailyTask');
    const weeklyTaskTableBody = document.querySelector('#weeklyTaskTable tbody');
    const dailyTaskTableBody = document.querySelector('#dailyTaskTable tbody');
    const resetWeeklyTasksButton = document.getElementById('resetWeeklyTasks');
    const resetDailyTasksButton = document.getElementById('resetDailyTasks');
    const saveWeeklyTasksButton = document.getElementById('saveWeeklyTasks');
    const saveDailyTasksButton = document.getElementById('saveDailyTasks');
    const weeklyTaskList = document.getElementById('weeklyTaskList');
    const dailyTaskList = document.getElementById('dailyTaskList');

    const familyMembers = [
        { name: 'Merlin', color: 'lightblue' },
        { name: 'Timaël', color: 'lightgreen' },
        { name: 'Charlie', color: 'lightcoral' },
        { name: 'Papa', color: 'lightgoldenrodyellow' }
    ];

    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    accordions.forEach((accordion, index) => {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            if (panels[index].style.display === 'block') {
                panels[index].style.display = 'none';
            } else {
                panels[index].style.display = 'block';
            }
        });
    });

    addWeeklyTaskButton.addEventListener('click', function() {
        addTaskToList(weeklyTaskList, 'weekly');
    });

    addDailyTaskButton.addEventListener('click', function() {
        addTaskToList(dailyTaskList, 'daily');
    });

    resetWeeklyTasksButton.addEventListener('click', function() {
        weeklyTaskTableBody.innerHTML = '';
        localStorage.removeItem('weeklyTasks');
    });

    resetDailyTasksButton.addEventListener('click', function() {
        dailyTaskTableBody.innerHTML = '';
        localStorage.removeItem('dailyTasks');
    });

    saveWeeklyTasksButton.addEventListener('click', function() {
        saveTable('weeklyTasks', weeklyTaskTableBody);
    });

    saveDailyTasksButton.addEventListener('click', function() {
        saveTable('dailyTasks', dailyTaskTableBody);
    });

    function addTaskToList(taskList, type) {
        const taskName = prompt('Entrez le nom de la tâche :');
        if (taskName) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${taskName} <span class="deleteTask">❌</span>`;
            listItem.querySelector('.deleteTask').addEventListener('click', function() {
                listItem.remove();
                saveTaskList(type);
            });
            listItem.addEventListener('click', function(e) {
                if (e.target.classList.contains('deleteTask')) return;
                addTaskToTable(taskName, type);
            });
            taskList.appendChild(listItem);
            saveTaskList(type);
        }
    }

    function addTaskToTable(taskName, type) {
        const tableBody = type === 'weekly' ? weeklyTaskTableBody : dailyTaskTableBody;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td contenteditable="true">${taskName}</td>
            ${daysOfWeek.map(day => `<td></td>`).join('')}
        `;
        tableBody.appendChild(row);

        row.querySelectorAll('td').forEach(cell => {
            cell.addEventListener('click', function() {
                const memberName = prompt('Entrez le nom du membre de la famille :');
                const member = familyMembers.find(m => m.name.toLowerCase() === memberName.toLowerCase());
                if (member) {
                    cell.style.backgroundColor = member.color;
                } else {
                    alert('Membre de la famille non trouvé.');
                }
            });
        });
    }

    function saveTable(key, tableBody) {
        const tasks = [];
        tableBody.querySelectorAll('tr').forEach(row => {
            const task = {
                name: row.children[0].textContent,
                days: Array.from(row.children).slice(1).map(cell => cell.style.backgroundColor)
            };
            tasks.push(task);
        });
        localStorage.setItem(key, JSON.stringify(tasks));
    }

    function loadTable(key, tableBody) {
        const savedTasks = JSON.parse(localStorage.getItem(key));
        if (savedTasks) {
            savedTasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="true">${task.name}</td>
                    ${task.days.map(color => `<td style="background-color: ${color};"></td>`).join('')}
                `; 
                tableBody.appendChild(row);
            });
        }
    }

    function saveTaskList(type) {
        const taskList = type === 'weekly' ? weeklyTaskList : dailyTaskList;
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push(item.textContent.replace('❌', '').trim());
        });
        localStorage.setItem(`${type}TaskList`, JSON.stringify(tasks));
    }

    function loadTaskList(type) {
        const taskList = type === 'weekly' ? weeklyTaskList : dailyTaskList;
        const savedTasks = JSON.parse(localStorage.getItem(`${type}TaskList`));
        if (savedTasks) {
            savedTasks.forEach(taskName => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${taskName} <span class="deleteTask">❌</span>`;
                listItem.querySelector('.deleteTask').addEventListener('click', function() {
                    listItem.remove();
                    saveTaskList(type);
                });
                listItem.addEventListener('click', function(e) {
                    if (e.target.classList.contains('deleteTask')) return;
                    addTaskToTable(taskName, type);
                });
                taskList.appendChild(listItem);
            });
        }
    }

    // Initialisation
    loadTable('weeklyTasks', weeklyTaskTableBody);
    loadTable('dailyTasks', dailyTaskTableBody);
    loadTaskList('weekly');
    loadTaskList('daily');
});
