'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface EVTypeByYearChartData {
  'Model Year': string;
  'Electric Vehicle Type': string;
}

interface EVTypeByYearChartProps {
  data: EVTypeByYearChartData[];
}

export default function EVTypeByYearChart({ data }: EVTypeByYearChartProps) {
  const evTypesByYear = data.reduce<Record<string, Record<string, number>>>((acc, item) => {
    const year = item['Model Year'];
    const type = item['Electric Vehicle Type'];
    if (!acc[year]) acc[year] = {};
    acc[year][type] = (acc[year][type] || 0) + 1;
    return acc;
  }, {});
  
  // Prepare years and electric vehicle types
  const years = Object.keys(evTypesByYear).sort();
  const evTypes = Array.from(new Set(data.map(item => item['Electric Vehicle Type'] as string)));

  // Prepare chart data
  const chartData = {
    labels: years,
    datasets: evTypes.map((type, index) => ({
      label: type,
      data: years.map(year => evTypesByYear[year][type] || 0),
      borderColor: `hsl(${index * 137.5}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 137.5}, 70%, 50%, 0.5)`,
      tension: 0.1,
    })),
  };

  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'EV Types by Year',
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

  // Render the Line chart
  return <Line data={chartData} options={options} />;
}
