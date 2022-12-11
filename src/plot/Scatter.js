import * as d3 from 'd3';
import React, {useEffect, useState} from 'react';
import {Select, Row, Col, Slider, Descriptions, Empty, Button} from "antd";
import {dataset} from "../data";
import "./scatter.css";
import ToolTip from "./ToolTip";

export default function Scatter(props) {
  const scatterRef = React.useRef();

  const [xAxisVal, setXAxis] = useState("Year");
  const [yAxisVal, setYAxis] = useState("Fatalities");
  const [xRange, setXRange] = useState([0, 100]);
  const [yRange, setYRange] = useState([0, 100]);
  const [xSel, setXSel] = useState([0, 100]);
  const [ySel, setYSel] = useState([0, 100]);
  const [tooltipData, setToolTipData] = useState(null);
  const [descriptionData, setDescriptionData] = useState(null);

  useEffect(() => {
    drawScatter();
  }, []);

  useEffect(() => {
    console.log(xAxisVal);
    computeRange(0);
  }, [xAxisVal]);

  useEffect(() => {
    console.log(yAxisVal);
    computeRange(1);
  }, [yAxisVal]);

  useEffect(() => {
    console.log(xRange);
    setXSel(xRange);
  }, [xRange]);

  useEffect(() => {
    console.log(yRange);
    setYSel(yRange);
  }, [yRange]);

  useEffect(() => {
    updateScatter(-1);
  }, [xSel, ySel]);

  const axisContent = [
    {
      label: "Year",
      value: "Year"
    },
    {
      label: "Fatalities",
      value: "Fatalities"
    },
    {
      label: "Injuries",
      value: "Injuries"
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

  function updateScatter(axis) {

    const xKey = xAxisVal;
    const yKey = yAxisVal;

    let data = dataset.filter((v) => (
      v[xKey] >= xSel[0]
      && v[xKey] <= xSel[1]
      && v[yKey] >= ySel[0]
      && v[yKey] <= ySel[1]
    ))

    const container = d3.select(scatterRef.current);
    const chartG = container.select("svg").select("#scatter");

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 680 - margin.left - margin.right,
      height = 480 - margin.top - margin.bottom;

    // Add X axis
    let x = d3.scaleLinear()
      .domain(xSel)
      .range([ 0, width ])

    let xTicks = x.ticks().filter(tick => Number.isInteger(tick));

    let xAxis = chartG.select("#xAxis")
      .transition().duration(800)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .tickValues(xTicks)
        .tickFormat((d) => d.toString()));

    // Add Y axis
    let y = d3.scaleLinear()
      .domain(ySel)
      .range([ height, 0])

    let yTicks = y.ticks().filter(tick => Number.isInteger(tick));

    let yAxis = chartG.select("#yAxis")
      .transition().duration(800)
      .call(d3.axisLeft(y)
        .tickValues(yTicks)
        .tickFormat((d) => d.toString()));

    let dots = chartG
      .selectAll(".dot")
      .data(data);

    let dotsEnter = dots
      .enter()
      .append("circle")
      .attr("class", "dot");

    dotsEnter
      .merge(dots)
      .on("mouseover", (e, d) => displayToolTip(e, d))
      .on("mouseleave", (e) => hideToolTip())
      .on("click", (e, d) => updateDescription(e, d))
      .transition()
      .attr("cx", (d) => (d[xKey] == null ? 0 : x(d[xKey])))
      .attr("cy", (d) => (d[yKey] == null ? 0 : y(d[yKey])))
      .attr("r", 5)
      .attr("id", (d) => d["Case"]
        .replace(/\s/g,'')
        .replace(/\'/g,''))
      .duration(1000);

    dots.exit().remove();
  }

  function computeRange(axis) {
    const xKey = xAxisVal;
    const yKey = yAxisVal;

    let xData = dataset.map((v) => (v[xKey]));
    let yData = dataset.map((v) => (v[yKey]));

    let xMax = Math.max(...xData);
    let xMin = Math.min(...xData);
    let yMax = Math.max(...yData);
    let yMin = Math.min(...yData);

    if (0 < xMin && xMin < 10) {
      xMin = 0;
    }

    if (0 < yMin && yMin < 10) {
      yMin = 0;
    }

    let xRng = [Math.floor(xMin), Math.ceil(xMax + 1)];
    let yRng = [Math.floor(yMin), Math.ceil(yMax + 1)];

    if (axis === 0) {
      setXRange(xRng);
    } else if (axis === 1) {
      setYRange(yRng);
    }
  }

  function displayToolTip(e, data) {
    setToolTipData({
      name: data["Case"],
      xPos: e.offsetX,
      yPos: e.offsetY
    });
  }

  function hideToolTip() {
    setToolTipData(null);
  }

  function  updateDescription(e, data) {
    d3.selectAll(".dot").style("fill", "#69b3a2");
    d3.select('#' + data["Case"].replace(/\s/g,'')
      .replace(/\'/g,'')).style("fill", "#b3698d");
    setDescriptionData(data);
  }

  function clearDescription() {
    d3.selectAll(".dot").style("fill", "#69b3a2");
    setDescriptionData(null);
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={14}>
        <div ref={scatterRef} style={{width: "100%", height: "600px"}}>
          <ToolTip data={tooltipData}></ToolTip>
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={10}>
        <Row gutter={8} justify={"center"}>
          <Col span={8}>
            <p style={{marginLeft: "10%"}}> X Axis: </p>
            <Select
              options={axisContent}
              defaultValue={axisContent[0].value}
              style={{width: "100%"}}
              onChange={(v) => {setXAxis(v)}}
            ></Select>
            <Slider id={"xSlider"}
                    range step={1}
                    min={xRange[0]}
                    max={xRange[1]}
                    value={xSel}
                    marks={Object.assign({},...xRange.map(key => ({[key]: key.toString()})))}
                    style={{width: "80%", marginLeft: "10%"}}
                    onChange={(v) => {
                      setXSel(v);
                    }}
            ></Slider>
          </Col>
          <Col span={8}>
            <p style={{marginLeft: "10%"}}> Y Axis: </p>
            <Select
              options={axisContent}
              defaultValue={axisContent[1].value}
              style={{width: "100%"}}
              onChange={(v) => {setYAxis(v)}}
            ></Select>
            <Slider id={"ySlider"}
                    range step={1}
                    min={yRange[0]}
                    max={yRange[1]}
                    marks={Object.assign({},...yRange.map(key => ({[key]: key.toString()})))}
                    value={ySel}
                    style={{width: "80%", marginLeft: "10%"}}
                    onChange={(v) => {
                      setYSel(v);
                    }}
            ></Slider>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={16}>
            {
              descriptionData !== null ?
                <>
                  <Descriptions title={"Details"}
                                column={24}
                                style={{width: "100%"}}
                  >
                    <Descriptions.Item label={"Case"} span={24} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Case"]}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Location"} span={12} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Location"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Date"} span={12} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Date"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Total Victims"} span={8} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Total Victims"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Fatalities"} span={8} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Fatalities"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Injuries"} span={8} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["Injuries"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Weapon(s)"} span={24} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["weapon_details"] || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={"Summary"} span={24} labelStyle={{fontWeight: "bold"}}>
                      {descriptionData["summary"] || "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                  <Button onClick={clearDescription}> Clear </Button>
                </>
                :
                <Empty style={{marginTop: "5em", marginBottom: "5em"}}>
                  <span>
                    Click a dot to show details.
                  </span>
                </Empty>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}