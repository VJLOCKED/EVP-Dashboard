'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Define the types for props
interface EVCountChartProps {
  data: { [key: string]: any }[]; // Adjust type as necessary for your data structure
}

export default function EVCountChart({ data }: EVCountChartProps) {
  // Count the number of EVs per model year
  const yearCounts = data.reduce<Record<string, number>>((acc, item) => {
    const year = item['Model Year'] as string; // Ensure 'Model Year' is treated as string
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: Object.keys(yearCounts).sort(),
    datasets: [
      {
        label: 'Number of EVs',
        data: Object.keys(yearCounts)
          .sort()
          .map(year => yearCounts[year]),
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'EV Count by Model Year',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of EVs',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Model Year',
        },
      },
    },
  };

  // Render the Bar chart
  return <Bar data={chartData} options={options} />;
}
