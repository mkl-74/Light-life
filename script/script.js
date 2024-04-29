//tache familial//
const taskTable = document.getElementById('taskTable');
const taskCells = taskTable.querySelectorAll('td[contenteditable]');

taskCells.forEach(cell => {
  cell.addEventListener('blur', () => {
    cell.textContent = cell.textContent.trim();
  });
});

//Achat hebdomadaire//

document.addEventListener('DOMContentLoaded', function() {
  const addRowBtn = document.getElementById('addRowBtn');
  const shoppingTable = document.getElementById('shoppingTable').getElementsByTagName('tbody')[0];

  addRowBtn.addEventListener('click', function() {
    const newRow = shoppingTable.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = '<input type="text" />';
    cell2.innerHTML = '<input type="checkbox" />';
    cell3.innerHTML = '<input type="checkbox" />';
    cell4.innerHTML = '<input type="checkbox" />';
    cell5.innerHTML = '<button onclick="deleteRow(this)">Supprimer</button>';
  });
});

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}



//gestion des titre deroulant//


const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const accordionContent = button.nextElementSibling;
    button.classList.toggle('active');

    if (accordionContent.style.display === 'block') {
      accordionContent.style.display = 'none';
    } else {
      accordionContent.style.display = 'block';
    }
  });
});