import "./Map.css";

import * as d3 from "d3";

import React, { useEffect, useRef, useState } from "react";
import {
  handleMouseMove,
  handleMouseOut,
  handleMouseOver,
} from "../helpers/tooltipsHandlers";

import YearSlider from "./YearSlider";
import { dataset } from "../../data";
import { formatDetails } from "../helpers/formatDetails";

const UsMap = ({ mapData }) => {
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([-90.93, 40.72]).scale(700));
  var stateAndCases = new Map();
  const [currentDataset, setCurrentDataset] = useState(dataset);
  var map;
  useEffect(() => {
    stateAndCases = new Map();
    currentDataset.forEach((element) => {
      parseStateData(element);
    });
    d3.selectAll(".path").remove();
    renderMap(mapData);
    d3.selectAll(".case").remove();
    renderCircles(currentDataset);
  }, [currentDataset]);

  // Add tooltip
  useEffect(() => {
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("style", "position: absolute; opacity: 0");
  }, [mapData]);

  const renderMap = (mapData) => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    projRef.current.translate([width / 1.8, height / 2]);
    const path = d3.geoPath().projection(projRef.current);
    map = d3.select(svgRef.current).selectAll("path");
    map
      .data(mapData)
      .enter()
      .append("path")
      .attr("class", "path")
      .attr("d", path)
      .style("fill", (d) => {
        if (!stateAndCases.has(d.properties.NAME)) {
          return "#AAAAAA";
        }
        const numCases = stateAndCases.get(d.properties.NAME);
        return fillColorSelector(numCases);
      })
      .on("mouseover", function (d) {
        const stateName = this.__data__.properties.NAME;
        var tooltipMsg;
        if (!stateAndCases.has(stateName)) {
          tooltipMsg = stateName;
        } else {
          tooltipMsg =
            stateName +
            "<br>" +
            " Cases: " +
            stateAndCases.get(stateName) +
            " ";
        }

        handleMouseOver(tooltipMsg);
      })
      .on("mousemove", handleMouseMove)
      .on("mouseleave", handleMouseOut);
  };

  const renderCircles = (currentDataset) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll("circle")
      .data(currentDataset, (d) => {});

    circles
      .enter()
      .append("circle")
      .attr(
        "transform",
        (d) =>
          "translate(" + projRef.current([d["Longitude"], d["Latitude"]]) + ")"
      )
      .attr("r", (d) => {
        if (d["Total Victims"] / 2 > 15) {
          return (2 * d["Total Victims"]) % 10;
        }
        return d["Total Victims"] / 2;
      })
      .attr("class", "case")
      .attr("id", (d, i) => {
        return `${d["Date"] + i}`;
      })
      .on("mouseover", (d) => {
        handleMouseOver(formatDetails(d.srcElement.__data__));
      })
      .on("mousemove", handleMouseMove)
      .on("mouseleave", handleMouseOut)
      .attr("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);

    circles.exit().transition().duration(500).style("opacity", 0).remove();
  };

  const parseStateData = (data) => {
    const location = data["Location"].split(", ");
    var stateName = location.length === 1 ? location[0] : location[1];
    if (stateAndCases.has(stateName)) {
      const num = stateAndCases.get(stateName);
      stateAndCases.set(stateName, num + 1);
    } else {
      stateAndCases.set(stateName, 1);
    }
  };

  const updateCircles = (value) => {
    const data = dataset.filter(
      (d) => d["Year"] >= value[0] && d["Year"] <= value[1]
    );
    setCurrentDataset(data);
  };

  return (
    <>
      <svg ref={svgRef}></svg>
      <div className="slider">
        <YearSlider onChange={updateCircles} />
      </div>
    </>
  );
};

export default UsMap;

const fillColorSelector = (data) => {
  if (data < 3) {
    return "#F5E4E4";
  } else if (data < 5) {
    return "#e6cac9";
  } else if (data < 7) {
    return "#d8b1af";
  } else if (data < 9) {
    return "#c89996";
  } else if (data < 11) {
    return "#b9817e";
  } else if (data < 13) {
    return "#a96967";
  } else if (data < 15) {
    return "#985150";
  } else if (data < 17) {
    return "#873a3a";
  } else if (data < 19) {
    return "#7a3c40";
  } else {
    return "#7a282e";
  }
};
