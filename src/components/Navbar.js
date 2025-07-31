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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import api from '../api/axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  background: 'rgba(255,255,255,0.13)',
  transition: 'background 0.18s',
  boxShadow: '0 2px 18px #e1dffb14',
  '&:hover': {
    background: 'rgba(255,255,255,0.24)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 330,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#817ee9',
  cursor: 'pointer',
  transition: 'color 0.16s'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#2e3366',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 2, 1.2, 2),
    paddingRight: 40,
    fontSize: 16,
    borderRadius: 12,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '18ch',
    },
  },
}));

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      api.get('/cart/count')
        .then(res => setCartCount(res.data.count))
        .catch(() => setCartCount(0));
    }
  }, [user]);

  const avatarText = user?.firstName
    ? user.firstName[0].toUpperCase()
    : (user?.email ? user.email[0].toUpperCase() : 'U');

  const userLabel = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`
    : (user?.email || '');

  const handleSearch = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201,
        background: 'linear-gradient(90deg, #7a64ff 0%, #ffcf8c 100%)',
        boxShadow: '0 8px 32px #c0b8f7cc',
        transition: 'all 0.16s',
      }}
      elevation={4}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 4 }, minHeight: 72 }}>
        {/* Logo/Nome Sito */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover img': {
              transform: 'scale(1.07) rotate(-2deg)'
            }
          }}
          onClick={() => navigate('/')}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 56, width: 56, objectFit: 'contain',
              borderRadius: 16,
              border: '2.5px solid #fff8',
              transition: 'all 0.17s cubic-bezier(.54,0,.28,1.4)'
            }}
            onError={e => { e.target.src = '/logo-placeholder.png'; }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: '#fff',
              textShadow: '0 2px 12px #7a64ff41',
              display: { xs: 'none', md: 'block' },
              fontFamily: 'Montserrat, Rubik, Arial',
            }}
          >
            <span style={{ color: "#FFD42A" }}>SILKROAD</span>
          </Typography>
        </Box>

        {/* Barra ricerca solo se loggato */}
        {user && (
          <Search>
            <StyledInputBase
              placeholder="Cerca prodotti..."
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
            <SearchIconWrapper onClick={handleSearch}>
              <SearchIcon sx={{ fontSize: 24 }} />
            </SearchIconWrapper>
          </Search>
        )}

        {/* Icone user e carrello */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{
                bgcolor: '#fff',
                boxShadow: '0 2px 8px #b39af44c',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: '#ffeedd' }
              }}
            >
              <Badge badgeContent={cartCount} color="secondary" max={99}>
                <ShoppingCartIcon sx={{ color: '#8d6fff', fontSize: 27 }} />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate('/profile')}
              title="Profilo"
              sx={{
                p: 0.7,
                bgcolor: '#fff',
                ml: 0.7,
                transition: 'box-shadow 0.12s',
                boxShadow: '0 1px 6px #c2a9ee35',
                '&:hover': { bgcolor: '#f1edff', boxShadow: '0 3px 14px #bbaaf640' }
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 30, color: '#5a56e9' }} />
            </IconButton>
            <Typography sx={{
              ml: 1,
              fontWeight: 500,
              fontSize: '1.06rem',
              color: '#fff',
              display: { xs: 'none', md: 'block' },
              letterSpacing: '0.02em',
              textShadow: '0 2px 10px #8461cf30'
            }}>
              {userLabel}
            </Typography>
            <Button
              color="inherit"
              variant="contained"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
                ml: 2,
                borderRadius: 2,
                background: '#fff',
                color: '#7a64ff',
                border: '1px solid #fff8',
                boxShadow: '0 1px 8px #a9a3d83c',
                textTransform: 'none',
                transition: 'all 0.13s',
                '&:hover': {
                  background: '#ffeedd',
                  color: '#5a56e9',
                  border: '1.5px solid #ffd142'
                }
              }}
              onClick={async () => { await logout(); navigate('/login'); }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
