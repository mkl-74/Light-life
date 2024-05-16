import React, { useState } from 'react';

const InteractiveTable = () => {
  const initialData = Array.from({ length: 10 }, () => Array(8).fill('')); // Créer un tableau 2D de 10 lignes et 8 colonnes avec des valeurs initiales vides
  const [data, setData] = useState(initialData);

  // Ajouter une colonne
  const addColumn = () => {
    setData(prevData => prevData.map(row => [...row, '']));
  };

  // Ajouter une ligne
  const addRow = () => {
    setData(prevData => [...prevData, Array(8).fill('')]);
  };

  // Mettre à jour les données
  const handleChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  return (
    <div>
      <button onClick={addColumn}>Ajouter une colonne</button>
      <button onClick={addRow}>Ajouter une ligne</button>
      <table>
        <thead>
          <tr>
            <th></th>
            {[...Array(8).keys()].map(i => (
              <th key={i}>Jour {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Tâche {rowIndex + 1}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;
