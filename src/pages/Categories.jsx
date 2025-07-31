// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import {
  Card, CardContent, CardActionArea, Grid, Typography, Box, Chip, Stack, Tooltip
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Caricamento categorie...</div>;
  }

  return (
    <div className="container py-4" style={{ maxWidth: 1200 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, letterSpacing: '.02em' }}>
        <CategoryIcon sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
        Categorie Prodotti
      </Typography>
      <Grid container spacing={4}>
        {categories.map(cat => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
            <Card
              elevation={5}
              sx={{
                transition: 'transform .16s cubic-bezier(.4,2,.2,1), box-shadow .18s',
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.03)',
                  boxShadow: 8,
                  cursor: 'pointer',
                  borderColor: 'primary.main'
                },
                borderRadius: 3,
                border: cat.active ? '2px solid #1976d2' : '2px solid #e0e0e0',
                background: cat.active
                  ? 'linear-gradient(120deg, #f0f8ff 60%, #e3e7ef 100%)'
                  : '#f5f5f5',
              }}
            >
              <CardActionArea onClick={() => navigate(`/products?categoryId=${cat.id}`)}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <CategoryIcon
                      sx={{
                        color: cat.active ? 'primary.main' : 'grey.400',
                        fontSize: 34,
                        opacity: cat.active ? 1 : 0.6,
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: cat.active ? 'primary.main' : 'grey.500',
                        textShadow: cat.active ? '0 1px 0 #fff' : undefined,
                        flexGrow: 1,
                      }}
                    >
                      {cat.name}
                    </Typography>
                    {typeof cat.productCount === 'number' &&
                      <Tooltip title="Prodotti attivi" arrow>
                        <Chip
                          icon={<LocalOfferIcon sx={{ fontSize: 18 }} />}
                          label={cat.productCount}
                          size="small"
                          color="primary"
                          sx={{ fontWeight: 600, ml: 1 }}
                        />
                      </Tooltip>
                    }
                  </Stack>
                  {cat.description &&
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontStyle: 'italic',
                        minHeight: 32,
                        opacity: 0.85,
                        lineHeight: 1.3
                      }}
                    >
                      {cat.description}
                    </Typography>
                  }
                  <Box>
                    <Chip
                      label={cat.active ? "Attiva" : "Disattivata"}
                      color={cat.active ? "success" : "default"}
                      size="small"
                      sx={{ fontWeight: 600, letterSpacing: '.04em', mr: 1 }}
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {categories.length === 0 && (
          <Grid item xs={12}>
            <div className="alert alert-info">Nessuna categoria trovata.</div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
