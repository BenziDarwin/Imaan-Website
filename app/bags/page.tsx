"use client"

import React from 'react'
import Filters from "../components/Filters";
import { Grid } from '@mui/material';

function Bags() {
  return (
    <main className="min-h-screen  md:p-18 px-5 pt-8">
      <Grid container>
        <Grid item sx={{display:{md:"block", xs:"none"}}} xs={false} md={3}>
        <Filters/>
        </Grid>
        <Grid item xs={12} md={9}>
            Bags
        </Grid>
      </Grid>
        </main>
  )
}

export default Bags