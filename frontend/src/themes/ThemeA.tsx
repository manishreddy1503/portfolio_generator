import { Box, Typography, Chip, Grid, Paper, Button, Container, Stack } from '@mui/material';
import SocialLinks from '../components/SocialLinks';

export default function ThemeA({ data }: { data: any }) {
  const p = data;
  const skills = Array.isArray(p.skills) ? p.skills : Object.values(p.skills || {});
  const projects = Array.isArray(p.projects) ? p.projects : Object.values(p.projects || {});
  const experience = Array.isArray(p.experience) ? p.experience : Object.values(p.experience || {});
  const education = Array.isArray(p.education) ? p.education : Object.values(p.education || {});
  const certifications = Array.isArray(p.certifications) ? p.certifications : Object.values(p.certifications || {});
  const achievements = Array.isArray(p.achievements) ? p.achievements : Object.values(p.achievements || {});

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6EE7F9 0%, #A855F7 50%, #F97316 100%)',
          color: 'white',
        }}
      >
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
            {p.profile?.avatarUrl && (
              <img src={p.profile.avatarUrl} alt={p.profile?.fullName || 'Avatar'} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }} />
            )}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" sx={{ fontWeight: 800 }}>{p.profile?.fullName || 'Your Name'}</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>{p.profile?.title}</Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button variant="contained" color="inherit" onClick={() => scrollTo('projects')}>View Projects</Button>
                <Button variant="outlined" color="inherit" onClick={() => scrollTo('contact')}>Contact</Button>
              </Box>
            </Box>
            <Box sx={{ ml: { md: 'auto' } }}>
              <SocialLinks socials={p.profile?.socials} />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Section Nav */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container sx={{ py: 1, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['about', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements', 'contact'].map((s) => (
            <Button key={s} size="small" onClick={() => scrollTo(s)}>{s.toUpperCase()}</Button>
          ))}
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* About */}
        {p.summary && (
          <Box id="about" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>About</Typography>
            <Typography sx={{ maxWidth: 900 }}>{p.summary}</Typography>
          </Box>
        )}

        {/* Skills */}
        {skills.length ? (
          <Box id="skills" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Skills</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {skills.map((s: string, i: number) => <Chip key={i} label={s} />)}
            </Box>
          </Box>
        ) : null}

        {/* Projects */}
        {projects.length ? (
          <Box id="projects" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Projects</Typography>
            <Grid container spacing={3}>
              {projects.map((pr: any, i: number) => (
                <Grid item xs={12} md={6} key={i}>
                  <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {pr.imageUrl && <img src={pr.imageUrl} alt={pr.name} style={{ width: '100%', borderRadius: 12 }} />}
                    <Typography variant="h6" sx={{ mt: 2 }}>{pr.name}</Typography>
                    {pr.technologies?.length ? (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {pr.technologies.map((t: string, ti: number) => <Chip key={ti} size="small" label={t} />)}
                      </Box>
                    ) : null}
                    {pr.description && <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>{pr.description}</Typography>}
                    {pr.link && <Button href={pr.link} target="_blank" sx={{ mt: 'auto', alignSelf: 'flex-start' }}>Visit</Button>}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Experience */}
        {experience.length ? (
          <Box id="experience" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Experience</Typography>
            <Stack spacing={2}>
              {experience.map((ex: any, i: number) => (
                <Paper key={i} sx={{ p: 2 }}>
                  <Typography variant="h6">{ex.company}</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{ex.role} • {(ex.start || ex.end) ? `${ex.start || ''} - ${ex.end || ''}` : ''}</Typography>
                  {ex.description && <Typography sx={{ mt: 1 }}>{ex.description}</Typography>}
                </Paper>
              ))}
            </Stack>
          </Box>
        ) : null}

        {/* Education */}
        {education.length ? (
          <Box id="education" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Education</Typography>
            <Stack spacing={2}>
              {education.map((ed: any, i: number) => (
                <Paper key={i} sx={{ p: 2 }}>
                  <Typography variant="h6">{ed.school}</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>{ed.degree} • {(ed.start || ed.end) ? `${ed.start || ''} - ${ed.end || ''}` : ''}</Typography>
                  {ed.details && <Typography sx={{ mt: 1 }}>{ed.details}</Typography>}
                </Paper>
              ))}
            </Stack>
          </Box>
        ) : null}

        {/* Certifications */}
        {certifications.length ? (
          <Box id="certifications" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Certifications</Typography>
            <Grid container spacing={2}>
              {certifications.map((c: any, i: number) => (
                <Grid item xs={12} md={6} key={i}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1">{c.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{c.issuer} {c.date ? `• ${c.date}` : ''}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        {/* Achievements */}
        {achievements.length ? (
          <Box id="achievements" sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Achievements</Typography>
            <Stack>
              {achievements.map((a: any, i: number) => (
                <Typography key={i}>• {a}</Typography>
              ))}
            </Stack>
          </Box>
        ) : null}

        {/* Contact */}
        <Box id="contact" sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Contact</Typography>
          {p.profile?.email && (
            <Button variant="contained" color="primary" href={`mailto:${p.profile.email}`}>Email Me</Button>
          )}
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', py: 3, textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} {p.profile?.fullName || 'Your Name'}</Typography>
      </Box>
    </Box>
  );
}


