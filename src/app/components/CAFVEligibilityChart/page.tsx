import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataItem {
  'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
}

interface CAFVEligibilityChartProps {
  data: DataItem[]; // Ensure this matches the data shape being passed
}

export default function CAFVEligibilityChart({ data }: CAFVEligibilityChartProps) {
  const eligibilityCounts = data.reduce((acc, item) => {
    const eligibility = item['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] || 'Unknown';
    if (eligibility.includes('Eligibility unknown')) {
      acc['Eligibility unknown'] = (acc['Eligibility unknown'] || 0) + 1;
    } else if (eligibility === 'Clean Alternative Fuel Vehicle Eligible') {
      acc['CAFV Eligible'] = (acc['CAFV Eligible'] || 0) + 1;
    } else {
      acc['Others'] = (acc['Others'] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(eligibilityCounts),
    datasets: [
      {
        data: Object.values(eligibilityCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'CAFV Eligibility Distribution',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

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
