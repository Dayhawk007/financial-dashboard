import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
  data: { _id: string; total: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      // Destroy existing Chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Create new Chart instance with labels outside the pie chart
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.map(item => `${item._id}: ₹${item.total.toFixed(2)}`),
            datasets: [
              {
                data: data.map(item => item.total),
                backgroundColor: [
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 159, 64, 0.7)',
                  'rgba(221, 46, 68, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                  'rgba(40, 167, 69, 0.7)',
                  'rgba(255, 193, 7, 0.7)',
                ],
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                hoverBorderColor: 'rgba(255, 255, 255, 1)',
              },
            ],
          },
          options: {
            cutout: '50%', // Adjust the cutout to create a smaller doughnut chart
            plugins: {
                tooltip:{
                    callbacks: {
                        label: function(context:any) {
                            let label = context.label || '';
                            if (label) {
                                label += '  ';
                            }
                            return label;
                        }
                    },
                    displayColors: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 0,
                    },
                    bodyFont: {
                        size: 12,
                    },
                    
                },
              legend: {
                position: 'right', 
                labels: {
                    boxWidth: 12, // Set the width of the legend box (squares)
                    usePointStyle: true, // Use square points instead of rectangles
                },
            },
        },
          },
        });

        // Draw text in the center of the doughnut
        const centerX = chartRef.current.width / 2;
        const centerY = chartRef.current.height / 2;
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Expenses', centerX, centerY);
      }
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
