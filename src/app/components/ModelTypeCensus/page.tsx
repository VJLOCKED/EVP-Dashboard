'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { motion } from 'framer-motion'

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend)

// Define the types for props
interface ModelTypeCensusProps {
  data: { [key: string]: any }[]; // Adjust the type based on your data structure
}

export default function ModelTypeCensus({ data }: ModelTypeCensusProps) {
  // Count occurrences of each model type
  const modelTypeCounts = data.reduce<Record<string, number>>((acc, item) => {
    const modelType = item['Model'] || 'Unknown'; // Ensure fallback to 'Unknown'
    acc[modelType] = (acc[modelType] || 0) + 1;
    return acc;
  }, {});

  // Sort model types by count
  const sortedModelTypes = Object.entries(modelTypeCounts).sort((a, b) => b[1] - a[1]);

  // Get top three model types and others
  const topThreeModelTypes = sortedModelTypes.slice(0, 3);
  const otherCount = sortedModelTypes.slice(3).reduce((sum, [, count]) => sum + count, 0);

  // Prepare chart data
  const chartData = {
    labels: [...topThreeModelTypes.map(([type]) => type), 'Others'],
    datasets: [
      {
        data: [...topThreeModelTypes.map(([, count]) => count), otherCount],
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
        text: 'Top 3 Model Types',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  // Render the Pie chart within a motion div for animation
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Pie data={chartData} options={options} />
    </motion.div>
  );
}
