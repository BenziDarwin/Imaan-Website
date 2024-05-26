"use client";

import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const SideFilter = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sx={{ maxWidth: { xs: '100%', md: 'lg' }, mx: { xs: 'auto', md: 'unset' } }}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            bgcolor: 'white',
            p: 3,
            width: '100%',
            maxWidth: 'sm',
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Your Workspace
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="from-label">Min</InputLabel>
              <Select
                labelId="from-label"
                id="from-select"
                label="Min"
                IconComponent={ExpandMoreIcon}
                defaultValue=""
              >
                <MenuItem value="min">Min</MenuItem>
                <MenuItem value="option 1">Option 1</MenuItem>
                <MenuItem value="option 2">Option 2</MenuItem>
                <MenuItem value="option 3">Option 3</MenuItem>
                <MenuItem value="option 4">Option 4</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">to</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="to-label">Max</InputLabel>
              <Select
                labelId="to-label"
                id="to-select"
                label="Max"
                IconComponent={ExpandMoreIcon}
                defaultValue=""
              >
                <MenuItem value="max">Max</MenuItem>
                <MenuItem value="option 1">Option 1</MenuItem>
                <MenuItem value="option 2">Option 2</MenuItem>
                <MenuItem value="option 3">Option 3</MenuItem>
                <MenuItem value="option 4">Option 4</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
            <InputLabel id="zipcode-label">Zip Code</InputLabel>
            <Select
              labelId="zipcode-label"
              id="zipcode-select"
              label="Zip Code"
              IconComponent={ExpandMoreIcon}
              defaultValue=""
            >
              <MenuItem value="write code">Write code</MenuItem>
              <MenuItem value="option 1">Option 1</MenuItem>
              <MenuItem value="option 2">Option 2</MenuItem>
              <MenuItem value="option 3">Option 3</MenuItem>
              <MenuItem value="option 4">Option 4</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{ borderRadius: 50, py: 1.5 }}
          >
            Search
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            bgcolor: 'white',
            p: 3,
            width: '100%',
            maxWidth: 'sm',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 1, borderColor: 'grey.200', pb: 1, mb: 3 }}>
            <Typography variant="body1">Filter Plans</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ cursor: 'pointer', transition: 'color 0.5s', '&:hover': { color: 'primary.main' } }}
            >
              RESET
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Availability
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="Option 1"
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Option 2"
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Option 3"
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            />
          </Box>

          <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 3 }}>
            <InputLabel id="offer-label">Offer</InputLabel>
            <Select
              labelId="offer-label"
              id="offer-select"
              label="Offer"
              IconComponent={ExpandMoreIcon}
              defaultValue="5% off upi discount"
            >
              <MenuItem value="5% off upi discount">5% off upi discount</MenuItem>
              <MenuItem value="option 1">Option 1</MenuItem>
              <MenuItem value="option 2">Option 2</MenuItem>
              <MenuItem value="option 3">Option 3</MenuItem>
              <MenuItem value="option 4">Option 4</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body1" gutterBottom>
            Discount
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label="20% or more"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="30% or more"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="50% or more"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideFilter;
