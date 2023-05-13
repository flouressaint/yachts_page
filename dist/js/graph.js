function drawGraph(data) {
  // формируем массив для построения диаграммы
  let ox;
  if (document.getElementById("oxPlace").checked) {
    ox = "Локация";
  } else if (document.getElementById("oxYear").checked) {
    ox = "Год постройки";
  }
  let oy;
  if (document.getElementById("oyLen").checked) {
    oy = "Длина";
  } else if (document.getElementById("oySpeed").checked) {
    oy = "Максимальная скорость";
  }
  let yachts = arrToObj(getDataTable());
  let arrGraph = getArrGraph(yachts, ox, oy);
  if (document.getElementById("oxYear").checked) {
    arrGraph = sortArr(arrGraph);
  }
  let marginX = 50;
  let marginY = 50;
  let height = 400;
  let width = 800;
  let svg = d3.select("svg").attr("height", height).attr("width", width); // очищаем svg перед построением
  svg.selectAll("*").remove();
  // определяем минимальное и максимальное значение по оси OY
  let min = d3.min(arrGraph.map((d) => d.valueMin)) * 0.95;
  let max = d3.max(arrGraph.map((d) => d.valueMax)) * 1.05;
  let xAxisLen = width - 2 * marginX;
  let yAxisLen = height - 2 * marginY;
  // определяем шкалы для осей
  let scaleX = d3
    .scaleBand()
    .domain(
      arrGraph.map(function (d) {
        return d.labelX;
      })
    )
    .range([0, xAxisLen], 1);
  let scaleY = d3.scaleLinear().domain([min, max]).range([yAxisLen, 0]); // создаем оси
  let axisX = d3.axisBottom(scaleX); // горизонтальная
  let axisY = d3.axisLeft(scaleY); // вертикальная
  // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
  svg
    .append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`)
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
      return "rotate(-45)";
    });
  // отображаем ось OY
  svg
    .append("g")
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .attr("class", "y-axis")
    .call(axisY);
  // создаем набор вертикальных линий для сетки
  d3.selectAll("g.x-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -yAxisLen);
  // создаем горизонтальные линии сетки
  d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLen)
    .attr("y2", 0);
  // отображаем данные в виде точечной диаграммы
  svg
    .selectAll(".column")
    .data(arrGraph)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return scaleX(d.labelX);
    })
    .attr("y", function (d) {
      return scaleY(d.valueMax);
    })
    .attr("width", scaleX.bandwidth())
    .attr("height", function (d) {
      return yAxisLen - scaleY(d.valueMax);
    })
    .attr("transform", `translate(${marginX}, ${marginY})`)
    .style("fill", "#03bafc");
}

function arrToObj(arr) {
  let data = [];
  for (let i = 0; i < arr.length; i++) {
    data.push({
      Название: arr[i][0],
      Локация: arr[i][1],
      Длина: parseInt(arr[i][2]),
      Ширина: arr[i][3],
      "Максимальная скорость": arr[i][4],
      "Год постройки": arr[i][5],
    });
  }
  return data;
}

// sort array of object
function sortArr(arr) {
  arr.sort((a, b) => Number(a.labelX) - Number(b.labelX));
  return arr;
}

// Входные данные:
// arrObject - исходный массив (например, buildings)
// fieldX - поле, различные значения которого будут отображаться на оси ОХ
// fieldY - поле, минимальное и максимальное значение которого
// вычисляется для каждой метки на оси ОХ // Результат - массив для построения диаграммы
function getArrGraph(arrObject, fieldX, fieldY) {
  // сформируем список меток по оси OX (различные элементы поля fieldX) // см. стр. 8-9 Теоретического материала к ЛР
  let groupObj = d3.group(arrObject, (d) => d[fieldX]);
  arrGroup = []; // массив объектов для построения графика
  for (let entry of groupObj) {
    //выделяем минимальное и максимальное значения поля fieldY //для очередной метки по оси ОХ
    let minMax = d3.extent(entry[1].map((d) => d[fieldY]));
    let elementGroup = {};
    elementGroup.labelX = entry[0];
    elementGroup.valueMin = minMax[0];
    elementGroup.valueMax = minMax[1];
    arrGroup.push(elementGroup);
  }
  return arrGroup;
}

//let createGraph = document.getElementById("graph");
//drawGraph();
