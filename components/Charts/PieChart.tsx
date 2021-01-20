import ReactEcharts from 'echarts-for-react';


type PieChartProps = {
  protein: number,
  carb: number,
  fat: number
}
export default function PieChart(props: PieChartProps) {
  const {protein, carb, fat} = props
  const sum = 4 * protein + 4 * carb + 9 * fat
  if (sum ===0)
    return <></>
  const data = [
    {value: 4 * protein / sum, name: 'Protein'},
    {value: 4 * carb / sum, name: 'Carb'},
    {value: 9 * fat / sum, name: 'Fat'},
  ].filter(x => x.value !== 0)
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
      bottom: 10,
      left: 'center',
      data: ['Protein', 'Carb', 'Fat'],
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: data,
        color: ['#323631', '#716551', '#D4B283'],
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
              position: 'inner',

              formatter: '{b} : {d}%'
            },
            labelLine: {show: false}
          }
        }
      }
    ],
  };


  return (
    <ReactEcharts option={option}/>
  );

}