/*

Our graph represents how many times Michelle's cat was laying 
in a certain position over a period of time. 

The graph can change between displaying data for the whole week 
or for a specific day by pressing the buttons at the top. 

The height value of each bar can be viewed by hovering the 
mouse over that bar. 

Our code is based on the bar chart example from D3. 
<https://observablehq.com/@d3/bar-chart>

*/

function init(data) {
  // filters data by day 
  let tues = data.filter ( d => { return d.day == "tuesday"; } );
  let wed = data.filter ( d => { return d.day == "wednesday"; } );
  let thurs = data.filter ( d => { return d.day == "thursday"; } );
  let fri = data.filter ( d => { return d.day == "friday"; } );
  let sat = data.filter ( d => { return d.day == "saturday"; } );
  let sun = data.filter ( d => { return d.day == "sunday"; } );
  let mon = data.filter ( d => { return d.day == "monday"; } );
  let week = data.filter ( d => { return d.day == "total"; } );
  
  // initially draws graph based on the data for a week
  makeGraph(week);

  // changes graph when a button is clicked 
  d3.select("#total")
    .on("click", function(d, i) {
      color = "#C14DC8";
      graph_text = "Whole Week";
      makeGraph(week);
  })
  d3.select("#tues")
    .on("click", function(d, i) {
      color = "#4E8BE5";
      graph_text = "Tuesday";
      makeGraph(tues);
  })
  d3.select("#wed")
    .on("click", function(d, i) {
      color = "#4EE5A4";
      graph_text = "Wednesday";
      makeGraph(wed);
  })
  d3.select("#thurs")
    .on("click", function(d, i) {
      graph_text = "Thursday";
      color = "#C14DC8";
      makeGraph(thurs);
  })
  d3.select("#fri")
    .on("click", function(d, i) {
      graph_text = "Friday";
      color = "#4E8BE5";
      makeGraph(fri);
  })
    d3.select("#sat")
    .on("click", function(d, i) {
      graph_text = "Saturday";
      color = "#4EE5A4";
      makeGraph(sat);
  })
  d3.select("#sun")
    .on("click", function(d, i) {
      graph_text = "Sunday";
      color = "#C14DC8";
      makeGraph(sun);
  })
  d3.select("#mon")
    .on("click", function(d, i) {
      color = "#4E8BE5";
      graph_text = "Monday";
      makeGraph(mon);
  })
}


function makeGraph(day) {
  // clears graph 
  d3.selectAll('svg').remove();

  // defines range of x values
  let x = d3.scaleBand()
      // domain of x is the number of positons
      .domain(d3.range(6))
      .range([margin.left, width - margin.right])
      .padding(0.1);

  // defines range of y values
  let y = d3.scaleLinear()
    // domain of y is the greatest frequency 
    .domain([0, d3.max(day, d => d.frequency) * 2])
    .range([height - margin.bottom, margin.top]);

  // labels x axis 
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => day[i].position).tickSizeOuter(0)); 

  // labels y axis 
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, day.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(day.y));

  // draws graph
  let svg = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

  // height of bars represents frequency  
  svg.append("g")
    .attr("fill", color)
    .selectAll("rect")
    .data(day)
    .join("rect")
      .attr("class", (d) => d.frequency)
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.frequency))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.frequency))

      // mouseover runs when mouse is over a bar
      .on('mouseover', function(d, i) {
        d3.select(this)
        .transition()
        .duration('125')
        .attr('opacity', '.75');

      // displays frequency for bars when the mouse is over a bar 
      let tooltip = svg.append("text")
        .attr("id", "tooltip")
        .attr("x", d3.select(this).attr("x"))
        .attr("y", d3.select(this).attr("y"))
        .attr("text-anchor","right")
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "black")
        .text("Frequency: " + d3.select(this).attr("class"));
        })

      // mouseout runs when mouse leaves bar 
      .on('mouseout', function(d, i) {
        d3.select(this)
        .transition()
          .duration('125')
          .attr('opacity', '1');
        d3.selectAll('#tooltip').remove();
      });

     
  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  // graph label 
  let label_text = svg.append("text")
    .attr("x", 260)
    .attr("y", 550)
    .attr("text-anchor","middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .text(graph_text);
    

  return svg.node();
}

// assignments for making graph 
let color = "#C14DC8";

let graph_text = "Whole Week";

let width = 600; 

let height = 600; 

let margin = ({top: 30, right: 100, bottom: 100, left: 40});
