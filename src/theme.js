import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A56E9', 
    },
    secondary: {
      main: '#F4C542', 
    },
    background: {
      default: '#f5f7fb',
    }
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    h5: { fontWeight: 700 }
  }
});

export default theme;
