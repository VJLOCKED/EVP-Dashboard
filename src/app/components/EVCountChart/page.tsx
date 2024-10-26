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

interface EVCountChartData {
  'Model Year': string;
}

interface EVCountChartProps {
  data: EVCountChartData[];
}

export default function EVCountChart({ data }: EVCountChartProps) {
  // Type is now EVCountChartData[], so TypeScript knows 'Model Year' is a string
  const yearCounts = data.reduce<Record<string, number>>((acc, item) => {
    const year = item['Model Year'];
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
