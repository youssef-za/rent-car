import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Button, Select, MenuItem, FormControl
} from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get('/rentals');
            setBookings(response.data);
        } catch (err) {
            toast.error('Failed to fetch all bookings');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/rentals/${id}/status?status=${newStatus}`);
            toast.success(`Booking status updated to ${newStatus}`);
            fetchBookings();
        } catch (err) {
            toast.error('Failed to update status');
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
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Manage All Bookings</Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Car</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dates</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Price</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Update Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">{booking.user.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">{booking.user.email}</Typography>
                                </TableCell>
                                <TableCell>{booking.car.brand} {booking.car.model}</TableCell>
                                <TableCell>
                                    <Typography variant="body2">{booking.startDate} to</Typography>
                                    <Typography variant="body2">{booking.endDate}</Typography>
                                </TableCell>
                                <TableCell fontWeight="bold">${booking.totalPrice}</TableCell>
                                <TableCell>
                                    <Chip label={booking.status} color={getStatusColor(booking.status)} size="small" />
                                </TableCell>
                                <TableCell>
                                    <FormControl size="small" sx={{ minWidth: 120 }}>
                                        <Select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                        >
                                            <MenuItem value="BOOKED">Booked</MenuItem>
                                            <MenuItem value="COMPLETED">Completed</MenuItem>
                                            <MenuItem value="CANCELLED">Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageBookings;
