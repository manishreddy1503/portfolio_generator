import { useEffect, useState } from 'react';
import { Paper, Typography, Grid, TextField, Button, Box } from '@mui/material';
import api from '../../lib/api';

type Project = { name: string; description?: string; link?: string; technologies?: string[]; imageUrl?: string };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Project>({ name: '' });

  const load = async () => {
    const { data } = await api.get('/api/portfolio');
    setProjects(data.projects || []);
  };

  const add = () => {
    if (!draft.name.trim()) return;
    setProjects([...projects, draft]);
    setDraft({ name: '' });
  };

  const save = async () => {
    await api.put('/api/portfolio', { projects });
  };

  useEffect(() => { load(); }, []);

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setDraft({ ...draft, imageUrl: data.url });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Projects</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField label="Name" fullWidth value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Link" fullWidth value={draft.link || ''} onChange={e => setDraft({ ...draft, link: e.target.value })} /></Grid>
        <Grid item xs={12}><TextField label="Description" fullWidth multiline minRows={3} value={draft.description || ''} onChange={e => setDraft({ ...draft, description: e.target.value })} /></Grid>
        <Grid item xs={12}><Button variant="outlined" component="label">Upload Image<input type="file" hidden accept="image/*" onChange={onPickImage} /></Button></Grid>
      </Grid>
      <Box sx={{ mt: 1, mb: 2 }}>
        <Button variant="outlined" onClick={add}>Add Project</Button>
      </Box>
      {projects.map((p, i) => (
        <Paper key={i} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle1">{p.name}</Typography>
          {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={{ maxWidth: '100%', borderRadius: 8, marginTop: 8 }} />}
          {p.link && <Typography variant="body2">{p.link}</Typography>}
          {p.description && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{p.description}</Typography>}
          <Box sx={{ mt: 1 }}>
            <Button color="error" onClick={() => setProjects(projects.filter((_, idx) => idx !== i))}>Remove</Button>
          </Box>
        </Paper>
      ))}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


