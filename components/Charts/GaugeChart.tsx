import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default function Gauge (props) {
  const option = {
      toolbox: {
        show: false,
      },
      textStyle: {
        fontFamily: "Quicksand",
      },
      series: [
        {
          type: 'gauge',
          detail: {
            fontSize: 20,
            formatter: 'Total {value} kCal',
            offsetCenter: [0, 120],
          },
          title:{
            show: true,
          },
          radius: "85%",
          min: props.min,
          max: props.max,
          axisLine: {
            lineStyle: {
              color: [[0.7, '#323631'], [0.85, '#716551'], [1, '#D4B283']],
              width: 10,
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 5
            }
          },
          splitNumber: 2,
          splitLine: {
            show: false,
            length: 13,
          },
          axisTick: {
            show: false,
          },
          pointer: {
            length: 80,
            width: 3,
          },
          data: [{value: props.value}],
        }
      ]
    };

  return (
      <ReactEcharts
        option={option}
        className='calories_gauge' />);
}