// Request the data ///////////////////////////////////////////////////////////
$.ajax({
  type: "GET",
  contentType: "application/json; charset=utf-8",
  url: 'data',
  dataType: 'json',

  success: function (data) {
    render(data);
  },
  error: function (result) {
    error();
  }
});

///////////////////////////////////////////////////////////////////////////////
// Main render function                                                      //
///////////////////////////////////////////////////////////////////////////////
function render(data) {
  // console.log(data);

  renderTexasSP(data);
}

///////////////////////////////////////////////////////////////////////////////
// Renders the Texas scatter plot                                            //
///////////////////////////////////////////////////////////////////////////////
function renderTexasSP(data) {
  var outerWidth  = 642;
  var outerHeight = 649;
  var margin = { left: 5, top: 5, right: 0, bottom: 0 };

  var xColumn = "longitude";
  var yColumn = "latitude";
  var rColumn = "population";
  var peoplePerPixel = 1000;

  var innerWidth  = outerWidth  - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  var svg = d3.select("body").append("svg")
    .attr("width",  outerWidth)
    .attr("height", outerHeight);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.scale.linear().range([0, innerWidth]);
  var yScale = d3.scale.linear().range([innerHeight, 0]);
  var rScale = d3.scale.sqrt();

  xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
  yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
  rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

  // Compute the size of the biggest circle as a function of peoplePerPixel.
  var peopleMax = rScale.domain()[1];
  var rMin = 5;
  var rMax = Math.sqrt(peopleMax / (peoplePerPixel * Math.PI));
  rScale.range([rMin, rMax]);

  var circles = g.selectAll("circle").data(data);

  circles.enter().append("circle");

  circles
    .attr("cx",    function (d){ return xScale(d[xColumn]); })
    .attr("cy",    function (d){ return yScale(d[yColumn]); })
    .attr("r",     function (d){ return rScale(d[rColumn]); })
    .attr("class", function (d){ return d.city })
  .on('mouseover', function(d){
    renderCityBC(data, d.city);
  })

  circles.exit().remove();
}

///////////////////////////////////////////////////////////////////////////////
// Renders the city crime bar chart                                          //
///////////////////////////////////////////////////////////////////////////////
function renderCityBC(data, cityName) {
  // Delete the old canvas
  d3.selectAll(".cityBC").remove();

  var outerWidth = 700;
  var outerHeight = 250;
  var margin = { left: 90, top: 30, right: 30, bottom: 30 };
  var barPadding = 0.2;
  var textFadeDuration = 300;

  var xColumn = "city";
  var yColumn = "burglary";

  var selectedCityColor = "red";
  var extraCityColor    = "blue";

  var innerWidth  = outerWidth  - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top  - margin.bottom;

  var svg = d3.select("body").append("svg")
    .attr("class", "cityBC")
    .attr("width",  outerWidth)
    .attr("height", outerHeight);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxisG = g.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + innerHeight + ")");
  var yAxisG = g.append("g")
    .attr("class", "yAxis");

  var xScale = d3.scale.ordinal().rangeBands([0, innerWidth], barPadding);
  var yScale = d3.scale.linear().range([innerHeight, 5]);

  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");


  // Sort the data
  data = data.sort(function(a, b){ return a[yColumn] / a.population - b[yColumn] / b.population})
  cityIndex = data.findIndex(x => x.city == cityName);

  yScale.domain([0, d3.max(data, function (d){ return d[yColumn] / d.population; })]);

  // Get the data just before and after the selected city
  minIndex = cityIndex - 15;
  maxIndex = cityIndex + 15;
  if (minIndex < 0)           { minIndex = 0; }
  if (maxIndex > data.length) { maxIndex = data.length; }

  data = data.slice(minIndex, maxIndex);
  xScale.domain( data.map( function (d){ return d[xColumn]; }));

  xAxisG.call(xAxis)
    .selectAll("text")
      .attr("id", function(d, i) { return  "c" + i })
      .attr("class", function (d) { if(d == cityName) {return "currentCity"} else {return "otherCity"} });
  yAxisG.call(yAxis);

  var bars = g.selectAll("rect").data(data);

  // Enter
  bars.enter().append("rect")
    .attr("width", xScale.rangeBand());

  // Update
  bars
    .attr("x",      function (d){ return xScale(d[xColumn]); })
    .attr("y",      function (d){ return yScale(d[yColumn] / d.population); })
    .attr("height", function (d){ return innerHeight - yScale(d[yColumn] / d.population); })
    .attr("fill",   function (d){ if (d.city == cityName) {return selectedCityColor} else {return extraCityColor}})
  .on("mouseover", function(d, i){
    d3.select(".currentCity").transition()
      .duration(textFadeDuration)
      .style("opacity", 0)
    d3.select('#c' + i)
      .transition()
        .duration(textFadeDuration)
        .style("opacity", 1)
  })
  .on("mouseout", function(d, i) {
    d3.select("#c" + i).transition()
      .duration(textFadeDuration)
      .style("opacity", 0)
    d3.select(".currentCity").transition()
      .duration(textFadeDuration)
      .style("opacity", 1)
  })

  // Exit
  bars.exit().remove();
}


