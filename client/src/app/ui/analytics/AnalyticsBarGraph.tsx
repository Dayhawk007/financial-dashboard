import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';


const BarGraph = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [intervalOption, setIntervalOption] = useState('weekly');
  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      // Group data based on the selected interval (weekly, monthly, yearly)
      const groupedData = groupDataByInterval(data, intervalOption);
  
      // Extract labels and datasets for Chart.js
      const labels = groupedData.map(item => getLabel(item, intervalOption));
  
      // Group income and expense data by the same year or month
      const groupedIncomeData = groupedData.reduce((result, item) => {
        const key = intervalOption === 'weekly' ? `W${item.week}` : intervalOption === 'monthly' ? `M${item.month}` : item.year.toString();
        if (!result[key]) {
          result[key] = { income: 0, expense: 0 };
        }
        result[key].income += item.income || 0;
        result[key].expense += item.expense || 0;
        return result;
      }, {});
  
      const groupedIncomeValues = Object.values(groupedIncomeData);
  
      // Create new Chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Income',
              data: groupedIncomeValues.map(item => item.income),
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderRadius: 2, // Rounded corners
              barThickness: 10, // Thin bars
              group: 1, // Group bars by the same year or month
            },
            {
              label: 'Expense',
              data: groupedIncomeValues.map(item => item.expense),
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderRadius: 2, // Rounded corners
              barThickness: 10, // Thin bars
              group: 2, // Group bars by the same year or month
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true, // Start y-axis at 0
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom', // Position of the legend
            },
          },
          layout: {
            padding: {
              left: 30,
              right: 30,
              top: 10,
              bottom: 30,
            },
          },
          responsive: true,
        },
      });
  
      // Cleanup function
      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [data, intervalOption]);
  
    const handleIntervalChange = (event) => {
      setIntervalOption(event.target.value);
    };
  
    return (
      <div>
        <div>
          <label>Interval :</label>
          <select value={intervalOption} className='bg-white text-sm px-2' onChange={handleIntervalChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <canvas ref={chartRef} style={{ width: '100%', height: '250px', margin: 'auto' }} />
      </div>
    );
  };

// Helper function to group data based on selected interval
const groupDataByInterval = (data:any, intervalOption:any) => {
    console.log(data);
  const groupedData = data[0].reduce((result:any, item:any) => {
    //console.log(item);
    const key = getKey(item, intervalOption);
    if (!result[key]) {
      result[key] = {
        total: 0,
        count: 0,
        year: item.year,
        month: item.month,
        week: item.week,
        income: 0,
        expense: 0,
      };
    }

    result[key].total += item.total;
    result[key].count += item.count;
    result[key].income += item.income || 0;
    result[key].expense += item.expense || 0;

    return result;
  }, {});

 // console.log(groupedData);

  return Object.values(groupedData);
};

// Helper function to get the key based on the selected interval
const getKey = (item:any, intervalOption:any) => {
    console.log(item);
  switch (intervalOption) {
    case 'weekly':
      return `${item["year"]}-${item["week"]}`;
    case 'monthly':
      return `${item.year}-${item.month}`;
    case 'yearly':
      return `${item.year}`;
    default:
      return '';
  }
};

// Helper function to get the label based on the selected interval
const getLabel = (item:any, intervalOption:any) => {
  switch (intervalOption) {
    case 'weekly':
      return `Week ${item.week}, ${item.year}`;
    case 'monthly':
      return `${getMonthName(item.month)}, ${item.year}`;
    case 'yearly':
      return `${item.year}`;
    default:
      return '';
  }
};

// Helper function to get the month name based on the month number
const getMonthName = (month:number) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return monthNames[month - 1];
};

export default BarGraph;
