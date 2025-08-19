import { useEffect, useState } from 'react';
import { Paper, Typography, TextField, Box, Button } from '@mui/material';
import axios from 'axios';

export default function SummaryPage() {
  const [summary, setSummary] = useState('');

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setSummary(data.summary || '');
  };

  const save = async () => {
    await axios.put('/api/portfolio', { summary });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Summary</Typography>
      <TextField fullWidth multiline minRows={6} value={summary} onChange={e => setSummary(e.target.value)} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


