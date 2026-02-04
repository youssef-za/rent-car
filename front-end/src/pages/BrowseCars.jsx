import React, { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogActions, Chip, Divider, MenuItem
} from '@mui/material';
import { Search, DirectionsCar, Event, AttachMoney, Info } from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const BrowseCars = () => {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('price_asc');
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [bookingData, setBookingData] = useState({
        startDate: '', endDate: ''
    });

    const { user } = useAuth();

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

    const handleBookingOpen = (car) => {
        setSelectedCar(car);
        setBookingOpen(true);
    };

    const handleBookingClose = () => {
        setBookingOpen(false);
        setSelectedCar(null);
    };

    const handleBookingSubmit = async () => {
        if (!bookingData.startDate || !bookingData.endDate) {
            toast.error('Please select both dates');
            return;
        }

        try {
            await api.post('/rentals', {
                user: { id: user.id },
                car: { id: selectedCar.id },
                startDate: bookingData.startDate,
                endDate: bookingData.endDate
            });
            toast.success('Car booked successfully!');
            fetchCars();
            handleBookingClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed');
        }
    };

    const sortedCars = [...cars].sort((a, b) => {
        if (sortOption === 'price_asc') return a.pricePerDay - b.pricePerDay;
        if (sortOption === 'price_desc') return b.pricePerDay - a.pricePerDay;
        if (sortOption === 'year_desc') return b.year - a.year;
        return 0;
    });

    const filteredCars = sortedCars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Find Your Perfect Ride</Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <TextField
                    sx={{ flexGrow: 1, minWidth: 300 }}
                    placeholder="Search brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    select
                    label="Sort By"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    <MenuItem value="year_desc">Newest First</MenuItem>
                </TextField>
            </Box>

            <Grid container spacing={3}>
                {filteredCars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
                        <Card sx={{ height: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                            <CardMedia
                                component="img"
                                height="160"
                                image={`https://source.unsplash.com/featured/?car,${car.brand}`}
                                alt={car.brand}
                            />
                            <CardContent sx={{ pb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="h6" fontWeight="bold">{car.brand} {car.model}</Typography>
                                    <Chip label={car.year} size="small" variant="outlined" />
                                </Box>
                                <Typography variant="h5" color="primary.main" fontWeight="bold" sx={{ mb: 2 }}>
                                    ${car.pricePerDay}<Typography component="span" variant="body2" color="textSecondary"> / day</Typography>
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                    <Chip label={car.available ? 'Ready to Rent' : 'Reserved'} color={car.available ? 'success' : 'default'} size="small" />
                                </Box>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    disabled={!car.available}
                                    onClick={() => handleBookingOpen(car)}
                                    sx={{ borderRadius: 2 }}
                                >
                                    {car.available ? 'Book Now' : 'Not Available'}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={bookingOpen} onClose={handleBookingClose} maxWidth="xs" fullWidth>
                <DialogTitle>Complete Your Booking</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>
                            Booking for: <strong>{selectedCar?.brand} {selectedCar?.model}</strong>
                        </Typography>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={bookingData.startDate}
                            onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            value={bookingData.endDate}
                            onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                        />
                        {bookingData.startDate && bookingData.endDate && (
                            <Paper sx={{ p: 2, mt: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                                <Typography variant="body2">Estimated Total:</Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ${Math.max(1, (new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24)) * selectedCar?.pricePerDay}
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleBookingClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleBookingSubmit} color="primary">Confirm Order</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BrowseCars;
