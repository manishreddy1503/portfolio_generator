import { useEffect, useState } from 'react';
import { Paper, Typography, ToggleButtonGroup, ToggleButton, Box, Button } from '@mui/material';
import axios from 'axios';

export default function ThemePage() {
  const [theme, setTheme] = useState<'themeA' | 'themeB' | 'themeC'>('themeA');

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setTheme((data.theme || 'themeA'));
  };

  const save = async () => {
    await axios.put('/api/portfolio', { theme });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Select Theme</Typography>
      <ToggleButtonGroup color="primary" exclusive value={theme} onChange={(_, v) => v && setTheme(v)}>
        <ToggleButton value="themeA">Theme A</ToggleButton>
        <ToggleButton value="themeB">Theme B</ToggleButton>
        <ToggleButton value="themeC">Theme C</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


