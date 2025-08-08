import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// In PlayerStatsModal.jsx, after the Table
const chartData = {
  labels: weeklyStats.map(stat => `Week ${stat.week}`),
  datasets: [
    {
      label: `${player?.position === 'QB' ? 'Passing Yards' : 'Key Stat'}`,
      data: weeklyStats.map(stat => stat[player?.position === 'QB' ? 'passingYards' : player?.position === 'RB' ? 'rushingYards' : 'receivingYards']),
      borderColor: 'blue',
      fill: false,
    },
  ],
};

// Add to JSX
<Line data={chartData} />
