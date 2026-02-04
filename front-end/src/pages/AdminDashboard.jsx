import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Divider } from '@mui/material';
import { People, DirectionsCar, BookOnline, AttachMoney } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCars: 0,
        totalRentals: 0,
        availableCars: 0,
        rentedCars: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/statistics');
            setStats(response.data);
        } catch (err) {
            toast.error('Failed to fetch statistics');
        }
    };

    const pieData = [
        { name: 'Available', value: stats.availableCars },
        { name: 'Rented', value: stats.rentedCars },
    ];

    const barData = [
        { name: 'Users', count: stats.totalUsers },
        { name: 'Cars', count: stats.totalCars },
        { name: 'Rentals', count: stats.totalRentals },
    ];

    const COLORS = ['#0088FE', '#FF8042'];

    const StatCard = ({ title, value, icon, color }) => (
        <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" color="textSecondary" fontWeight="medium">{title}</Typography>
                    <Typography variant="h5" fontWeight="bold">{value}</Typography>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Users" value={stats.totalUsers} icon={<People />} color="primary" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Cars" value={stats.totalCars} icon={<DirectionsCar />} color="success" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Bookings" value={stats.totalRentals} icon={<BookOnline />} color="warning" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Revenue" value={`$${stats.totalRentals * 150}`} icon={<AttachMoney />} color="error" />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: 400, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">Platform Overview</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={barData}>
                                <CartGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#3f51b5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, height: 400, boxShadow: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">Car Availability</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
