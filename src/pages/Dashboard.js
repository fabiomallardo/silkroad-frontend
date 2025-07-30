import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Benvenuto su SILKROAD!
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Qui puoi gestire utenti, prodotti e tutte le funzionalità del tuo sistema in modo semplice e moderno.
        </Typography>
      </Paper>
    </Box>
  );
}
