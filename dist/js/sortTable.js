function getDataTable() {
    let result = [];
    let table = document.getElementById('table');
    let rw = table.getElementsByTagName('tr');
    for (let i = 1; i < rw.length; i++) {
        let arr = [];
        for (let j = 0; j < rw[i].cells.length; j++) {
            arr.push(rw[i].cells[j].innerHTML);
            if ((j + 1) % rw[i].cells.length  === 0) {
                result.push(arr);
            }
        }
    }
    return result;
}

function isCompareOrder(arrCompare, first, second) {
    for (let k = 0; k < arrCompare.length; k += 2) {
        let f = doCompare(first[arrCompare[k]], second[arrCompare[k]], arrCompare[k + 1]);
        if (f === 1) {
            return true;
        } else if (f === 0) {
            // переходим к сравнению следующего поля
        } else {
            return false;
        }
    }
}

function compareTable(a, b, i, sortOrder){
    if (sortOrder) {
        if (a[i] > b[i]) {
            return -1;
        } else if (a[i] == b[i]) {
            return 0;
        } else {
            return 1;
        }
    } else {
        if (a[i] > b[i]) {
            return 1;
        } else if (a[i] == b[i]) {
            return 0;
        } else {
            return -1;
        }
    }
}


function sortTable(settings) {
    let tableData = getDataTable();
    for (let i = 0; i < settings.length; i += 2) {
        tableData.sort((a, b) => compareTable(a, b, settings[i], settings[i + 1]));
    }
    return tableData;
}

// ?
function printTable(tableData) {
    let table = document.getElementById('table');
    let rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        if (tableData[i] === undefined) {
            rows[i].parentElement.removeChild(rows[i]);
            
        } else {
            for (let j = 0; j < cells.length; j++) {
                cells[j].innerHTML = tableData[i][j];
            }
        }
    }
}

function sortSettings() {
    let first = document.getElementById('first').value;
    let second = document.getElementById('second').value;
    let third = document.getElementById('third').value;
    let firstCheck = document.getElementById('descFirst').checked;
    let secondCheck = document.getElementById('descSecond').checked;
    let thirdCheck = document.getElementById('descThird').checked;

    // alert(first + ' ' + second + ' ' + third + ' ' + firstCheck + ' ' + secondCheck + ' ' + thirdCheck);

    if (+first === 0 && +second === 0 && +third === 0) {
        alert('Выберите уровни сортировки!');
        return;
    }
    if ((first === second && +first !== 0 && +second !== 0) 
            || (second === third && +second !== 0 && +third !== 0) 
            || (first === third && +first !== 0 && +third !== 0)) {
        alert('Уровни сортировки не должны совпадать!');
        return;
    }

    let settings = [];
    if (first !== 0) {
        settings.push(+first - 1);
        settings.push(firstCheck);
    }
    if (second !== 0) {
        settings.push(+second - 1);
        settings.push(secondCheck);
    }
    if (third !== 0) {
        settings.push(+third - 1);
        settings.push(thirdCheck);
    }
    printTable(sortTable(settings));
}