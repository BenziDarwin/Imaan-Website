import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FireStore from '../firebase/firestore';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90vw', md: '80vw' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // make the modal vertically scrollable
  maxHeight: { md: '80vh', xs: '100vh' },
};

interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface CreateInvoiceModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const validationSchema = Yup.object().shape({
  clientName: Yup.string().required('Client Name is required'),
  clientEmail: Yup.string().email('Invalid email address').required('Client Email is required'),
  clientPhone: Yup.string().required('Client Phone Number is required'),
  paid: Yup.number().positive('Amount Paid must be a positive number').required('Amount Paid is required'),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Item Name is required'),
      quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
      unitPrice: Yup.number().min(0, 'Unit Price must be a non-negative number').required('Unit Price is required'),
    })
  ),
});

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  open,
  setOpen,
}) => {
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, unitPrice: 0 }]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [paid, setPaid] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      items: [{ name: '', quantity: 1, unitPrice: 0 }],
      paid: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const invoiceData = {
        clientName: values.clientName,
        clientEmail: values.clientEmail,
        clientPhone: values.clientPhone,
        items: values.items,
        paid: values.paid,
        date: new Date(),
      };
      let firestore = new FireStore('Invoices');
      await firestore.addDocument(invoiceData);
      handleClose();
    },
  });

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = [...formik.values.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    formik.setFieldValue('items', updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Create Invoice
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Name"
                fullWidth
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                helperText={formik.touched.clientName && formik.errors.clientName}
                name="clientName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Email"
                fullWidth
                value={formik.values.clientEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.clientEmail && Boolean(formik.errors.clientEmail)}
                helperText={formik.touched.clientEmail && formik.errors.clientEmail}
                name="clientEmail"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Client Phone Number"
                fullWidth
                value={formik.values.clientPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.clientPhone && Boolean(formik.errors.clientPhone)}
                helperText={formik.touched.clientPhone && formik.errors.clientPhone}
                name="clientPhone"
              />
            </Grid>
            {formik.values.items.map((item: Item, index: number) => (
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
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    error={formik.touched.items?.[index]?.name && Boolean(formik.errors.items?.[index])}
                    helperText={formik.errors.items?.[index].toString()}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    required
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    error={formik.touched.items?.[index]?.quantity && Boolean(formik.errors.items?.[index])}
                    helperText={formik.errors.items?.[index].toString()}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    required
                    label="Unit Price"
                    type="number"
                    fullWidth
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                    error={formik.touched.items?.[index]?.unitPrice && Boolean(formik.errors.items?.[index])}
                    helperText={formik.errors.items?.[index].toString()}
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
                value={formik.values.paid}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.paid && Boolean(formik.errors.paid)}
                helperText={formik.touched.paid && formik.errors.paid}
                name="paid"
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
