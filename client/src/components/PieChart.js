import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 400, height = 400 }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    if (data && d3Ref.current) {
      // Remove any existing chart
      d3.select(d3Ref.current).selectAll("*").remove();

      // Set up the color scale
      const color = d3.scaleOrdinal(d3.schemeSet1);

      // Set up the pie layout
      const pie = d3
        .pie()
        .value((d) => d.value)
        .sort(null)
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2);

      // Set up the arc generator
      const radius = Math.min(width, height) / 2;
      const arc = d3
        .arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius);

      // Create the SVG element
      const svg = d3
        .select(d3Ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Create a group to center the pie chart
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Create the chart
      g.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.label));

      // Create the legend
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width / 3.5},${height - 70})`);

      legend
        .selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", function (d, i) {
          return "translate(0," + (i * 20 - data.length * 10) + ")";
        })
        .attr("text-anchor", "start")
        .text(function (d) {
          return "• " + d.data.label;
        })
        .attr("fill", function (d) {
          return color(d.data.label);
        });
    }
  }, [data]);

  return <div ref={d3Ref} />;
};

export default PieChart;
