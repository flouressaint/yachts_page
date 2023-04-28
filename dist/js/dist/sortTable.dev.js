"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getDataTable() {
  var result = [];
  var table = document.getElementById('table');
  var rw = table.getElementsByTagName('tr');

  for (var i = 1; i < rw.length; i++) {
    var arr = [];

    for (var j = 0; j < rw[i].cells.length; j++) {
      arr.push(rw[i].cells[j].innerHTML);

      if ((j + 1) % rw[i].cells.length === 0) {
        result.push(arr);
      }
    }
  }

  return result;
}

function dCompare(a, b, sortOrder) {
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
  for (var k = 0; k < settings.length; k += 2) {
    var f = dCompare(first[settings[k]], second[settings[k]], settings[k + 1]);

    if (f === 1) {
      return true;
    } else if (f === 0) {// переходим к сравнению следоеващееполя
    } else {
      return false;
    }
  }
}

function change(k, p, tableData) {
  var w = tableData[k];
  tableData[k] = tableData[p];
  tableData[p] = w;
}

function QuickSort(settings, data) {
  //let tableData = getDataTable();
  //console.log(data.length);
  if (data.length <= 1) {
    return data;
  }

  var pivot = data[data.length - 1];
  var leftList = [];
  var rightList = [];

  for (var i = 0; i < data.length - 1; i++) {
    if (!isLess(settings, data[i], pivot)) {
      leftList.push(data[i]);
    } else {
      rightList.push(data[i]);
    }
  }

  return [].concat(_toConsumableArray(QuickSort(settings, leftList)), [pivot], _toConsumableArray(QuickSort(settings, rightList)));
}

function printTable(data) {
  var tbl = document.getElementById("table");
  var section = document.getElementById("section");
  if (tbl) tbl.parentNode.removeChild(tbl);
  tbl = document.createElement("table");
  var tblHead = document.createElement("thead");
  var arr = ["Название", "Локация", "Длина", "Ширина", "Максимальная скорость", "Год постройки"];

  for (var i = 0; i < 6; i++) {
    var row = document.createElement("th");
    var cellText = document.createTextNode("".concat(arr[i]));
    row.appendChild(cellText);
    tblHead.appendChild(row);
  }

  tbl.appendChild(tblHead);
  var tblBody = document.createElement("tbody");

  for (var _i = 0; _i < data.length; _i++) {
    var _row = document.createElement("tr");

    for (var j = 0; j < data[_i].length; j++) {
      var cell = document.createElement("td");

      var _cellText = document.createTextNode("".concat(data[_i][j]));

      cell.appendChild(_cellText);

      _row.appendChild(cell);
    }

    tblBody.appendChild(_row);
  }

  tbl.appendChild(tblBody);
  section.appendChild(tbl);
  tbl.setAttribute("id", "table");
  tbl.setAttribute("border", "1");
}

function sortSettings() {
  var first = document.getElementById('first').value;
  var second = document.getElementById('second').value;
  var third = document.getElementById('third').value;
  var firstCheck = document.getElementById('descFirst').checked;
  var secondCheck = document.getElementById('descSecond').checked;
  var thirdCheck = document.getElementById('descThird').checked; // alert(first + ' ' + second + ' ' + third + ' ' + firstCheck + ' ' + secondCheck + ' ' + thirdCheck);

  if (+first === 0 && +second === 0 && +third === 0) {
    alert('Выберите уровни сортировки!');
    return;
  }

  if (first === second && +first !== 0 && +second !== 0 || second === third && +second !== 0 && +third !== 0 || first === third && +first !== 0 && +third !== 0) {
    alert('Уровни сортировки не должны совпадать!');
    return;
  }

  var settings = [];

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

  var data = getDataTable();
  data = QuickSort(settings, data); //console.log(data);

  printTable(data); // settings example: 0,false, -1,false, -1,false
}