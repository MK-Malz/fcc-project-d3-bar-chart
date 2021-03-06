//get data
fetch(
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").

then(response => response.json()).
then(data => {
  let dataset = data.data;


  // creata DataViz
  const w = 1000;
  const h = 500;
  const padding = 100;

  var dates = dataset.map(function (item) {
    return new Date(item[0]);
  });

  const maxDate = new Date(d3.max(dates));
  //maxDate.setMonth(maxDate.getMonth() + 3);



  const xScale = d3.
  scaleTime().
  domain([d3.min(dates), maxDate]).
  range([padding, w - padding]);

  const yScale = d3.
  scaleLinear().
  domain([0, d3.max(dataset, d => d[1])]).
  range([h - padding, padding]);

  const svg = d3.
  select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  var tooltip = d3.select("body").append("div").attr("id", "tooltip");


  svg.
  selectAll("rect").
  data(dataset).
  enter().
  append("rect").
  attr("x", function (d, i) {
    return xScale(dates[i]);
  }).
  attr("y", function (d) {
    return yScale(d[1] - padding);
  }).
  attr("width", 1).
  attr("height", d => h - padding - yScale(d[1])).
  attr("class", "bar").
  attr("data-date", d => d[0]).
  attr("data-gdp", d => d[1]).
  on("mouseover", function (d) {
    console.log(d.path[0]["__data__"][0]);
    tooltip.
    style("left", d3.pageX - 50 + "px").
    style("top", d3.pageY - 70 + "px").
    style("display", "flex").
    attr("data-date", d.path[0]["__data__"][0]).
    html(d.path[0]["__data__"][0]);
  }).
  on("mouseout", function (d) {tooltip.style("display", "none");});




  const xAxis = d3.axisBottom().scale(xScale);

  const yAxis = d3.axisLeft(yScale);

  svg.
  append("g").
  attr("transform", "translate(0," + (h - padding) + ")").
  call(xAxis).
  attr("id", "x-axis");

  svg.
  append("g").
  attr("transform", "translate(" + padding + ",0)").
  call(yAxis).
  attr("id", "y-axis");
});