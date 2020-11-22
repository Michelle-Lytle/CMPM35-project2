function init(data) {

  // filters for position 
  let pos1 = data.filter ( d => { return d.position == "curled up"; } );

  let pos2 = data.filter ( d => { return d.position == "under blanket"; } );

  let pos3 = data.filter ( d => { return d.position == "sprawled out"; } );

  let pos4 = data.filter ( d => { return d.position == "on side"; } );

  let pos5 = data.filter ( d => { return d.position == "loaf"; } );

  let pos6 = data.filter ( d => { return d.position == "flopped"; } );

  // array of datasets filtered by position data point 
  let positions = [pos1, pos2, pos3, pos4, pos5, pos6];



  // defines range of x values
  let x = d3.scaleBand()
      .domain(d3.range(positions.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

  // defines range of y values
  let y = d3.scaleLinear()
    .domain([0, pos1.length]).nice()
    .range([height - margin.bottom, margin.top]);


  // labels x axis 
  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].position).tickSizeOuter(0)); 

  // labels y axis 
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y));


  // draws graph
  let svg = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(0))
      .attr("height", d => y(0) - y(10))
      .attr("width", x.bandwidth());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}


let color = "steelblue";

let width = 500; 

let height = 500; 

let margin = ({top: 30, right: 0, bottom: 30, left: 40});
