import * as d3 from 'd3';
import React, {useEffect} from 'react';

export default function Scatter(props) {
  const scatterRef = React.useRef();

  useEffect(() => {
    drawScatter(props);
  }, [])

  function drawScatter(props) {
    const container = d3.select(scatterRef.current);

    // set the dimensions and margins of the graph
    let margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

    // Add X axis
    let x = d3.scaleLinear()
      .domain([1980, 2023])
      .range([ 0, width ]);
    let xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat((d) => d.toString()));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, 1000])
      .range([ height, 0]);
    let yAxis = svg.append("g")
      .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(props.data)
      .enter()
      .append("circle")
      .attr("cx", (d) => (x(d.Year)))
      .attr("cy", (d) => (y(d['Total Victims'])))
      .attr("r", 5)
      .attr("class", "dot")
      .style("fill", "#69b3a2" )
  }

  return (
    <div ref={scatterRef}></div>
  );
}