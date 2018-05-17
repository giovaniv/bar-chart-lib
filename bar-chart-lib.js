
// global variables to control the function
var item_bar_height;  // height of each item bar in axis y

// guarantee that the axis Y is clean and without any duplicate number
function cleanArray(data) {

  var res = [];
  var num;

  for (i=0; i < data.length; i++) {
    if (num != data[i]) {
      num = data[i];
      res.push(num);
    }
  }

  return res;

}

// create random numbers how many times parameters ask
function createRandomNumbers(data,times) {

  var res = data;

  // we get the min and max number in the y-axis
  var min = getLimitNumber(res,'min');
  var max = getLimitNumber(res,'max');

  var total = 0;

  while (total != times) {

    var rand_number = Math.floor(Math.random() * (max - min + 1)) + min;

    if (res.indexOf(rand_number) < 0) {
      res.push(rand_number);
      total += 1;
    }

  }

  return res;

}

// function that return a specific array of value or label
// of the chart
function getSpecValue(data,type) {
  var res = [];
  var position;
  if (type === 'label') {
    position = 0;
  } else {
    position = 1;
  }
  for (var i=0; i<data.length; i++) {
    for (var j=0; j<data[i].length; j++) {
      if (j==position) {
        res.push(data[i][j]);
      }
    }
  }
  return res;
}

// function that retrieves the min or max number of an array
function getLimitNumber(data,type) {
  var res = data[0];
  for (var i=0; i<data.length; i++) {
    if (data[i] > res && type === 'max') {
      res = data[i];
    }
    else if (data[i] < res && type === 'min') {
      res = data[i];
    }
  }
  return res;
}

// sort array descending
function sortDesc(a,b) {
  return b-a;
}

// function that creates the array for a specific axis
function createAxis(data, quant, lower, higher) {

  var res = data;
  var total = 0;

  // we clean the numbers that repeat inside de array
  res = data.sort(sortDesc);

  // how many itens we need to include
  var dif = quant - res.length;

  // if we didnt need extra numbers we return the same array
  if (dif <= 0 || quant > higher) {
    res.sort(sortDesc);
    return res;
  }

  // we get the min and max number in the y-axis
  var min = getLimitNumber(res,'min');
  var max = getLimitNumber(res,'max');

  // if the lower limit is lower than the min value,
  // we push this number to the return array
  if (lower < min) {
    res.push(lower);
    dif -= 1;
  }

  // we do the same with the highest value against
  // the max value of the array
  if (higher > max) {
    res.push(higher);
    dif -= 1;
  }

  res = cleanArray(res);
  res = createRandomNumbers(res,dif);
  res.sort(sortDesc);

  return res;

}

// function to draw the labels of axis X
function drawAxisX(data,opt) {

  var item_width;
  var style;
  var style_i;
  var html;

  // style variation for each item inside
  // width of each item is defined by chart width / quantity of itens
  item_width = (opt.chart_width / data.length).toFixed(0) - 1;
  style = "width:" + opt.chart_width + "px;";

  style += "font-family:" + opt.x_font_face + ";";
  style += "font-size:" + opt.x_font_size + "px;";
  style += "color:" + opt.x_font_color + ";";
  style += "background-color:" + opt.x_bgcolor + ";";

  style_i = "width:" + item_width + "px;";
  style_i += "text-align:center";

  html = "<td id=x style='" + style + "'><table width='100%'><tr>";

  for (var i=0; i<data.length; i++) {
    html += "<td style='" + style_i + "'>" + data[i] + "</td>";
  }
  html += "</tr></table></td>";

  return html;

}


// function to draw the values in axis Y
function drawAxisY(data,opt) {

  var html;
  var item_height;
  var style;

  style = "height:" + opt.chart_height + "px;";
  style += "font-family:" + opt.y_font_face + ";";
  style += "font-size:" + opt.y_font_size + "px;";
  style += "color:" + opt.y_font_color + ";";
  style += "background-color:" + opt.y_bgcolor + ";";


  html = "<td id=y valign=bottom style='" + style + "'>";
  html += "<table width='100%'>";

  item_height = opt.chart_height / data.length;
  item_bar_height = item_height;

  style_i = "height:" + item_height + "px;";

  for (var i=0; i<data.length; i++) {
    html += "<tr><td style='" + style_i + "'>" + data[i] + "</td></tr>";
  }

  html += "</table></td>";

  return html;

}

function drawBars(data,axis,opt) {

  var item_height = 0;

  var item_width;

  var style_i;

  var html = "";

  var style = "width:" + opt.chart_width + "px;";
  style += "height:" + opt.chart_height + "px;";
  style += "font-family:" + opt.chart_font_face + ";";
  style += "font-size:" + opt.chart_font_size + "px;";
  style += "color:" + opt.chart_font_color + ";";
  style += "background-color:" + opt.chart_bgcolor + ";";

  // calc to know how many width each column will have
  item_width = (opt.chart_width / data.length).toFixed(0) - 1;
  style_i = "width:" + item_width + "px;";

  html += "<td id='chart_base' valign=bottom style='" + style + "'><table><tr>";

  for (var i=0; i<data.length; i++) {

    for (var j=axis.length-1; j>=0; j--) {

      item_height += item_bar_height;

      if (axis[j] === data[i]) {
        var unit_style = "height:" + item_height + "px;";
        unit_style += "background-color:" + opt.bar_bgcolor + ";";
        html += "<td align=center valign=bottom style='" + style_i + "'>";
        html += "<div id='bars' style='" + unit_style + "'>";
        html += data[i] + "</div></td>";
      }
    }

    item_height = 0;

  }

  html += "</tr></table></td></tr><tr><td>&nbsp;</td>";

  return html;

}

// main function
function drawBarChart(data, opt, htmlElement) {
/*
The ​data​ parameter will be the data the chart
should work from. Start with just an Array of numbers
- e.g.​[1,2,3,4,5]

The ​options​ parameter should be an object which
has options for the chart.
- e.g. ​width​and ​height​of the bar chart

The htmlElement parameter should be a DOM element
or jQuery element that the chart will get rendered into.

*/

  //var sorted = [];
  var values = [];
  var original_values = [];
  var axis_x = [];
  var axis_y = [];
  var result = "";
  var element = "";

  // Validation of data parameter
  if ((Array.isArray(data)) && data.length > 0) {

    // we separate values from labels
    values = getSpecValue(data,'values');
    axis_x = getSpecValue(data,'label');

    // we create others numbers between the values
    axis_y = createAxis(values, opt.y_quantity, opt.y_low_limit, opt.y_high_limit);

    //we start to draw our result html page
    result += "<p><table><tr>";

    // draw the limits in axis y
    result += drawAxisY(axis_y,opt);

    // draw the bars of the chart
    original_values = getSpecValue(data,'values');
    result += drawBars(original_values,axis_y,opt);

    // draw the labels in axis x
    result += drawAxisX(axis_x,opt);

    // we guarantee that it will be a space between this and the next chart
    result += "</tr></table>";

    if (htmlElement === null) {
      document.write(result);
    } else {
      element = document.getElementById(htmlElement);
      element.innerHTML += result;
    }

  } else {
    console.log('expected any data to create the bar chart');
  }

}

