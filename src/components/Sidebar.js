import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';

const menu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Utenti', icon: <PeopleIcon />, path: '/users' },
  { text: 'Prodotti', icon: <InventoryIcon />, path: '/products' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 220,
          boxSizing: 'border-box',
          background: '#f7f8fa',
          borderRight: '1px solid #e3e7ef',
        },
      }}
    >
      <Toolbar />
      <List sx={{ mt: 2 }}>
        {menu.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.main',
                boxShadow: 1,
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
              primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 500 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
