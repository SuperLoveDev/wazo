import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../../Context/ShopContext";
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

const Statistic = () => {
  const { selectedBoutique } = useContext(ShopContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedBoutique?._id) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/statistics/${
            selectedBoutique._id
          }`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Erreur chargement statistiques :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [selectedBoutique]);

  if (loading) return <p>Chargement...</p>;
  if (!stats) return <p>Aucune statistique disponible</p>;

  const weeks = Object.keys(stats.caByWeek || {}).sort((a, b) => a - b);
  const caValues = weeks.map((w) => stats.caByWeek[w]);
  const maxWeek = Math.max(...weeks.map(Number));
  const prevWeek = maxWeek - 1;
  const currentWeekCA = stats.caByWeek[maxWeek] || 0;
  const prevWeekCA = stats.caByWeek[prevWeek] || 0;
  const performance =
    prevWeekCA === 0 ? 100 : ((currentWeekCA - prevWeekCA) / prevWeekCA) * 100;

  const data = {
    labels: weeks.map((w) => `Semaine ${w}`),
    datasets: [
      {
        label: "Chiffre d'affaires (FCFA)",
        data: caValues,
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Ventes par semaine" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Statistiques Vendeur</h2>
      <div>
        <strong>Chiffre d'affaires total :</strong>{" "}
        {stats.totalCA.toLocaleString()} FCFA
      </div>
      <div>
        <strong>Nombre de commandes :</strong> {stats.totalOrders}
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
