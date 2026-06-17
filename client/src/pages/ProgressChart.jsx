import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProgressChart() {
  const workouts =
    JSON.parse(localStorage.getItem("completedWorkouts")) || [];

  const data = {
    labels: workouts.map((_, index) => `Тренування ${index + 1}`),
    datasets: [
      {
        label: "Кількість завершених тренувань",
        data: workouts.map((_, index) => index + 1),
        borderColor: "#2e7d32",
        backgroundColor: "#66bb6a",
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <h1>Графік прогресу</h1>

      <div className="details-card">
        <Line data={data} />
      </div>
    </div>
  );
}

export default ProgressChart;