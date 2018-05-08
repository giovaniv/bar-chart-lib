// global variables to control the options parameters
var chart_width;      // width of the chart
var chart_height;     // height of the chart
var bar_color;        // color of each bar
var y_quantity;       // quantity of itens in axis y (number)
var y_lower_limit;    // lower limit of axis y (number)
var y_higher_limit;   // higher limit of axis y (number)

// global variables to control the function
var item_bar_height;  // height of each item bar in axis y
var style_bar_width;   // style of each item bar in axis x


// sort an array by numbers descending
function sortArray(data) {

  var res = [];
  var num = data[0];
  var pos;

  while (res.length != data.length) {

    for (var i=0; i<data.length; i++) {

      if ( num < data[i] && (res.indexOf(data[i]) < 0) ) {
        num = data[i];
      }
    }

    res.push(num);
    num = 0;
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

// function to validate options parameter
function validateOptions(options) {

  if ((Array.isArray(options)) && options.length > 0) {

    for (var i=0; i<options.length; i++) {

      switch(i) {

        case 0: chart_width = options[i];     break;
        case 1: chart_height = options[i];    break;
        case 2: bar_color = options[i];       break;
        case 3: y_quantity = options[i];      break;
        case 4: y_lower_limit = options[i];   break;
        case 5: y_higher_limit = options[i];  break;
        default: break;

      }

    }

  }

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

// function that creates the array for a specific axis
function createAxis(data, quant, lower, higher) {

  var res = data;
  var sorted = [];
  var total = 0;

  // how many itens we need to include
  var dif = quant - data.length;

  // if we didnt need extra numbers we return the same array
  if (dif < 0) {
    return data;
  }

  // we get the min and max number in the y-axis
  var min = getLimitNumber(data,'min');
  var max = getLimitNumber(data,'max');

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

  res = createRandomNumbers(res,dif);
  res = sortArray(res);

  return res;

}

// function to draw the labels of axis X
function drawAxisX(data) {

  var item_width;
  var style;
  var style_i;
  var html;

  // style variation for each item inside
  // width of each item is defined by chart width / quantity of itens
  item_width = (chart_width / data.length).toFixed(0) - 1;
  style = "width:" + chart_width + "px;background-color:black;";
  style_i = "width:" + item_width + "px;";

  // all of the content will be inside this div id
  console.log(style);
  //html = "&nbsp;<div id='chart_x' style='" + style + "'>";
  html = "&nbsp;<div id=chart_x style='background-color:black;width:400px;'>";

  for (var i=0; i<data.length; i++) {
    html += "<div id='columns' style='" + style_i + "'>" + data[i] + "</div>";
  }
  html += "</div></div>";


  console.log('== start x ==');
  console.log(html);
  console.log('== end x ==');


  return html;

}


// function to draw the values in axis Y
function drawAxisY(data) {

  var html;
  var item_height;

  // all of the content will be inside this div id
  html = "<div id=chart_y>";

  item_height = chart_height / data.length;

  item_bar_height = item_height;

  style_i = "height:" + item_height + "px;";

  for (var i=0; i<data.length; i++) {
    html += "<div id='slice_y' style='" + style_i + "'>" + data[i] + "</div>";
  }

  html += "</div>";

  /*
  console.log('== start y ==');
  console.log(html);
  console.log('== end y ==');
  */

  return html;

}

function drawBars(data,axis) {

  var item_height = 0;

  var item_width;

  var style_i;

  var html = "<div id=chart_content>";

  var style = "width:" + chart_width + "px;";
  style += "height:" + chart_height + "px;";

  // calc to know how many width each column will have
  item_width = (chart_width / data.length).toFixed(0) - 1;
  style_i = "width:" + item_width + "px;";

  html += "<div id='chart_base' style='" + style + "'>";

  for (var i=0; i<data.length; i++) {

    for (var j=axis.length-1; j>=0; j--) {

      item_height += item_bar_height;

      if (axis[j] === data[i]) {
        var unit_style = "height:" + item_height + "px;";
        unit_style += "background-color:" + bar_color + ";";
        html += "<div id='columns' style='" + style_i + "'>";
        html += "<div id='bars' style='" + unit_style + "'>";
        html += data[i] + "</div></div>";
      }
    }

    item_height = 0;

  }

  html += "</div>";

  /*
  console.log('== start chart ==');
  console.log(html);
  console.log('== end chart ==');
  */

  return html;

}

// main function
function drawBarChart(data, options, htmlElement) {
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

  var sorted = [];
  var values = [];
  var original_values = [];
  var axis_x = [];
  var axis_y = [];
  var result = "";
  var element = "";

  // Validation of options parameter
  validateOptions(options);

  // Validation of data parameter
  if ((Array.isArray(data)) && data.length > 0) {

    // we separate values from labels
    values = getSpecValue(data,'values');
    axis_x = getSpecValue(data,'label');

    // we create others numbers between the values
    axis_y = createAxis(values, y_quantity, y_lower_limit, y_higher_limit);

    //we start to draw our result html page
    result += "<div id=chart>";

    // draw the limits in axis y
    result += drawAxisY(axis_y);

    // draw the bars of the chart
    original_values = getSpecValue(data,'values');
    result += drawBars(original_values,axis_y);

    // draw the labels in axis x
    result += drawAxisX(axis_x);

    // we guarantee that it will be a space between this and the next chart
    result += "</div><div id=chart>&nbsp;</div>";

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

