import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText, Avatar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const drawerWidth = 260;

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Profile', to: '/profile' },
  { label: 'Summary', to: '/summary' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Education', to: '/education' },
  { label: 'Experience', to: '/experience' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Theme', to: '/theme' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Generator</Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.to} component={Link} to={item.to} selected={location.pathname === item.to || (item.to === '/' && location.pathname === '/')}
            onClick={() => setMobileOpen(false)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        <ListItemButton component={Link} to="/preview" onClick={() => setMobileOpen(false)}>
          <ListItemText primary="Preview" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user && <>
              <Avatar src={user.avatarUrl} sx={{ width: 32, height: 32 }} />
              <Typography>{user.name}</Typography>
            </>}
            <Button color="inherit" onClick={async () => { await logout(); navigate('/login'); }}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}


