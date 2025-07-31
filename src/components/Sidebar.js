import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AuthContext } from '../context/AuthContext';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const SIDEBAR_WIDTH = 250;

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.authorities?.includes("ROLE_ADMIN");

  // Cambia qui i colori per rendere la sidebar più "brand"
  const mainColor = '#5A56E9';
  const hoverBg = '#ececff';
  const activeBg = '#e1defe';

  const menu = [
    ...(isAdmin ? [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/' }
    ] : []),
    { text: 'Prodotti', icon: <ShoppingBagIcon />, path: '/products' },
    { text: 'Categorie', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Ordini', icon: <ReceiptLongIcon />, path: '/orders/my-orders' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          background: '#fff',
          borderRight: '2px solid #eceaff',
          boxShadow: '4px 0 24px #e6eaff40',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        {/* LOGO */}
        <img src="/logo.png" alt="Logo" style={{
          width: 60,
          height: 60,
          objectFit: 'contain',
          marginBottom: 8,
          borderRadius: 18,
          border: `2px solid ${mainColor}33`
        }}
        onError={e => { e.target.src = '/logo-placeholder.png'; }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: mainColor,
            letterSpacing: '0.05em',
            fontSize: 21,
          }}
        >
          SILKROAD
        </Typography>
        {/* Optional: utente/ruolo badge */}
        <Typography sx={{ color: '#c2c2e5', fontSize: 13, mt: 0.5 }}>
          {isAdmin ? 'Admin' : 'Utente'}
        </Typography>
      </Box>
      <Divider sx={{ mx: 2, mb: 2 }} />
      <List>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 2,
                px: 2,
                py: 1,
                position: 'relative',
                backgroundColor: isActive ? activeBg : 'transparent',
                color: isActive ? mainColor : '#444',
                fontWeight: isActive ? 700 : 500,
                boxShadow: isActive ? `0 2px 12px #5a56e921` : 'none',
                transition: 'all 0.18s cubic-bezier(.6,0,.6,1.2)',
                '&:hover': {
                  backgroundColor: hoverBg,
                  color: mainColor,
                  transform: 'translateX(6px) scale(1.04)',
                  '& .MuiListItemIcon-root': {
                    color: mainColor,
                  }
                },
                ...(isActive && {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: -9,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 8,
                    height: 36,
                    borderRadius: 4,
                    background: `linear-gradient(180deg, ${mainColor}, #a08cff 80%)`
                  }
                })
              }}
            >
              <ListItemIcon sx={{
                color: isActive ? mainColor : '#b7b6d6',
                minWidth: 36,
                fontSize: 22
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 16,
                  letterSpacing: 0.3
                }}
              />
              {/* Star for active menu, just to show a bit more "life" */}
              {isActive &&
                <StarRoundedIcon sx={{ color: mainColor, fontSize: 18, ml: 1, mb: 0.3, opacity: 0.72 }} />
              }
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ mx: 2, my: 2 }} />
      <Box sx={{ p: 2, textAlign: 'center', fontSize: 13, color: '#a2a1d2' }}>
        {/* FOOTER SIDEBAR */}
        <div>
          <span style={{ fontWeight: 700, color: mainColor }}>Silkroad</span> &copy; {new Date().getFullYear()}
        </div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>by YourCompany</div>
      </Box>
    </Drawer>
  );
}
