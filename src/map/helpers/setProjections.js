import * as d3 from "d3";

export const setProjections = function () {
  const projection = d3.geoMercator();
  projection.scale(500).translate([968 * 1.3, 480 * 1.1]);
  return projection;
};
