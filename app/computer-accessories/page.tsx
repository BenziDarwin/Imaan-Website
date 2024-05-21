"use client"

import { Grid } from '@mui/material'
import React from 'react'
import Filters from '../components/Filters'

function ComputerAccessories() {
  return (
    <main className="min-h-screen  md:p-18 px-5 pt-8">
      <Grid container>
        <Grid item xs={3}>
        <Filters/>
        </Grid>
        <Grid item xs={9}>
            Computer Accessories
        </Grid>
      </Grid>
        </main>
  )
}

export default ComputerAccessories