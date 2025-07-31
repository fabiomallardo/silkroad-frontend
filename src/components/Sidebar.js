import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; 
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const menu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Prodotti', icon: <ShoppingBagIcon />, path: '/products' },
  { text: 'Categorie', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Offerte', icon: <LocalOfferIcon />, path: '/offers' },
  { text: 'Clienti', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Ordini', icon: <ReceiptLongIcon />, path: '/orders/my-orders' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          background: '#ffffff',
          borderRight: '1px solid #e3e7ef',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Menu
        </Typography>
      </Box>
      <Divider />
      <List sx={{ mt: 1 }}>
        {menu.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 0.5,
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
              '&:hover': {
                backgroundColor: 'primary.lighter',
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
              transition: 'all 0.15s',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'grey.600' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 600 : 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}