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

export default function CountyCityChart({ data }) {
  const countyCounts = data.reduce((acc, item) => {
    const county = item['County'] || 'Unknown'
    acc[county] = (acc[county] || 0) + 1
    return acc
  }, {})

  const cityCounts = data.reduce((acc, item) => {
    const city = item['City'] || 'Unknown'
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})

  const topCounties = Object.entries(countyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
  
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const countyOthers = Object.values(countyCounts).reduce((sum, count) => sum + count, 0) - topCounties.reduce((sum, [, count]) => sum + count, 0)
  const cityOthers = Object.values(cityCounts).reduce((sum, count) => sum + count, 0) - topCities.reduce((sum, [, count]) => sum + count, 0)

  const chartData = {
    labels: ['Counties', 'Cities'],
    datasets: [
      ...topCounties.map(([county, count], index) => ({
        label: county,
        data: [count, 0],
        backgroundColor: `rgba(75, ${100 + index * 50}, 192, 0.8)`,
      })),
      {
        label: 'Other Counties',
        data: [countyOthers, 0],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
      },
      ...topCities.map(([city, count], index) => ({
        label: city,
        data: [0, count],
        backgroundColor: `rgba(255, ${100 + index * 50}, 132, 0.8)`,
      })),
      {
        label: 'Other Cities',
        data: [0, cityOthers],
        backgroundColor: 'rgba(150, 150, 150, 0.8)',
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Top 3 Counties and Cities',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of EVs',
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