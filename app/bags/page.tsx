"use client"

import { Grid } from '@mui/material';
import CategoryDisplay from '../components/CategoryDisplay';
import SideFilter from '../components/SideFilter';
import TopFilter from '../components/TopFilter';

function Bags() {
  return (
    <main className="min-h-screen  md:p-18 px-5 pt-8">
      <Grid container>
        <Grid item sx={{display:{md:"block", xs:"none"}}} xs={false} md={3}>
        <SideFilter/>
        </Grid>
        <Grid item xs={12} md={9}>
            <CategoryDisplay/>
        </Grid>
      </Grid>
        </main>
  )
}

export default Bags