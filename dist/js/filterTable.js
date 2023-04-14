const nameIndex = 0;
const locationIndex = 1;
const lengthIndex = 2;
const widthIndex = 3;
const speedIndex = 4;
const yearIndex = 5;

function filterTable(name, location, length, width, speedFrom, speedFo, yearFrom, yearFo) {
    if (name === '' && location === '' && length === '' && width === '' && speedFrom === '' && speedFo === '' && yearFrom === '' && yearFo === '') {
        return;
    }
    if (length !== '') {
        if (isNaN(parseFloat(length)) || !isFinite(length) || Number(length) <= 0) {
            alert('Неверно введена длина');
            return;
        }
    }
    if (width !== '') {
        if (isNaN(parseFloat(width)) || !isFinite(width) || Number(width) <= 0) {
            alert('Неверно введена ширина');
            return;
        }
    }
    if (speedFrom !== '') {
        if (isNaN(parseFloat(speedFrom)) || !isFinite(speedFrom) || Number(speedFrom) < 0) {
            alert('Неверно введена скорость от');
            return;
        }
    }
    if (speedFo !== '') {
        if (isNaN(parseFloat(speedFo)) || !isFinite(speedFo) || Number(speedFo) <= 0) {
            alert('Неверно введена скорость до');
            return;
        }
    }
    if (yearFrom !== '') {
        if (isNaN(parseFloat(yearFrom)) || !isFinite(yearFrom) || Number(yearFrom) < 0) {
            alert('Неверно введен год от');
            return;
        }
    }
    if (yearFo !== '') {
        if (isNaN(parseFloat(yearFo)) || !isFinite(yearFo) || Number(yearFo) <= 0) {
            alert('Неверно введен год до');
            return;
        }
    }

    let data = [];
    let tableData = getDataTable();
    for (let i = 0; i < tableData.length; i++) {
        if ((tableData[i][nameIndex] === name || name === '') 
          && (tableData[i][locationIndex] === location || location === '') 
          && (tableData[i][lengthIndex] === length || length === '') 
          && (tableData[i][widthIndex] === width || width === '')
          && (+tableData[i][speedIndex] >= +speedFrom || speedFrom === '') && (+tableData[i][speedIndex] < +speedFo || speedFo === '')
          && (+tableData[i][yearIndex] >= +yearFrom || yearFrom === '') && (+tableData[i][yearIndex] < +yearFo || yearFo === '')) {
            data.push(tableData[i]);
        } 
    }
    if (data.length === 0) {
        alert('Записей не найдено');
    } else {
        printTable(data);
    }
}