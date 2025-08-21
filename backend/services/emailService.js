import nodemailer from "nodemailer";
import { generateInvoice } from "../Utility/Invoice.js";
import fs from "fs";
import path from "path";

const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

export async function sendOrderConfirmation(order) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Génération du reçu
    const pdfPath = await generateInvoice(order);

    const mailOptions = {
      from: `"WAZO" <${process.env.EMAIL_USER}>`,
      to: order.buyer.mail,
      subject: `Confirmation de votre commande ${order._id}`,
      html: `
        <p>Bonjour ${order.buyer.prenom},</p>
        <p>Merci pour votre commande <strong>${order._id}</strong>.</p>
        <p>Montant total: <strong>${order.total} FCFA</strong></p>
        <p>Vous trouverez en pièce jointe le reçu de votre commande.</p>
        <p>Le vendeur vous contactera sous peu pour organiser la livraison.</p>
        <p>Merci pour votre confiance. <br/>Équipe WAZO</p>
      `,
      attachments: [
        {
          filename: `recu-${order._id}.pdf`,
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    fs.unlink(pdfPath, (err) => {
      if (err) console.error("Erreur suppression PDF:", err);
    });

    console.log("Mail avec reçu envoyé à", order.buyer.mail);
  } catch (err) {
    console.error("Erreur envoi mail:", err);
  }
}

export async function sendOwnerNotification(order, boutique) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const boutiqueData = order.boutiques.find(
      (b) => b.boutiqueId.toString() === boutique._id.toString()
    );

    // Contenu du mail
    const mailOptions = {
      from: `"WAZO" <${process.env.EMAIL_USER}>`,
      to: boutique.mail,
      subject: `Nouvelle commande reçue ${order._id}`,
      html: `
        <p>Bonjour ${boutique.name},</p>
        <p>Vous avez reçu une nouvelle commande <strong>${
          order._id
        }</strong>.</p>
        <p>Montant total : <strong>${order.total} FCFA</strong></p>
        <p>Liste des produits :</p>
        <ul>
          ${boutiqueData.produits
            .filter(
              (item) => item.boutiqueId.toString() === boutique._id.toString()
            )
            .map(
              (item) =>
                `<li>${item.name} x ${item.quantity} - ${
                  item.prix * item.quantity
                } FCFA</li>`
            )
            .join("")}
        </ul>
        <p>Contact du client : ${order.buyer.nom} ${order.buyer.prenom} (${
        order.buyer.numero
      })</p>
       <p><strong>Veuillez contacter le client pour organiser la livraison.</strong></p>
        <p>Merci,<br/>Équipe WAZO</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`E-mail envoyé au propriétaire ${boutique.mail}`);
  } catch (err) {
    console.error("Erreur envoi mail propriétaire :", err);
  }
}
