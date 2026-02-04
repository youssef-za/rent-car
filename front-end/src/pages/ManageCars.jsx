import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Chip,
    Grid, Card, CardMedia, CardContent, CardActions
} from '@mui/material';
import { Add, Edit, Delete, Search, DirectionsCar, FilterList } from '@mui/icons-material';
import api from '../services/api';
import { toast } from 'react-toastify';

const ManageCars = () => {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        brand: '', model: '', year: (new Date()).getFullYear(), pricePerDay: 0, available: true
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await api.get('/cars');
            setCars(response.data);
        } catch (err) {
            toast.error('Failed to fetch cars');
        }
    };

    const handleOpen = (car = null) => {
        if (car) {
            setSelectedCar(car);
            setFormData(car);
        } else {
            setSelectedCar(null);
            setFormData({
                brand: '', model: '', year: (new Date()).getFullYear(), pricePerDay: 0, available: true
            });
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCar) {
                await api.put(`/cars/${selectedCar.id}`, formData);
                toast.success('Car updated successfully');
            } else {
                await api.post('/cars', formData);
                toast.success('Car added successfully');
            }
            fetchCars();
            handleClose();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await api.delete(`/cars/${id}`);
                toast.success('Car deleted successfully');
                fetchCars();
            } catch (err) {
                toast.error('Failed to delete car');
            }
        }
    };

    const filteredCars = cars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Manage Fleet</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 2 }}
                >
                    Add New Car
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search by brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Brand</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Model</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Year</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price/Day</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCars.map((car) => (
                            <TableRow key={car.id} hover>
                                <TableCell>{car.brand}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.year}</TableCell>
                                <TableCell>${car.pricePerDay}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={car.available ? 'Available' : 'Rented'}
                                        color={car.available ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(car)} color="primary"><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(car.id)} color="error"><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Brand" name="brand" value={formData.brand} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Model" name="model" value={formData.model} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Price Per Day" name="pricePerDay" type="number" value={formData.pricePerDay} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Initial Availability</Typography>
                            <Chip
                                label={formData.available ? "Available" : "Unavailable"}
                                onClick={() => setFormData({ ...formData, available: !formData.available })}
                                color={formData.available ? "primary" : "default"}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        {selectedCar ? 'Update Car' : 'Add Car'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManageCars;
