import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) fetchBookings();
    }, [user]);

    const fetchBookings = async () => {
        try {
            const response = await api.get(`/rentals/user/${user.id}`);
            setBookings(response.data);
        } catch (err) {
            toast.error('Failed to fetch bookings');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'BOOKED': return 'primary';
            case 'COMPLETED': return 'success';
            case 'CANCELLED': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>My Booking History</Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Car</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Price</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No bookings found</TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking) => (
                                <TableRow key={booking.id} hover>
                                    <TableCell>
                                        <Typography variant="body1" fontWeight="medium">
                                            {booking.car.brand} {booking.car.model}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">{booking.car.year}</Typography>
                                    </TableCell>
                                    <TableCell>{booking.startDate}</TableCell>
                                    <TableCell>{booking.endDate}</TableCell>
                                    <TableCell fontWeight="bold">${booking.totalPrice}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={booking.status}
                                            color={getStatusColor(booking.status)}
                                            size="small"
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MyBookings;
