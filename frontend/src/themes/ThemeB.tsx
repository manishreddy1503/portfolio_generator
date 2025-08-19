import { Box, Typography, Chip, Divider, Paper, Grid, Button, Container, Stack } from '@mui/material';
import SocialLinks from '../components/SocialLinks';

export default function ThemeB({ data }: { data: any }) {
  const p = data;
  const skills = Array.isArray(p.skills) ? p.skills : Object.values(p.skills || {});
  const projects = Array.isArray(p.projects) ? p.projects : Object.values(p.projects || {});
  const experience = Array.isArray(p.experience) ? p.experience : Object.values(p.experience || {});
  const education = Array.isArray(p.education) ? p.education : Object.values(p.education || {});
  const certifications = Array.isArray(p.certifications) ? p.certifications : Object.values(p.certifications || {});
  const achievements = Array.isArray(p.achievements) ? p.achievements : Object.values(p.achievements || {});
  return (
    <Box sx={{ bgcolor: '#0b1020', color: '#e5e7eb', minHeight: '100vh' }}>
      {/* Hero */}
      <Box sx={{
        background: 'radial-gradient(1200px 600px at 20% -10%, rgba(99,102,241,0.35), transparent), radial-gradient(900px 500px at 80% 10%, rgba(16,185,129,0.25), transparent)',
        borderBottom: '1px solid #1f2937'
      }}>
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
            {p.profile?.avatarUrl && (
              <img src={p.profile.avatarUrl} alt={p.profile?.fullName || 'Avatar'} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }} />
            )}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>{p.profile?.fullName || 'Your Name'}</Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>{p.profile?.title}</Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button variant="contained" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</Button>
                {p.profile?.email && <Button variant="outlined" color="inherit" href={`mailto:${p.profile.email}`}>Contact</Button>}
              </Box>
            </Box>
            <Box sx={{ ml: { md: 'auto' } }}>
              <SocialLinks socials={p.profile?.socials} />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* About */}
        {p.summary && (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, bgcolor: '#121826' }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>About</Typography>
                <Typography sx={{ color: '#9ca3af' }}>{p.summary}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
              {skills.length ? (
                <Paper sx={{ p: 3, bgcolor: '#121826' }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>Skills</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {skills.map((s: string, i: number) => <Chip key={i} label={s} sx={{ bgcolor: '#1f2937', color: '#e5e7eb' }} />)}
                  </Box>
                </Paper>
              ) : null}
            </Grid>
          </Grid>
        )}

        {/* Projects */}
        {projects.length ? (
          <Box id="projects" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800 }}>Featured Projects</Typography>
            <Grid container spacing={3}>
              {projects.map((pr: any, i: number) => (
                <Grid item xs={12} md={4} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#121826', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {pr.imageUrl && <img src={pr.imageUrl} alt={pr.name} style={{ width: '100%', borderRadius: 12 }} />}
                    <Typography variant="h6" sx={{ mt: 2 }}>{pr.name}</Typography>
                    {pr.description && <Typography variant="body2" sx={{ color: '#9ca3af', mt: 1 }}>{pr.description}</Typography>}
                    {pr.link && <Button href={pr.link} target="_blank" sx={{ mt: 'auto', alignSelf: 'flex-start' }}>Visit</Button>}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Experience & Education */}
        {(experience.length || education.length) ? (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {experience.length ? (
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Experience</Typography>
                <Stack spacing={2}>
                  {experience.map((ex: any, i: number) => (
                    <Paper key={i} sx={{ p: 2, bgcolor: '#121826' }}>
                      <Typography variant="h6">{ex.company}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#9ca3af' }}>{ex.role} • {(ex.start || ex.end) ? `${ex.start || ''} - ${ex.end || ''}` : ''}</Typography>
                      {ex.description && <Typography sx={{ mt: 1 }}>{ex.description}</Typography>}
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            ) : null}
            {education.length ? (
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Education</Typography>
                <Stack spacing={2}>
                  {education.map((ed: any, i: number) => (
                    <Paper key={i} sx={{ p: 2, bgcolor: '#121826' }}>
                      <Typography variant="h6">{ed.school}</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#9ca3af' }}>{ed.degree} • {(ed.start || ed.end) ? `${ed.start || ''} - ${ed.end || ''}` : ''}</Typography>
                      {ed.details && <Typography sx={{ mt: 1 }}>{ed.details}</Typography>}
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        ) : null}

        {/* Certifications & Achievements */}
        {(certifications.length || achievements.length) ? (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {certifications.length ? (
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Certifications</Typography>
                <Stack spacing={2}>
                  {certifications.map((c: any, i: number) => (
                    <Paper key={i} sx={{ p: 2, bgcolor: '#121826' }}>
                      <Typography variant="subtitle1">{c.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#9ca3af' }}>{c.issuer} {c.date ? `• ${c.date}` : ''}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Grid>
            ) : null}
            {achievements.length ? (
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 800 }}>Achievements</Typography>
                <Stack>
                  {achievements.map((a: any, i: number) => (
                    <Typography key={i}>• {a}</Typography>
                  ))}
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        ) : null}

        {/* Footer/Contact */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Get in Touch</Typography>
          {p.profile?.email && <Button variant="contained" color="primary" href={`mailto:${p.profile.email}`}>Email Me</Button>}
          <Typography variant="body2" sx={{ mt: 3, color: '#9ca3af' }}>© {new Date().getFullYear()} {p.profile?.fullName || 'Your Name'}</Typography>
        </Box>
      </Container>
    </Box>
  );
}


