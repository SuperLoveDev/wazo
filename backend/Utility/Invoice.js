import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

export function generateInvoice(order) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(tmpDir, `recu-${order._id}.pdf`);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text("Reçu de commande", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Commande ID: ${order._id}`);
    doc.text(`Client: ${order.buyer.nom} ${order.buyer.prenom}`);
    doc.text(`Téléphone: ${order.buyer.numero}`);
    doc.text(`Email: ${order.buyer.mail}`);
    doc.text(`Adresse: ${order.buyer.adressedelivraison}`);
    doc.moveDown();

    // Produits
    doc.fontSize(14).text("Produits :", { underline: true });
    order.items.forEach((item) => {
      doc
        .fontSize(12)
        .text(
          `${item.name} x${item.quantity} - ${item.prix * item.quantity} FCFA`
        );
    });
    doc.moveDown();

    //  Total
    doc.text(`Sous-total : ${order.subtotal} FCFA`);
    doc.text(`Livraison : ${order.livraison} FCFA`);
    doc.fontSize(14).text(`Total : ${order.total} FCFA`, { bold: true });

    doc.end();

    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
}
