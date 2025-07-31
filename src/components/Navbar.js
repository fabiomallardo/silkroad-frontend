import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'; // Aggiungi questo import
import Button from '@mui/material/Button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backdropFilter: 'blur(6px)', boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo e nome e-commerce */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: 60, width: 60, objectFit: 'contain' }} 
            onError={(e) => { e.target.src = '/logo-placeholder.png' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.05em', color: 'primary.main', display: { xs: 'none', md: 'block' } }}>
            <span style={{ fontWeight: 900, color: '#FFB81C' }}>E</span>COMMERCE
          </Typography>
        </Box>

        {/* Barra di ricerca (solo per utenti autenticati) */}
        {user && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Cerca prodotti..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        )}

        {/* Icone utente e carrello */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{user?.firstName?.[0] || 'U'}</Avatar>
            <Button 
              color="inherit" 
              variant="outlined" 
              onClick={async () => { await logout(); navigate('/login'); }}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}