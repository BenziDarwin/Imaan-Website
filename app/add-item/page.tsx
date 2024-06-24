"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Card,
  CardMedia
} from '@mui/material';

interface ItemFormValues {
  imgFile: File | null;
  name: string;
  price: string;
  description: string;
}

const validationSchema = Yup.object({
  imgFile: Yup.mixed().required('Image is required'),
  name: Yup.string().min(2, 'Name should be of minimum 2 characters length').required('Name is required'),
  price: Yup.string().required('Price is required'),
  description: Yup.string().min(10, 'Description should be of minimum 10 characters length').required('Description is required'),
});

const AddItemForm: React.FC = () => {
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  
  const formik = useFormik<ItemFormValues>({
    initialValues: {
      imgFile: null,
      name: '',
      price: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('imgFile', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add New Item
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth error={formik.touched.imgFile && Boolean(formik.errors.imgFile)}>
          <InputLabel htmlFor="img-file">Select Image</InputLabel>
          <Input
            id="img-file"
            type="file"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            error={formik.touched.imgFile && Boolean(formik.errors.imgFile)}
            inputProps={{ accept: 'image/*' }}
          />
          <FormHelperText>{formik.touched.imgFile && formik.errors.imgFile}</FormHelperText>
        </FormControl>
        {previewImg && (
          <Card sx={{ maxWidth: 300, mt: 2 }}>
            <CardMedia
              component="img"
              height="200"
              image={previewImg}
              alt="Selected Image"
            />
          </Card>
        )}
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          margin="normal"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          multiline
          rows={4}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={formik.isSubmitting}>
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default AddItemForm;
