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
import { motion } from 'framer-motion'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface PostalCodeData {
  'Postal Code': string;
}

interface PostalCodeChartProps {
  data: PostalCodeData[];
}

export default function PostalCodeChart({ data }: PostalCodeChartProps) {
  // Count occurrences of each postal code
  const postalCodeCounts = data.reduce<Record<string, number>>((acc, item) => {
    const postalCode = item["Postal Code"] || "Unknown"; // Fallback to 'Unknown'
    acc[postalCode] = (acc[postalCode] || 0) + 1;
    return acc;
  }, {});

  // Sort postal codes and take the top 10
  const sortedPostalCodes = Object.entries(postalCodeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Prepare chart data
  const chartData = {
    labels: sortedPostalCodes.map(([code]) => code),
    datasets: [
      {
        label: 'Number of EVs',
        data: sortedPostalCodes.map(([, count]) => count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Top 10 Postal Codes',
        font: {
          size: 16,
          weight: 'bold',
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
          text: 'Postal Code',
        },
      },
    },
  };

  // Render the Bar chart within a motion div for animation
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  );
}
