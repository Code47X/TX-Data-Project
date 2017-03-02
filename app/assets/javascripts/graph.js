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

// Render the graph ///////////////////////////////////////////////////////////
function render(data) {
  console.log(data);

  var outerWidth  = 642;
  var outerHeight = 649;
  var margin = { left: 0, top: 0, right: 0, bottom: 0 };

  var xColumn = "longitude";
  var yColumn = "latitude";
  var rColumn = "population";
  var peoplePerPixel = 2000;

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
  var rMin = 2;
  var rMax = Math.sqrt(peopleMax / (peoplePerPixel * Math.PI));
  rScale.range([rMin, rMax]);

  var circles = g.selectAll("circle").data(data);

  circles.enter().append("circle");

  circles
    .attr("cx",    function (d){ return xScale(d[xColumn]); })
    .attr("cy",    function (d){ return yScale(d[yColumn]); })
    .attr("r",     function (d){ return rScale(d[rColumn]); })
    .attr("class", function (d) {return d.city});

  circles.exit().remove();
}
