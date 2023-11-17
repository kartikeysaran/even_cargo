import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      // If a Chart instance already exists, destroy it before creating a new one
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((entry) => entry.year),
        datasets: [
          {
            label: 'Number of Women Employed',
            data: data.map((entry) => entry.numWomenEmployed),
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust color as needed
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: data.map((entry) => entry.year),
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Women Employed',
            },
          },
        },
      },
    });

    // Cleanup: Destroy the Chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;