import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

type Experience = { company: string; role: string; start?: string; end?: string; description?: string };

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [draft, setDraft] = useState<Experience>({ company: '', role: '' });

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setItems(data.experience || []);
  };

  const add = () => {
    if (!draft.company.trim() || !draft.role.trim()) return;
    setItems([...items, draft]);
    setDraft({ company: '', role: '' });
  };

  const save = async () => {
    await axios.put('/api/portfolio', { experience: items });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Experience</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="Company" fullWidth value={draft.company} onChange={e => setDraft({ ...draft, company: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Role" fullWidth value={draft.role} onChange={e => setDraft({ ...draft, role: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField type="month" label="Start" InputLabelProps={{ shrink: true }} fullWidth value={draft.start || ''} onChange={e => setDraft({ ...draft, start: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField type="month" label="End" InputLabelProps={{ shrink: true }} fullWidth value={draft.end || ''} onChange={e => setDraft({ ...draft, end: e.target.value })} /></Grid>
        <Grid item xs={12}><TextField label="Description" fullWidth multiline minRows={3} value={draft.description || ''} onChange={e => setDraft({ ...draft, description: e.target.value })} /></Grid>
      </Grid>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Button variant="outlined" onClick={add}>Add Experience</Button>
      </Box>
      {items.map((c, i) => (
        <Paper key={i} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle1">{c.company} — {c.role}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{(c.start || c.end) ? `${c.start || ''} - ${c.end || ''}` : ''}</Typography>
          <Box sx={{ mt: 1 }}>
            <Button color="error" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</Button>
          </Box>
        </Paper>
      ))}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


