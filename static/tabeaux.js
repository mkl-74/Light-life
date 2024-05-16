import React, { useState } from 'react';
const InteractiveTable = () => {
  const initialData = Array.from({
    length: 10
  }, () => Array(8).fill('')); // Créer un tableau 2D de 10 lignes et 8 colonnes avec des valeurs initiales vides
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: addColumn
  }, "Ajouter une colonne"), /*#__PURE__*/React.createElement("button", {
    onClick: addRow
  }, "Ajouter une ligne"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), [...Array(8).keys()].map(i => /*#__PURE__*/React.createElement("th", {
    key: i
  }, "Jour ", i + 1)))), /*#__PURE__*/React.createElement("tbody", null, data.map((row, rowIndex) => /*#__PURE__*/React.createElement("tr", {
    key: rowIndex
  }, /*#__PURE__*/React.createElement("td", null, "T\xE2che ", rowIndex + 1), row.map((cell, colIndex) => /*#__PURE__*/React.createElement("td", {
    key: colIndex
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: cell,
    onChange: e => handleChange(rowIndex, colIndex, e.target.value)
  }))))))));
};
export default InteractiveTable;
