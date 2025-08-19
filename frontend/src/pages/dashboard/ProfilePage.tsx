import { useEffect, useState } from 'react';
import { Box, Paper, TextField, Typography, Grid, Button, Avatar } from '@mui/material';
import api from '../../lib/api';

type Socials = { github?: string; linkedin?: string; twitter?: string; website?: string; other?: string };
type Profile = { fullName: string; title?: string; location?: string; email?: string; phone?: string; website?: string; socials?: Socials; avatarUrl?: string };

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ fullName: '', socials: {} });

  const load = async () => {
    const { data } = await api.get('/api/portfolio');
    setProfile(data.profile || { fullName: '', socials: {} });
  };

  const save = async () => {
    await api.put('/api/portfolio', { profile });
  };

  const onPickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/api/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setProfile({ ...profile, avatarUrl: data.url });
  };

  useEffect(() => { load(); }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={profile.avatarUrl} sx={{ width: 64, height: 64 }} />
            <Button variant="outlined" component="label">Upload Avatar<input type="file" hidden accept="image/*" onChange={onPickImage} /></Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}><TextField label="Full Name" fullWidth value={profile.fullName} onChange={e => setProfile({ ...profile, fullName: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Title" fullWidth value={profile.title || ''} onChange={e => setProfile({ ...profile, title: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Location" fullWidth value={profile.location || ''} onChange={e => setProfile({ ...profile, location: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Email" fullWidth value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Phone" fullWidth value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Website" fullWidth value={profile.website || ''} onChange={e => setProfile({ ...profile, website: e.target.value })} /></Grid>
        <Grid item xs={12}><Typography variant="subtitle1">Socials</Typography></Grid>
        <Grid item xs={12} sm={6}><TextField label="GitHub" fullWidth value={profile.socials?.github || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="LinkedIn" fullWidth value={profile.socials?.linkedin || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Twitter" fullWidth value={profile.socials?.twitter || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, twitter: e.target.value } })} /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Other" fullWidth value={profile.socials?.other || ''} onChange={e => setProfile({ ...profile, socials: { ...profile.socials, other: e.target.value } })} /></Grid>
      </Grid>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </Paper>
  );
}


