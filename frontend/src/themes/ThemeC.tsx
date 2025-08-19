import { Box, Typography, Chip, Divider, Grid, Paper, Button, List, ListItemButton } from '@mui/material';
import SocialLinks from '../components/SocialLinks';

export default function ThemeC({ data }: { data: any }) {
  const p = data;
  const skills = Array.isArray(p.skills) ? p.skills : Object.values(p.skills || {});
  const projects = Array.isArray(p.projects) ? p.projects : Object.values(p.projects || {});
  const experience = Array.isArray(p.experience) ? p.experience : Object.values(p.experience || {});
  const education = Array.isArray(p.education) ? p.education : Object.values(p.education || {});
  const certifications = Array.isArray(p.certifications) ? p.certifications : Object.values(p.certifications || {});
  const achievements = Array.isArray(p.achievements) ? p.achievements : Object.values(p.achievements || {});

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0f1a', color: '#e2e8f0' }}>
      {/* Sidebar */}
      <Box sx={{ width: 280, borderRight: '1px solid #1f2937', p: 3, position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          {p.profile?.avatarUrl && (
            <img src={p.profile.avatarUrl} alt={p.profile?.fullName || 'Avatar'} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
          )}
          <Box>
            <Typography variant="h6">{p.profile?.fullName || 'Your Name'}</Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>{p.profile?.title}</Typography>
          </Box>
        </Box>
        <SocialLinks socials={p.profile?.socials} />
        <Divider sx={{ my: 2, borderColor: '#1f2937' }} />
        <List>
          {sections.map((s) => (
            <ListItemButton key={s.id} onClick={() => scrollTo(s.id)} sx={{ borderRadius: 1 }}>
              {s.label}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
        {/* About */}
        {p.summary && (
          <Paper id="about" sx={{ p: 3, mb: 3, bgcolor: '#0f172a' }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>About</Typography>
            <Typography sx={{ color: '#9ca3af' }}>{p.summary}</Typography>
          </Paper>
        )}

        {/* Skills */}
        {skills.length ? (
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#0f172a' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Skills</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {skills.map((s: string, i: number) => <Chip key={i} label={s} />)}
            </Box>
          </Paper>
        ) : null}

        {/* Projects */}
        {projects.length ? (
          <Box id="projects" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Projects</Typography>
            <Grid container spacing={2}>
              {projects.map((pr: any, i: number) => (
                <Grid item xs={12} md={6} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#0f172a' }}>
                    {pr.imageUrl && <img src={pr.imageUrl} alt={pr.name} style={{ width: '100%', borderRadius: 8 }} />}
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>{pr.name}</Typography>
                    {pr.description && <Typography variant="body2" sx={{ color: '#9ca3af' }}>{pr.description}</Typography>}
                    {pr.link && <Button href={pr.link} target="_blank" sx={{ mt: 1 }}>Visit</Button>}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Experience */}
        {experience.length ? (
          <Box id="experience" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Experience</Typography>
            <Grid container spacing={2}>
              {experience.map((ex: any, i: number) => (
                <Grid item xs={12} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#0f172a' }}>
                    <Typography variant="subtitle1">{ex.company} — {ex.role}</Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>{(ex.start || ex.end) ? `${ex.start || ''} - ${ex.end || ''}` : ''}</Typography>
                    {ex.description && <Typography sx={{ mt: 1 }}>{ex.description}</Typography>}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Education */}
        {education.length ? (
          <Box id="education" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Education</Typography>
            <Grid container spacing={2}>
              {education.map((ed: any, i: number) => (
                <Grid item xs={12} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#0f172a' }}>
                    <Typography variant="subtitle1">{ed.school} {ed.degree ? `— ${ed.degree}` : ''}</Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>{(ed.start || ed.end) ? `${ed.start || ''} - ${ed.end || ''}` : ''}</Typography>
                    {ed.details && <Typography sx={{ mt: 1 }}>{ed.details}</Typography>}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Certifications */}
        {certifications.length ? (
          <Box id="certifications" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Certifications</Typography>
            <Grid container spacing={2}>
              {certifications.map((c: any, i: number) => (
                <Grid item xs={12} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#0f172a' }}>
                    <Typography variant="subtitle1">{c.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>{c.issuer} {c.date ? `• ${c.date}` : ''}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Achievements */}
        {achievements.length ? (
          <Box id="achievements" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Achievements</Typography>
            {achievements.map((a: any, i: number) => (
              <Typography key={i}>• {a}</Typography>
            ))}
          </Box>
        ) : null}

        {/* Contact */}
        <Box id="contact" sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Get in Touch</Typography>
          {p.profile?.email && <Button variant="contained" href={`mailto:${p.profile.email}`}>Email Me</Button>}
        </Box>
      </Box>
    </Box>
  );
}


