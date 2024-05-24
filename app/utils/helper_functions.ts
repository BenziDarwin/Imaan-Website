import jsPDF from "jspdf";

export function generateInvoice(invoiceData: any): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Load logo image
    doc.addImage(invoiceData.logoUrl, "PNG", 15, 15, 50, 25);
  
    // Move text below the logo
    const logoHeight = 25;
    const textStartY = 15 + logoHeight + 10;
  
    // Company and Invoice Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(invoiceData.company.name, pageWidth / 2, textStartY, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(invoiceData.company.address, pageWidth / 2, textStartY + 10, {
      align: "center",
    });
    doc.text(
      `Phone: ${invoiceData.company.phone}`,
      pageWidth / 2,
      textStartY + 20,
      { align: "center" },
    );
    doc.text(
      `Email: ${invoiceData.company.email}`,
      pageWidth / 2,
      textStartY + 30,
      { align: "center" },
    );
  
    doc.setFontSize(10);
    doc.text(`Invoice ID#: ${invoiceData.invoiceNumber}`, 20, textStartY + 50);
    doc.text(`Date: ${invoiceData.date}`, 20, textStartY + 60);
    doc.text(`Bill To:`, 20, textStartY + 75);
    doc.text("Name: " +invoiceData.customer.name, 20, textStartY + 90);
    doc.text("Email:" + invoiceData.customer.address, 20, textStartY + 100);
    doc.text("Phone Number: " + invoiceData.customer.phone, 20, textStartY + 110);
  
    // Draw items table
    const finalY = drawTable(doc, invoiceData.items, textStartY + 120);
  
    // Calculate and display total
    const total: number = invoiceData.items.reduce(
      (acc: any, item: any) => acc + item.quantity * item.unitPrice,
      0,
    );
    const amountPaid = invoiceData.paid || 0;
    const remainingAmount = total - amountPaid;
  
    doc.setFontSize(12);
    doc.setFont("", "", "Bold");
    doc.text(`Total: ${total.toLocaleString()} UGX`, 20, finalY + 10);
    doc.text(`Amount Paid: ${amountPaid.toLocaleString()} UGX`, 20, finalY + 20);
    doc.text(
      `Remaining Amount: ${remainingAmount.toLocaleString()} UGX`,
      20,
      finalY + 30,
    );
  
    // Trigger the browser to download the PDF
    doc.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
  }

function drawTable(doc: jsPDF, items: any[], startY: number): number {
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Table headers
    doc.setDrawColor(0);
    doc.setFillColor(221, 221, 221); // Light grey fill
    const headerHeight = 10;
    doc.rect(20, startY, pageWidth - 40, headerHeight, "FD"); // 'FD' means fill and draw border
    doc.text("Description", 35, startY + 7);
    doc.text("Quantity", 100, startY + 7);
    doc.text("Price", 135, startY + 7);
    doc.text("Total", 165, startY + 7);
  
    startY += 10;
  
    // Table rows
    items.forEach((item) => {
      doc.setFillColor(255, 255, 255); // White fill for rows
      const cellHeight = Math.max(doc.getTextDimensions(item.name).h, 10);
      doc.rect(20, startY, pageWidth - 40, cellHeight, "FD"); // Draw and fill row background
      doc.textWithLink(item.name, 35, startY + 7, { maxWidth: 35 });
      doc.text(item.quantity.toLocaleString(), 100, startY + 7, {
        align: "left",
      });
      doc.text(`${item.unitPrice.toLocaleString()} UGX`, 135, startY + 7, {
        align: "left",
      });
      doc.text(
        `${(item.quantity * item.unitPrice).toLocaleString()} UGX`,
        165,
        startY + 7,
        { align: "left" },
      );
      startY += 10;
    });
  
    return startY; // Return the Y position after the table
  }

export const getPDFLink = async (invoice: any) => {
    const timestamp = invoice.date;
    const millisecondsFromSeconds = timestamp.seconds * 1000;
    const millisecondsFromNanoseconds = timestamp.nanoseconds / 1000000;
    const totalMilliseconds =
      millisecondsFromSeconds + millisecondsFromNanoseconds;
    const date = new Date(totalMilliseconds);
    for (let x = 0; x < invoice.items.length; x++) {
      invoice.items[x].item_total =
        invoice.items[x].quantity * invoice.items[x].unitPrice;
    }
    const body = {
      ...invoice,
      line_items: invoice.items,
      invoice_date: date.toLocaleString(),
    };
  
    // Example usage
    const sampleInvoiceData = {
      logoUrl: "./images/logo.jpg", // Replace with actual logo URL
      company: {
        name: "Imaan Computer World",
        address: "Kabaka Kintu House, Kampala Road",
        phone: "(256) 757-443046",
        email: "info@imaancomputerworld.com",
      },
      invoiceNumber: body.id,
      date: body.invoice_date,
      paid: body.paid,
      customer: {
        name: body.clientName,
        address: body.clientEmail,
        phone: body.clientPhone
      },
      items: body.line_items,
    };
  
    generateInvoice(sampleInvoiceData);
  };