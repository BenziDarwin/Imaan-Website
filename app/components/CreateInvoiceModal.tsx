"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, InputLabel, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FireStore from "../firebase/firestore";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", md: "80vw" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // make the modal vertically scrollable
  maxHeight: { md: "80vh", xs: "100vh" },
};

interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
  [key: string]: string | number;
}

interface CreateInvoiceModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  open,
  setOpen,
}) => {
  const handleClose = () => setOpen(false);
  const [items, setItems] = React.useState<Item[]>([
    { name: "", quantity: 1, unitPrice: 0 },
  ]);
  const [clientName, setClientName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [clientPhone, setClientPhone] = React.useState("");
  const [paid, setPaid] = React.useState<number>(0);

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string,
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = parseFloat(value) || value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, unitPrice: 0 }]);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const invoiceData = {
      clientName,
      clientEmail,
      clientPhone,
      items,
      paid,
      date: new Date(),
    };
    let firestore = new FireStore("Invoices");
    await firestore.addDocument(invoiceData);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Create Invoice
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Name"
                fullWidth
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Email"
                fullWidth
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Phone Number"
                fullWidth
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </Grid>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <InputLabel>Item</InputLabel>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    required
                    label="Item Name"
                    fullWidth
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    required
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={item.quantity.toString()}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    required
                    label="Unit Price"
                    type="number"
                    fullWidth
                    value={item.unitPrice.toString()}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => deleteItem(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={addItem}>
                Add Item
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Amount Paid"
                type="number"
                fullWidth
                value={paid}
                onChange={(e) => setPaid(parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Invoice
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateInvoiceModal;
