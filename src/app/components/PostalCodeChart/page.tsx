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
  ChartOptions
} from 'chart.js'
import { motion } from 'framer-motion'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function PostalCodeChart({ data }) {
  const postalCodeCounts = data.reduce((acc, item) => {
    const postalCode = item['Postal Code'] || 'Unknown'
    acc[postalCode] = (acc[postalCode] || 0) + 1
    return acc
  }, {})

  const sortedPostalCodes = Object.entries(postalCodeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

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
  }

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
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Bar data={chartData} options={options} />
    </motion.div>
  )
}