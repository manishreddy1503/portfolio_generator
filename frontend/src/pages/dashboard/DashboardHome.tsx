import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Quick Start</Typography>
      <Grid container spacing={2}>
        {[{ t: 'Profile', to: '/profile' }, { t: 'Summary', to: '/summary' }, { t: 'Skills', to: '/skills' }, { t: 'Projects', to: '/projects' }, { t: 'Certifications', to: '/certifications' }, { t: 'Education', to: '/education' }, { t: 'Experience', to: '/experience' }, { t: 'Theme', to: '/theme' }].map((x) => (
          <Grid item xs={12} sm={6} md={3} key={x.t}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle1">{x.t}</Typography>
              <Button variant="outlined" component={Link} to={x.to}>Open</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


