import React, { useEffect, useRef } from 'react';

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    import('apexcharts').then((ApexCharts) => {
      if (typeof window !== 'undefined') {
        const options = {
          series: [
            {
              name: 'series1',
              data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
              name: 'series2',
              data: [11, 32, 45, 32, 34, 52, 41],
            },
          ],
          chart: {
            height: 350,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'datetime',
            categories: [
              '2018-09-19T00:00:00.000Z',
              '2018-09-19T01:30:00.000Z',
              '2018-09-19T02:30:00.000Z',
              '2018-09-19T03:30:00.000Z',
              '2018-09-19T04:30:00.000Z',
              '2018-09-19T05:30:00.000Z',
              '2018-09-19T06:30:00.000Z',
            ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        };

        const chart = ApexCharts(chartRef.current, options);
        chart.render();

        // Clean up the chart when the component unmounts
        return () => {
          chart.destroy();
        };
      }
    });
  }, []);

  return <div id="chart" ref={chartRef} />;
};

export default ChartComponent;
