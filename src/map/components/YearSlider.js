import React from "react";
import { Slider } from "antd";
import { dataset } from "../../data";

var minYear = Math.min(...dataset.map((data) => data["Year"]));
var maxYear = Math.max(...dataset.map((data) => data["Year"]));
const YearSlider = ({ onChange }) => {
  const createMarks = () => {
    var marks = {};
    const unique = dataset
      .filter(
        (element, index) =>
          dataset.findIndex((obj) => obj["Year"] === element["Year"]) === index
      )
      .sort((a, b) => {
        return a["Year"] - b["Year"];
      });
    for (var i = 0; i < unique.length; i++) {
      const d = unique[i]["Year"];
      marks[d] = i % 3 === 0 ? d.toString() : " ";
    }

    return marks;
  };

  const marks = createMarks();
  return (
    <Slider
      range
      min={minYear}
      max={maxYear}
      step={null}
      marks={marks}
      defaultValue={[minYear, maxYear]}
      onChange={onChange}
    />
  );
};

export default YearSlider;
