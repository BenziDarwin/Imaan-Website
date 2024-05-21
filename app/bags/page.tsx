"use client"

import React from 'react'
import Filters from "../components/Filters";
import { Grid } from '@mui/material';

function Bags() {
  return (
    <main className="min-h-screen  md:p-18 px-5 pt-8">
      <Grid container>
        <Grid item xs={3}>
        <Filters/>
        </Grid>
        <Grid item xs={9}>
            Bags
        </Grid>
      </Grid>
        </main>
  )
}

export default Bags