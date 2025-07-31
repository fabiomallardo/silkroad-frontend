import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import {
  Card, CardContent, Typography, Avatar, Box, Divider, Chip, Button, Stack, Fade, Paper
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    telephone: ''
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
    } catch {
      setProfile(null);
    }
    setLoading(false);
  };

  // Open edit modal and preload form
  const openEditModal = () => {
    setEditForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      address: profile.address || '',
      telephone: profile.telephone || ''
    });
    setEditOpen(true);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/users/profile', editForm);
      setProfile(res.data);
      setEditOpen(false);
      toast.success("Profilo aggiornato!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        (err.response?.data?.errors && Object.values(err.response.data.errors).join(', ')) ||
        "Errore durante l'aggiornamento"
      );
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center my-5">Caricamento profilo...</div>;

  if (!profile) {
    return (
      <div className="container my-5">
        <Card>
          <CardContent>
            <Typography variant="h6" color="error">Impossibile caricare il profilo utente.</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Fade in timeout={600}>
      <Box className="container" sx={{
        maxWidth: 540,
        mt: 6,
        mb: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <ToastContainer />
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            borderRadius: 4,
            background: 'linear-gradient(135deg,#f5f7fb,#e8f0fe 80%)',
            boxShadow: '0 4px 32px rgba(80, 96, 200, 0.09)',
            p: { xs: 2, md: 4 }
          }}
        >
          <Stack direction="column" alignItems="center" spacing={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 80,
                height: 80,
                boxShadow: 3,
                fontSize: 36,
                border: '4px solid #fff'
              }}
            >
              {profile.firstName
                ? profile.firstName[0].toUpperCase()
                : profile.email[0].toUpperCase()}
            </Avatar>
            <Typography variant="h4" fontWeight={700} sx={{ letterSpacing: 0.3 }}>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
              <EmailIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
              {profile.email}
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5} mb={2}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentIndIcon color="info" fontSize="small" /> <b>Ruoli:</b>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {(profile.authorities && profile.authorities.length > 0)
                  ? profile.authorities.map(r =>
                      <Chip label={r} color="primary" key={r} size="small" />
                    )
                  : <Chip label="USER" color="default" size="small" />}
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShippingIcon color="success" fontSize="small" />
              <b>Ordini effettuati:</b> {profile.orderCount ?? 0}
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="secondary" fontSize="small" />
              <b>Telefono:</b> {profile.telephone || <span style={{ color: '#bbb' }}>N/D</span>}
            </Typography>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircleIcon color="action" fontSize="small" />
              <b>Indirizzo:</b> {profile.address || <span style={{ color: '#bbb' }}>N/D</span>}
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ textAlign: 'center', mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<EditIcon />}
              sx={{
                borderRadius: 4,
                fontWeight: 500,
                px: 3,
                bgcolor: '#fff',
                borderColor: '#5A56E9',
                color: '#4341bf',
                '&:hover': { bgcolor: '#F5F5FE', borderColor: '#4341bf' }
              }}
              onClick={openEditModal}
            >
              Modifica profilo
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => navigate('/orders/my-orders')}
              sx={{
                borderRadius: 4,
                boxShadow: 2,
                px: 4,
                fontWeight: 600,
                fontSize: 17,
                bgcolor: '#5A56E9',
                ':hover': { bgcolor: '#4341bf' }
              }}
            >
              Vai ai miei ordini
            </Button>
          </Box>
        </Paper>

        {/* Modal Bootstrap */}
        {editOpen && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ background: 'rgba(0,0,0,.15)' }}
            onClick={() => !saving && setEditOpen(false)}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
              <form className="modal-content" onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Modifica Profilo</h5>
                  <button type="button" className="btn-close" onClick={() => !saving && setEditOpen(false)} />
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Nome</label>
                    <input
                      className="form-control"
                      value={editForm.firstName}
                      onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))}
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Cognome</label>
                    <input
                      className="form-control"
                      value={editForm.lastName}
                      onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))}
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Telefono</label>
                    <input
                      className="form-control"
                      value={editForm.telephone}
                      onChange={e => setEditForm(f => ({ ...f, telephone: e.target.value }))}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Indirizzo</label>
                    <input
                      className="form-control"
                      value={editForm.address}
                      onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => !saving && setEditOpen(false)}
                    disabled={saving}
                  >
                    Annulla
                  </button>
                  <button className="btn btn-success" type="submit" disabled={saving}>
                    {saving ? 'Salvataggio...' : 'Salva modifiche'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Box>
    </Fade>
  );
}
