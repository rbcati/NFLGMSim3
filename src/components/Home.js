// src/components/Home.js
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Team Overview</Typography>
            <Typography>Record: 10-7</Typography>
            <Typography>Cap Space: $25M</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Recent Transactions</Typography>
            <Typography>Signed Kirk Cousins (QB)</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
