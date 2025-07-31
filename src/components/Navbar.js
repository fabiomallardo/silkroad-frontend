import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
// Se hai un CartContext, importa qui
// import { CartContext } from '../context/CartContext';
import api from '../api/axios'; // Per il fetch count se non hai il context

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

  // Puoi usare un context carrello o, in mancanza, un piccolo stato qui:
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Solo se loggato!
    if (user) {
      api.get('/cart/count')
        .then(res => setCartCount(res.data.count))
        .catch(() => setCartCount(0));
    }
  }, [user]);

  // Mostra le iniziali o email
  const avatarText = user?.firstName
    ? user.firstName[0].toUpperCase()
    : (user?.email ? user.email[0].toUpperCase() : 'U');

  const userLabel = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : (user?.email || '');

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backdropFilter: 'blur(6px)', boxShadow: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Nome Sito */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={{ height: 60, width: 60, objectFit: 'contain' }} 
            onError={e => { e.target.src = '/logo-placeholder.png'; }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'primary.main',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <span style={{ fontWeight: 900, color: '#FFB81C' }}>E</span>COMMERCE
          </Typography>
        </Box>

        {/* Barra ricerca solo se loggato */}
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

        {/* Icone user e carrello */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{avatarText}</Avatar>
            <Typography sx={{ ml: 1, fontWeight: 500, fontSize: '1rem', color: '#fff', display: { xs: 'none', md: 'block' } }}>
              {userLabel}
            </Typography>
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
