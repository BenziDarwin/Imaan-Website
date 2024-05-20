"use client";

import { Add, Delete, Print, RemoveRedEye } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import CreateInvoiceModal from "../components/CreateInvoiceModal";
import FireStore from "../firebase/firestore";

function generateInvoice(invoiceData: any): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Load logo image
  doc.addImage(invoiceData.logoUrl, "PNG", 15, 15, 50, 50);

  // Move text below the logo
  const logoHeight = 50;
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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "clientName",
    headerName: "To",
    width: 150,
  },
  {
    field: "clientPhone",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "clientEmail",
    headerName: "Email Address",
    width: 110,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 110,
  },
  {
    field: "balance",
    headerName: "Pending Balance",
    width: 110,
    valueGetter: (value, row) => {
      const total = calculateTotal(row.items);
      return total - row.paid;
    },
  },
  {
    field: "items",
    headerName: "Items",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (value, row) =>
      row.items
        .map((item: any) => `${item.name} (x${item.quantity})`)
        .join(", "),
  },
  {
    field: "date",
    headerName: "Date",
    width: 110,
    renderCell: (params) => {
      const timestamp = params.row.date;
      const millisecondsFromSeconds = timestamp.seconds * 1000;
      const millisecondsFromNanoseconds = timestamp.nanoseconds / 1000000;
      const totalMilliseconds =
        millisecondsFromSeconds + millisecondsFromNanoseconds;
      const date = new Date(totalMilliseconds);
      return new Date(date).toLocaleString();
    },
  },
  {
    field: "Options",
    headerName: "Options",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    renderCell: (param) => {
      return (
        <>
          <Grid container>
            <Grid item xs={4}>
              <IconButton
                onClick={() => {
                  let fireStore = new FireStore("Invoices");
                  fireStore.deleteDocument(param.row.id);
                  window.location.reload();
                }}
              >
                <Delete />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton>
                <RemoveRedEye />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton onClick={() => getPDFLink(param.row)}>
                <Print />
              </IconButton>
            </Grid>
          </Grid>
        </>
      );
    },
    width: 110,
  },
];

const calculateTotal = (items: any[]): number =>
  items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

const getPDFLink = async (invoice: any) => {
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

function AdminPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [createInvoiceModal, setCreateInvoiceModal] =
    React.useState<boolean>(false);
  const handleCreateOpen = () => setCreateInvoiceModal(true);

  useEffect(() => {
    (async () => {
      let fireStore = new FireStore("Invoices");
      let data: any[] = await fireStore.getDocuments();
      if (data) {
        setRows(data);
      }
    })();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 px-5 pt-24">
      <Grid container>
        <Grid item md={10} xs={12}>
          <Typography variant="h4">Recent Invoices</Typography>
        </Grid>
        <Grid
          item
          justifyContent="flex-end"
          md={2}
          xs={12}
          className="lg:p-0 p-5"
        >
          <Button onClick={handleCreateOpen} variant="contained" size="small">
            <Add /> &nbsp;Create Invoice
          </Button>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
          />
        </Grid>
        <CreateInvoiceModal
          open={createInvoiceModal}
          setOpen={setCreateInvoiceModal}
        />
      </Grid>
    </main>
  );
}

export default AdminPage;
