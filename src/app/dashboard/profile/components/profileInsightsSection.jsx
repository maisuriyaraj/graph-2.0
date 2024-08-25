import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function ProfileInsightsSection() {

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Dog Product Categories',
    },
    plotOptions: {
      pie: {
        innerSize: '50%', // This makes it a donut chart
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Products',
        colorByPoint: true,
        data: [
          {
            name: 'Dog Food',
            y: 40,
          },
          {
            name: 'Grooming Products',
            y: 30,
          },
          {
            name: 'Toys',
            y: 20,
          },
          {
            name: 'Accessories',
            y: 10,
          },
        ],
      },
    ],
  };
  return (
    <div className="bg-white rounded-b-3xl p-2">
            <HighchartsReact highcharts={Highcharts} options={options} />

    </div>
  )
}
