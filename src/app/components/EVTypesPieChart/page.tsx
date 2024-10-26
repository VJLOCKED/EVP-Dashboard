'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

// Define the types for props
interface EVTypesPieChartProps {
  data: { [key: string]: any }[]; // Adjust the type based on your data structure
}

export default function EVTypesPieChart({ data }: EVTypesPieChartProps) {
  // Count the number of each EV type
  const typeCounts = data.reduce<Record<string, number>>((acc, item) => {
    const type = item['Electric Vehicle Type'] as string; // Ensure 'Electric Vehicle Type' is treated as string
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'EV Types Distribution',
        font: {
          size: 16,
        },
      },
    },
  };

  // Render the Pie chart
  return <Pie data={chartData} options={options} />;
}
