import { Box, Button, Typography, Paper } from '@mui/material';

export default function LoginPage() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Welcome to Portfolio Generator</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Sign in to create and manage your professional portfolio.
        </Typography>
        <Button fullWidth variant="contained" size="large" onClick={() => window.location.href = `${apiUrl}/auth/google`}>
          Continue with Google
        </Button>
      </Paper>
    </Box>
  );
}


