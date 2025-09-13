"use client";
import { color } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({
  chartTitle,
  chartData,
  xAxisTitle,
  yAxisTitle,
  labels,
}) => {
  const [series, setSeries] = useState(chartData);
  useEffect(() => {
    setSeries(chartData);
  }, [chartData]);

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      title: {
        text: xAxisTitle,
        style: {
          color: "#aeb7c0",
        },
      },
      labels: {
        style: {
          colors: "#aeb7c0",
        },
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          color: "#aeb7c0",
        },
      },
      min: 0,
      max: chartData
        ? chartData
            .map((series) => Math.max(...series.data))
            .reduce((max, currentValue) => Math.max(max, currentValue), 0)
        : 100,
      labels: {
        style: {
          colors: "#aeb7c0",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm bg-[#171717] px-5 pb-5 pt-7.5 sm:px-7.5 xl:col-span-8 shadow-2xl">
      <div>
        <div>
          <h4 className="text-xl font-semibold text-gray-200 py-4">
            {chartTitle}
          </h4>
        </div>
        <div id="AreaChart" className="-ml-5 px-4">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
