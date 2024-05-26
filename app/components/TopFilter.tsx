import FilterListIcon from '@mui/icons-material/FilterList';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Menu,
    MenuItem,
    Select
} from '@mui/material';
import { useState } from 'react';

const TopFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
      <Button
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        Filters
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <MenuItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select labelId="category-label" id="category-select">
                  <MenuItem value="laptop">Laptops</MenuItem>
                  <MenuItem value="desktop">Desktops</MenuItem>
                  <MenuItem value="camera">Cameras</MenuItem>
                  <MenuItem value="smartphone">Smartphones</MenuItem>
                  <MenuItem value="accessory">Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="price-label">Price</InputLabel>
                <Select labelId="price-label" id="price-select">
                  <MenuItem value="$50-$100">$50-$100</MenuItem>
                  <MenuItem value="$100-$200">$100-$200</MenuItem>
                  <MenuItem value="$200-$500">$200-$500</MenuItem>
                  <MenuItem value="$500+">$500+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="colors-label">Colors</InputLabel>
                <Select labelId="colors-label" id="colors-select">
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="black">Black</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="size-label">Size</InputLabel>
                <Select labelId="size-label" id="size-select">
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TopFilter;
