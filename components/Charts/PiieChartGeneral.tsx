import ReactEcharts from 'echarts-for-react';
import {value} from "popmotion";


type PieChartGeneralProps = {
  names: Array<string>,
  values: Array<number>
}
export default function PieChartGeneral(props: PieChartGeneralProps) {
  let {names, values} = props
  const data = names.map((e, idx) => {
    return {value: values[idx], name: e};
  })
  console.log(names, values);
  const option = {
    textStyle: {
      fontFamily: "Quicksand, non-serif",
      fontWeight: 500
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {d}%',
    },
    legend: {
      // orient: 'vertical',
      // top: 'middle',
      bottom: -20,
      left: 'center',
      data: names,
    },
    series: [
      {
        type: 'pie',
        radius: '45%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: data,
        color: ['#323631', '#716551', '#D4B283', '#EFD3A7', '#908B72', '#616B66', '#595E57', '#373831'],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }, itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outer',

              formatter: '{b} : {d}%'
            },
            labelLine: {show: false}
          }
        }
      }
    ],
  };


  return (
    <ReactEcharts style={{height: "500px"}} option={option}/>
  );

}