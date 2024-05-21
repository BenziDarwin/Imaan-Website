"use client";

import { Add, Delete, Print, RemoveRedEye } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CreateInvoiceModal from "../components/CreateInvoiceModal";
import FireStore from "../firebase/firestore";
import { getPDFLink } from "../utils/helper_functions";

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
