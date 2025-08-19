import { useEffect, useState } from 'react';
import { Paper, Typography, Box, TextField, Chip, Button } from '@mui/material';
import axios from 'axios';

export default function SkillsPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setSkills(data.skills || []);
  };

  const save = async () => {
    await axios.put('/api/portfolio', { skills });
    setInput('');
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField label="Add skill" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { setSkills([...skills, input.trim()]); setInput(''); } }} />
        <Button variant="contained" onClick={() => { if (input.trim()) { setSkills([...skills, input.trim()]); setInput(''); } }}>Add</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {skills.map((s, i) => (
          <Chip key={`${s}-${i}`} label={s} onDelete={() => setSkills(skills.filter((_, idx) => idx !== i))} />
        ))}
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


