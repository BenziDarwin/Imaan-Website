"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from '@mui/material';
import TopFilter from './TopFilter';

export default function CategoryDisplay() {
  return (
    <Box sx={{ width: "100%", minHeight: "180vh", overflowY: 'scroll' }}>
        <Box component="div" sx={{display:{md:"none",xs:"block"}}}>
            <TopFilter/>
        </Box>
      <ImageList variant="masonry" cols={3} sx={{display:{md:"block", xs:"none"}}} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
              <ImageListItemBar
            title={item.name}
            subtitle={item.price}
            position="below"
          />
          </ImageListItem>
        ))}
      </ImageList>
      <ImageList cols={1} sx={{display:{md:"none", xs:"block"}}} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
              <ImageListItemBar
            title={item.name}
            subtitle={item.price}
            position="below"
          />
          </ImageListItem>
        ))}
      </ImageList>
      
    </Box>
  );
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        name: 'Laptop',
        price: '2,500,000 UGX',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        name: 'Desktop PC',
        price: '3,000,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        name: 'Camera',
        price: '1,200,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        name: 'Keyboard',
        price: '150,000 UGX',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        name: 'Monitor',
        price: '800,000 UGX',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        name: 'Smartphone',
        price: '1,500,000 UGX',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        name: 'Tablet',
        price: '900,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        name: 'Printer',
        price: '600,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        name: 'Router',
        price: '200,000 UGX',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        name: 'External Hard Drive',
        price: '350,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        name: 'USB Flash Drive',
        price: '50,000 UGX',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        name: 'Headphones',
        price: '250,000 UGX',
        cols: 2,
    },
];
