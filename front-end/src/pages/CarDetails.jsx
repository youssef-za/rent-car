import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Chip,
    Divider,
    Card,
    CardContent,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    DirectionsCar as CarIcon,
    CalendarToday as YearIcon,
    AttachMoney as PriceIcon,
    CheckCircle as AvailableIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById, deleteCar } from '../services/carService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

const CarDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {
        loadCar();
    }, [id]);

    const loadCar = async () => {
        try {
            const data = await getCarById(id);
            setCar(data);
        } catch (error) {
            console.error('Error loading car:', error);
            toast.error('Failed to load car details');
            navigate('/cars');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCar(id);
            toast.success('Car deleted successfully');
            navigate('/cars');
        } catch (error) {
            console.error('Error deleting car:', error);
            toast.error('Failed to delete car');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!car) return null;

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<BackIcon />}
                        onClick={() => navigate('/cars')}
                        sx={{ mr: 2 }}
                    >
                        Back
                    </Button>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        Car Details
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`/cars/edit/${id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialog(true)}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    {/* Main Info Card */}
                    <Grid item xs={12}>
                        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <CarIcon sx={{ fontSize: 48 }} />
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                            {car.brand} {car.model}
                                        </Typography>
                                        <Typography variant="h6" sx={{ opacity: 0.9 }}>
                                            Year: {car.year}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label={car.available ? 'Available' : 'Rented'}
                                    color={car.available ? 'success' : 'error'}
                                    sx={{ fontWeight: 600 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Details Grid */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <CarIcon color="primary" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Brand
                                        </Typography>
                                        <Typography variant="h6">{car.brand}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <CarIcon color="primary" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Model
                                        </Typography>
                                        <Typography variant="h6">{car.model}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <YearIcon color="primary" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Year
                                        </Typography>
                                        <Typography variant="h6">{car.year}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <PriceIcon color="primary" />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Price Per Day
                                        </Typography>
                                        <Typography variant="h6">${car.pricePerDay}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <AvailableIcon color={car.available ? 'success' : 'error'} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Availability Status
                                        </Typography>
                                        <Typography variant="h6">
                                            {car.available ? 'Available for Rent' : 'Currently Rented'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteDialog}
                title="Delete Car"
                message={`Are you sure you want to delete ${car.brand} ${car.model}? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteDialog(false)}
            />
        </Box>
    );
};

export default CarDetails;
