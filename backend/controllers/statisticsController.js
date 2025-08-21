import Order from "../models/orderModel.js";

// Récupérer les stats d'une boutique
export const getBoutiqueStatistics = async (req, res) => {
  try {
    const { boutiqueId } = req.params;

    // Récupérer toutes les commandes pour cette boutique
    const orders = await Order.find({
      "items.boutiqueId": boutiqueId,
    });

    if (!orders.length) {
      return res.json({
        message: "Aucune commande pour cette boutique",
        stats: {},
      });
    }

    // Chiffre d'affaires total
    const totalCA = orders.reduce((acc, order) => acc + order.total, 0);

    // Nombre de commandes
    const totalOrders = orders.length;

    // CA par semaine
    const caByWeek = {};
    const getWeekNumber = (dateStr) => {
      const date = new Date(dateStr);
      const oneJan = new Date(date.getFullYear(), 0, 1);
      const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
      return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
    };

    orders.forEach((order) => {
      const week = getWeekNumber(order.createdAt);
      caByWeek[week] = (caByWeek[week] || 0) + order.total;
    });

    res.json({
      totalCA,
      totalOrders,
      caByWeek,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des statistiques" });
  }
};
