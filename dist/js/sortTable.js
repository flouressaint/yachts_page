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

function dCompare(a, b, sortOrder){
    if (sortOrder) {
        if (a > b) {
            return -1;
        } else if (a == b) {
            return 0;
        } else {
            return 1;
        }
    } else {
        if (a > b) {
            return 1;
        } else if (a == b) {
            return 0;
        } else {
            return -1;
        }
    }
}

function isLess(settings, first, second) {
    for (let k = 0; k < settings.length; k += 2) {
        let f = dCompare(first[settings[k]], second[settings[k]], settings[k + 1]);
        if (f === 1) {
            return true;
        } else if (f === 0) {
            // переходим к сравнению следоеващееполя
        } else {
            return false;
        }
    }
}

function change(k, p, tableData) {
    let w = tableData[k];
    tableData[k] = tableData[p];
    tableData[p] = w;
}

function QuickSort(settings, data) {
    //let tableData = getDataTable();
    //console.log(data.length);
    if (data.length <= 1) {
        return data;
    }
 
    const pivot = data[data.length - 1];
    const leftList = [];
    const rightList = [];
 
    for (let i = 0; i < data.length - 1; i++) {
        if (!isLess(settings, data[i], pivot)) {
            leftList.push(data[i]);
        } else {
            rightList.push(data[i])
        }
    }
 
    return [...QuickSort(settings, leftList), pivot, ...QuickSort(settings, rightList)];
 }

function printTable(data) {
        let tbl = document.getElementById("table");
        let section = document.getElementById("section");
        if(tbl) tbl.parentNode.removeChild(tbl);
        tbl = document.createElement("table");

        let tblHead = document.createElement("thead");
        let arr = ["Название", "Локация", "Длина", "Ширина", "Максимальная скорость", "Год постройки"]
        for (let i = 0; i < 6; i++) {
            let row = document.createElement("th");
            let cellText = document.createTextNode(`${arr[i]}`);
            row.appendChild(cellText);
            tblHead.appendChild(row);
        }
        tbl.appendChild(tblHead);
        
        let tblBody = document.createElement("tbody");
        for (let i = 0; i < data.length; i++) {
          let row = document.createElement("tr");
          for (let j = 0; j < data[i].length; j++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(`${data[i][j]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
      
          tblBody.appendChild(row);
        }
      
        tbl.appendChild(tblBody);
        section.appendChild(tbl);
        tbl.setAttribute("id", "table");
        tbl.setAttribute("border", "1");
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
    let data = getDataTable();
    data = QuickSort(settings, data);
    //console.log(data);
    printTable(data); // settings example: 0,false, -1,false, -1,false
}