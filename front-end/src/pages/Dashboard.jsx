import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import {
    DirectionsCar as CarsIcon,
    CheckCircle as AvailableIcon,
    Cancel as RentedIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/common/StatsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getAllCars } from '../services/carService';

const COLORS = ['#1976d2', '#ff9800', '#4caf50', '#f44336', '#9c27b0'];

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        available: 0,
        rented: 0,
        revenue: 0,
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const data = await getAllCars();
            setCars(data);

            // Calculate statistics
            const available = data.filter(car => car.available).length;
            const rented = data.length - available;
            const revenue = data.reduce((sum, car) => sum + car.pricePerDay, 0);

            setStats({
                total: data.length,
                available,
                rented,
                revenue: revenue.toFixed(2),
            });
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Prepare chart data
    const brandData = cars.reduce((acc, car) => {
        const existing = acc.find(item => item.brand === car.brand);
        if (existing) {
            existing.count++;
        } else {
            acc.push({ brand: car.brand, count: 1 });
        }
        return acc;
    }, []);

    const availabilityData = [
        { name: 'Available', value: stats.available },
        { name: 'Rented', value: stats.rented },
    ];

    if (loading) return <LoadingSpinner />;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Dashboard
            </Typography>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Total Cars"
                        value={stats.total}
                        icon={<CarsIcon />}
                        color="primary"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Available"
                        value={stats.available}
                        icon={<AvailableIcon />}
                        color="success"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Rented"
                        value={stats.rented}
                        icon={<RentedIcon />}
                        color="error"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard
                        title="Total Revenue/Day"
                        value={`$${stats.revenue}`}
                        icon={<MoneyIcon />}
                        color="warning"
                    />
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Cars by Brand
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={brandData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="brand" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#1976d2" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                Availability Status
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={availabilityData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {availabilityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#4caf50' : '#f44336'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Cars Table */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Recent Cars
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Brand</strong></TableCell>
                                    <TableCell><strong>Model</strong></TableCell>
                                    <TableCell><strong>Year</strong></TableCell>
                                    <TableCell><strong>Price/Day</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cars.slice(0, 5).map((car) => (
                                    <TableRow key={car.id} hover>
                                        <TableCell>{car.brand}</TableCell>
                                        <TableCell>{car.model}</TableCell>
                                        <TableCell>{car.year}</TableCell>
                                        <TableCell>${car.pricePerDay}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={car.available ? 'Available' : 'Rented'}
                                                color={car.available ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
