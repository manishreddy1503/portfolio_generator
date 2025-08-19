import { useEffect, useState } from 'react';
import { Paper, Typography, Box, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setAchievements(data.achievements || []);
  };

  const add = () => {
    if (!input.trim()) return;
    setAchievements([...achievements, input.trim()]);
    setInput('');
  };

  const save = async () => {
    await axios.put('/api/portfolio', { achievements });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Achievements</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField label="Add achievement" fullWidth value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') add(); }} />
        <Button variant="contained" onClick={add}>Add</Button>
      </Box>
      <List>
        {achievements.map((a, i) => (
          <ListItem key={`${a}-${i}`} secondaryAction={<IconButton onClick={() => setAchievements(achievements.filter((_, idx) => idx !== i))}><DeleteIcon /></IconButton>}>
            <ListItemText primary={a} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


