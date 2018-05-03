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
function createAxis(data, gap, axis) {

  // we get the min and max number in the y-axis
  var min = getLimitNumber(data,'min');
  var max = getLimitNumber(data,'max');

  document.write(min);
  document.write(max);


}

function displayAxis(data,opts, axis) {

  document.write(data);
  document.write(opts);
  document.write(axis);

}

// main function
function drawBarChart(data, options, element) {
/*
The ​data​ parameter will be the data the chart
should work from. Start with just an Array of numbers
- e.g.​[1,2,3,4,5]

The ​options​ parameter should be an object which
has options for the chart.
- e.g. ​width​and ​height​of the bar chart

The ​element​ parameter should be a DOM element
or jQuery element that the chart will get rendered into.

*/

  var valores = [];
  var axis_x = [];
  var axis_y = [];
  var itens = 0;


// Data parameter
  if ((Array.isArray(data)) && data.length > 0) {

    valores = getSpecValue(data,'values');
    axis_x = getSpecValue(data,'label');
    //axis_y = createAxis(valores,'y');
    //itens = axis_x.length;
    displayAxis(axis_x, options, 'x');

  } else {
    console.log('expected any data to create the bar chart');
  }

}

/*
var info = [ ['Heytor',9], ['Gisele',34], ['Adelina',70] ];
var opts = [];
drawBarChart(info,opts,null);
*/



