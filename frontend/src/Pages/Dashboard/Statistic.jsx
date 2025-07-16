import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ordersMock = [
  { id: "o1", total: 10000, date: "2025-07-10" },
  { id: "o2", total: 15000, date: "2025-07-12" },
  { id: "o3", total: 20000, date: "2025-07-18" },
  { id: "o4", total: 5000, date: "2025-07-20" },
  { id: "o5", total: 12000, date: "2025-07-21" },
];

const getWeekNumber = (dateStr) => {
  const date = new Date(dateStr);
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
};

const Statistic = () => {
  // Total CA
  const totalCA = ordersMock.reduce((acc, o) => acc + o.total, 0);

  // Nombre commandes
  const totalOrders = ordersMock.length;

  // CA par semaine
  const caByWeek = {};
  ordersMock.forEach((order) => {
    const week = getWeekNumber(order.date);
    caByWeek[week] = (caByWeek[week] || 0) + order.total;
  });

  // Préparer données pour Chart.js
  const weeks = Object.keys(caByWeek).sort((a, b) => a - b);
  const caValues = weeks.map((w) => caByWeek[w]);

  // Performance : comparer dernière semaine à la précédente
  const maxWeek = Math.max(...weeks.map(Number));
  const prevWeek = maxWeek - 1;
  const currentWeekCA = caByWeek[maxWeek] || 0;
  const prevWeekCA = caByWeek[prevWeek] || 0;
  const performance =
    prevWeekCA === 0 ? 100 : ((currentWeekCA - prevWeekCA) / prevWeekCA) * 100;

  const data = {
    labels: weeks.map((w) => `Semaine ${w}`),
    datasets: [
      {
        label: "Chiffre d'affaires (FCFA)",
        data: caValues,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // bleu tailwind
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Ventes par semaine",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Statistiques Vendeur</h2>

      <div>
        <strong>Chiffre d'affaires total :</strong> {totalCA.toLocaleString()}{" "}
        FCFA
      </div>

      <div>
        <strong>Nombre de commandes :</strong> {totalOrders}
      </div>

      <div>
        <strong>CA semaine {maxWeek} :</strong> {currentWeekCA.toLocaleString()}{" "}
        FCFA
      </div>

      <div>
        <strong>Performance :</strong>{" "}
        <span className={performance >= 0 ? "text-green-600" : "text-red-600"}>
          {performance.toFixed(2)}% {performance >= 0 ? "▲" : "▼"}
        </span>
      </div>

      <Bar options={options} data={data} />
    </div>
  );
};

export default Statistic;
