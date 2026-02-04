import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    FormControlLabel,
    Switch,
    CircularProgress,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { createCar, getCarById, updateCar } from '../services/carService';
import toast from 'react-hot-toast';

const CarForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        available: true,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            loadCar();
        }
    }, [id]);

    const loadCar = async () => {
        try {
            const car = await getCarById(id);
            setFormData({
                brand: car.brand,
                model: car.model,
                year: car.year.toString(),
                pricePerDay: car.pricePerDay.toString(),
                available: car.available,
            });
        } catch (error) {
            console.error('Error loading car:', error);
            toast.error('Failed to load car details');
            navigate('/cars');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'available' ? checked : value,
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.brand.trim()) {
            newErrors.brand = 'Brand is required';
        }
        if (!formData.model.trim()) {
            newErrors.model = 'Model is required';
        }
        if (!formData.year) {
            newErrors.year = 'Year is required';
        } else if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
            newErrors.year = 'Invalid year';
        }
        if (!formData.pricePerDay) {
            newErrors.pricePerDay = 'Price per day is required';
        } else if (formData.pricePerDay <= 0) {
            newErrors.pricePerDay = 'Price must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setSubmitting(true);

        try {
            const carData = {
                brand: formData.brand,
                model: formData.model,
                year: parseInt(formData.year),
                pricePerDay: parseFloat(formData.pricePerDay),
                available: formData.available,
            };

            if (isEditMode) {
                await updateCar(id, carData);
                toast.success('Car updated successfully');
            } else {
                await createCar(carData);
                toast.success('Car added successfully');
            }

            navigate('/cars');
        } catch (error) {
            console.error('Error saving car:', error);
            toast.error(`Failed to ${isEditMode ? 'update' : 'add'} car`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/cars')}
                    sx={{ mr: 2 }}
                >
                    Back
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {isEditMode ? 'Edit Car' : 'Add New Car'}
                </Typography>
            </Box>

            <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                error={Boolean(errors.brand)}
                                helperText={errors.brand}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                error={Boolean(errors.model)}
                                helperText={errors.model}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Year"
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={handleChange}
                                error={Boolean(errors.year)}
                                helperText={errors.year}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Price Per Day ($)"
                                name="pricePerDay"
                                type="number"
                                inputProps={{ step: '0.01' }}
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                error={Boolean(errors.pricePerDay)}
                                helperText={errors.pricePerDay}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.available}
                                        onChange={handleChange}
                                        name="available"
                                        color="primary"
                                    />
                                }
                                label="Available for Rent"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/cars')}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : isEditMode ? 'Update Car' : 'Add Car'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default CarForm;
