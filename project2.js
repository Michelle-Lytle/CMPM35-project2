function init(data) {

  // filters for day 
  let tues = data.filter ( d => { return d.day == "tuesday"; } );

  let wed = data.filter ( d => { return d.day == "wednesday"; } );

  let thurs = data.filter ( d => { return d.day == "thursday"; } );

  let fri = data.filter ( d => { return d.day == "friday"; } );

  let sat = data.filter ( d => { return d.day == "saturday"; } );

  let sun = data.filter ( d => { return d.day == "sunday"; } );

  let mon = data.filter ( d => { return d.day == "monday"; } );

  let week = data.filter ( d => { return d.day == "total"; } );



  // day should change based on input
  makeGraph(sun); 
  
}

function makeGraph(day) {
// defines range of x values
  let x = d3.scaleBand()
      // domain of x is the number of positons
      .domain(d3.range(6))
      .range([margin.left, width - margin.right])
      .padding(0.1);

  // defines range of y values
  let y = d3.scaleLinear()
    // domain of y is the greatest frequency 
    .domain([0, d3.max(day, d => d.frequency) * 2]).nice()
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

  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(day)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.frequency))
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());


  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}


// assignments for making graph 
let color = "steelblue";

let width = 500; 

let height = 500; 

let margin = ({top: 30, right: 0, bottom: 30, left: 40});
