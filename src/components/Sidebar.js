import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';


const menu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Utenti', icon: <PeopleIcon />, path: '/users' },
  { text: 'Prodotti', icon: <InventoryIcon />, path: '/products' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" sx={{
      width: 220, flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' }
    }}>
      <Toolbar />
      <List>
        {menu.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
