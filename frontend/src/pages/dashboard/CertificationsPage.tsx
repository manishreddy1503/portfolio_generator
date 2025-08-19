import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

type Certification = { name: string; issuer?: string; date?: string; link?: string };

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [draft, setDraft] = useState<Certification>({ name: '' });

  const load = async () => {
    const { data } = await axios.get('/api/portfolio');
    setCerts(data.certifications || []);
  };

  const add = () => {
    if (!draft.name.trim()) return;
    setCerts([...certs, draft]);
    setDraft({ name: '' });
  };

  const save = async () => {
    await axios.put('/api/portfolio', { certifications: certs });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Certifications</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="Name" fullWidth value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Issuer" fullWidth value={draft.issuer || ''} onChange={e => setDraft({ ...draft, issuer: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField type="date" label="Date" InputLabelProps={{ shrink: true }} fullWidth value={draft.date || ''} onChange={e => setDraft({ ...draft, date: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Link" fullWidth value={draft.link || ''} onChange={e => setDraft({ ...draft, link: e.target.value })} /></Grid>
      </Grid>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Button variant="outlined" onClick={add}>Add Certification</Button>
      </Box>
      {certs.map((c, i) => (
        <Paper key={i} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle1">{c.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.issuer} {c.date ? `• ${c.date}` : ''}</Typography>
          <Box sx={{ mt: 1 }}>
            <Button color="error" onClick={() => setCerts(certs.filter((_, idx) => idx !== i))}>Remove</Button>
          </Box>
        </Paper>
      ))}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


