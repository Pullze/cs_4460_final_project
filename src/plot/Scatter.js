import * as d3 from 'd3';
import React, {useEffect, useState} from 'react';
import {Select, Row, Col, Slider, Space} from "antd";
import {dataset} from "../data";
import "./scatter.css";

export default function Scatter(props) {
  const scatterRef = React.useRef();

  useEffect(() => {
    drawScatter();
  }, []);

  const [xAxisVal, setXAxis] = useState("Year");
  const [yAxisVal, setYAxis] = useState("Injuries");

  useEffect(() => {
    console.log(xAxisVal);
    console.log(yAxisVal);
    updateScatter();
  }, [xAxisVal, yAxisVal, setXAxis, setYAxis]);

  const axisContent = [
    {
      label: "Year",
      value: "Year"
    },
    {
      label: "Injuries",
      value: "Injuries"
    },
    {
      label: "Fatalities",
      value: "Fatalities"
    },
    {
      label: "Total Victims",
      value: "Total Victims"
    },
    {
      label: "Shooter's Age",
      value: "Age"
    },
    {
      label: "Latitude",
      value: "Latitude"
    },
    {
      label: "Longitude",
      value: "Longitude"
    },
  ]

  function drawScatter() {
    const container = d3.select(scatterRef.current);

    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 680 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom;

    // append the chartG object to the body of the page
    const chartG = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 680 480")
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
      .attr("id", "scatter");

    // Add X axis
    let xAxis = chartG.append("g")
      .attr("id", "xAxis")
      .attr("transform", "translate(0," + height + ")");

    let yAxis = chartG.append("g")
      .attr("id", "yAxis");

    let dots = chartG
      .selectAll(".dot")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => (Math.random() * width))
      .attr("cy", (d) => (height))
      .attr("r", 5);
  }

  function updateScatter() {
    const xKey = xAxisVal;
    const yKey = yAxisVal;

    let xData = dataset.map((v) => (v[xKey]));
    let yData = dataset.map((v) => (v[yKey]));

    const xMax = Math.max(...xData);
    const xMin = Math.min(...xData);
    const yMax = Math.max(...yData);
    const yMin = Math.min(...yData);
    console.log(xMin, xMax, yMin, yMax)

    const container = d3.select(scatterRef.current);
    const chartG = container.select("svg").select("#scatter");

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 680 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom;

    // Add X axis
    let x = d3.scaleLinear()
      .domain([Math.floor(xMin - 1), Math.ceil(xMax + 1)])
      .range([ 0, width ]);
    let xAxis = chartG.select("#xAxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat((d) => d.toString()))
      .transition().duration(1000);

    // Add Y axis
    let y = d3.scaleLinear()
      .domain([Math.floor(yMin - 1), Math.ceil(yMax+ 1)])
      .range([ height, 0]);
    let yAxis = chartG.select("#yAxis")
      .call(d3.axisLeft(y).tickFormat((d) => d.toString()))
      .transition().duration(1000);

    let dots = chartG
      .selectAll(".dot")
      .data(dataset);

    let dotsEnter = dots
      .enter()
      .append("circle")
      .attr("class", "dot");

    dotsEnter
      .merge(dots)
      .transition()
      .attr("cx", (d) => (d[xKey] == null ? 0 : x(d[xKey])))
      .attr("cy", (d) => (d[yKey] == null ? 0 : y(d[yKey])))
      .attr("r", 5)
      .duration(1000);
  }

  return (
    <Row>
      <Col span={18}>
        <Row>
          <Col span={1}>
            <Slider vertical range step={1} defaultValue={[0, 1000]} />
          </Col>
          <Col>
            <div ref={scatterRef} style={{width: "100%", height: "600px"}}></div>
            <Slider range step={1} defaultValue={[0, 50]}/>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Space>
          <div>
            <span> X Axis: </span>
            <Select
              options={axisContent}
              defaultValue={axisContent[0]}
              style={{minWidth: "10em"}}
              onChange={(v) => {setXAxis(v)}}
            ></Select>
          </div>
          <div>
            <span> Y Axis: </span>
            <Select
              options={axisContent}
              defaultValue={axisContent[1]}
              style={{minWidth: "10em"}}
              onChange={(v) => {setYAxis(v)}}
            ></Select>
          </div>
        </Space>
      </Col>
    </Row>
  );
}