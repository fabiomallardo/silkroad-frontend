import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import React, { useContext } from 'react';


export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backdropFilter: 'blur(6px)', boxShadow: 2 }}>
      <Toolbar>
        {/* Logo silkroad */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', color: 'primary.main' }}>
          <span style={{ fontWeight: 900, color: '#FFB81C' }}>S</span>ILKROAD
        </Typography>
        {/* Avatar utente e logout */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{user?.firstName?.[0] || 'U'}</Avatar>
            <Button color="inherit" variant="outlined" onClick={async () => { await logout(); navigate('/login'); }}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
