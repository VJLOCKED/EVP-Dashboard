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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function TopManufacturersChart({ data }) {
  const manufacturerCounts = data.reduce((acc, item) => {
    const make = item.Make
    acc[make] = (acc[make] || 0) + 1
    return acc
  }, {})

  const sortedManufacturers = Object.entries(manufacturerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

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
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
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
  }

  return <Bar data={chartData} options={options} />
}