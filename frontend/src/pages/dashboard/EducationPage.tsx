import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

type Education = { school: string; degree?: string; start?: string; end?: string; details?: string };

export default function EducationPage() {
  const [items, setItems] = useState<Education[]>([]);
  const [draft, setDraft] = useState<Education>({ school: '' });

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setDraft(data.education || []);
  };

  const add = () => {
    if (!draft.school.trim()) return;
    setItems([...items, draft]);
    setDraft({ school: '' });
  };

  const save = async () => {
    await axios.put('/api/portfolio', { education: draft });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Education</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="School" fullWidth value={draft.school} onChange={e => setDraft({ ...draft, school: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Degree" fullWidth value={draft.degree || ''} onChange={e => setDraft({ ...draft, degree: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField type="month" label="Start" InputLabelProps={{ shrink: true }} fullWidth value={draft.start || ''} onChange={e => setDraft({ ...draft, start: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField type="month" label="End" InputLabelProps={{ shrink: true }} fullWidth value={draft.end || ''} onChange={e => setDraft({ ...draft, end: e.target.value })} /></Grid>
        <Grid item xs={12}><TextField label="Details" fullWidth multiline minRows={3} value={draft.details || ''} onChange={e => setDraft({ ...draft, details: e.target.value })} /></Grid>
      </Grid>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Button variant="outlined" onClick={add}>Add Education</Button>
      </Box>
      {items.map((c, i) => (
        <Paper key={i} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle1">{c.school}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.degree} {(c.start || c.end) ? `• ${c.start || ''} - ${c.end || ''}` : ''}</Typography>
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


