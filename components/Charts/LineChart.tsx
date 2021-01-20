import React from "react";
import ReactEcharts from "echarts-for-react";

export default function LineChart (props) {
  const option = {

    grid: {
      bottom: 80
    },
    color: ['#EDB471', '#616B66', '#82765F'],
    textStyle: {
      fontFamily: "Quicksand",
    },
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#716551'
        }
      }
    },
    legend: {
      show: false,
      data: [props.nutrientName],
      left: 10
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 65,
        end: 85,
        fillerColor: 'rgba(113,101,81,0.2)',
      },
      {
        type: 'inside',
        realtime: true,
        start: 65,
        end: 85,

      }
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {onZero: false},
        data: props.data.dates,
      }
    ],
    yAxis: [
      {
        name: props.nutrientName,
        type: 'value',
      }
    ],
    series: [
      {
        name: props.nutrientName,
        type: 'line',
        animation: false,
        areaStyle: {},
        lineStyle: {
          width: 1
        },
        data: props.data.params
      }
    ]
  };

  return (<ReactEcharts option={option} className="calories-line"/>)
}