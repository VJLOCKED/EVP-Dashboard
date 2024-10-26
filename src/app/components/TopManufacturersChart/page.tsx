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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Define the types for props
interface TopManufacturersChartProps {
  data: { Make: string }[]; // Adjust the type based on your data structure
}

export default function TopManufacturersChart({ data }: TopManufacturersChartProps) {
  // Count occurrences of each manufacturer
  const manufacturerCounts = data.reduce<Record<string, number>>((acc, item) => {
    const make = item.Make || 'Unknown'; // Fallback to 'Unknown' if Make is undefined
    acc[make] = (acc[make] || 0) + 1;
    return acc;
  }, {});

  // Sort manufacturers and take the top 10
  const sortedManufacturers = Object.entries(manufacturerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Prepare chart data
  const chartData = {
    labels: sortedManufacturers.map(([make]) => make),
    datasets: [
      {
        label: 'Number of EVs',
        data: sortedManufacturers.map(([, count]) => count),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Horizontal bar chart
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top 10 EV Manufacturers',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of EVs',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Manufacturer',
        },
      },
    },
  };

  // Render the Bar chart
  return <Bar data={chartData} options={options} />;
}
