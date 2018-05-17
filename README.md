# About
**bar-chart-lib** is a Library that allow other devs to generate bar charts on web pages using HTML, CSS and JavaScript. It's a tool to make easy to create and display a simple bar chart after some data and options information.

# Screenshots
Examples of charts that you can create with this API:

![Sample 1](/images/sample1.png)

![Sample 2](images/sample2.png)

![Sample 3](images/sample3.png)

# How to Use
Just call the function `drawBarChart(data, options, element);` where:

`data`: Multidimensional Array with labels (axis x) and values (axis y), as the examples above:

var data = [ ['Bob',10], ['Rick',15], ['Sarah',20] ];

Where Bob = 10, Rick = 15 and Sarah = 20;

`options`: Object with all options parameters that you need to customize your bar chart. More details in topic **Options Parameters**

`element`: Will be `null` when you just want to display the bar chart in the html page but if you need to show this chart in some specific html element, just put this name on it.

# Options Parameters
Under Construction

# Issues / Bugs
- ESLint support (i couldn't setup this correctly yet. I know, this is sad);

# Features to be implemented
- Increase the options for the element that you point to, like position of this element, borders, colors and fonts;
- Increase the options for the chart, like title and space between another chart;
- Possibility to manipulate the axis, inverting the chart;
- Possibility to insert multiple values for each bar;

# External Resources
[W3Schools - JavaScript](https://www.w3schools.com/js/default.asp)
