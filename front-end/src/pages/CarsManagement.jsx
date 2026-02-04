import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    IconButton,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllCars, deleteCar } from '../services/carService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

const CarsManagement = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [deleteDialog, setDeleteDialog] = useState({ open: false, carId: null });

    useEffect(() => {
        loadCars();
    }, []);

    useEffect(() => {
        filterCars();
    }, [cars, searchQuery, statusFilter]);

    const loadCars = async () => {
        try {
            const data = await getAllCars();
            setCars(data);
        } catch (error) {
            console.error('Error loading cars:', error);
            toast.error('Failed to load cars');
        } finally {
            setLoading(false);
        }
    };

    const filterCars = () => {
        let filtered = [...cars];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (car) =>
                    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    car.year.toString().includes(searchQuery)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter((car) =>
                statusFilter === 'available' ? car.available : !car.available
            );
        }

        setFilteredCars(filtered);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteClick = (carId) => {
        setDeleteDialog({ open: true, carId });
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteCar(deleteDialog.carId);
            setCars(cars.filter((car) => car.id !== deleteDialog.carId));
            toast.success('Car deleted successfully');
        } catch (error) {
            console.error('Error deleting car:', error);
            toast.error('Failed to delete car');
        } finally {
            setDeleteDialog({ open: false, carId: null });
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Cars Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/cars/add')}
                >
                    Add New Car
                </Button>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search by brand, model, or year..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={statusFilter}
                                label="Status"
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="available">Available</MenuItem>
                                <MenuItem value="rented">Rented</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
                            Total: {filteredCars.length} car(s)
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Table */}
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.100' }}>
                                <TableCell><strong>ID</strong></TableCell>
                                <TableCell><strong>Brand</strong></TableCell>
                                <TableCell><strong>Model</strong></TableCell>
                                <TableCell><strong>Year</strong></TableCell>
                                <TableCell><strong>Price/Day</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCars.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">No cars found</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCars
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((car) => (
                                        <TableRow key={car.id} hover>
                                            <TableCell>{car.id}</TableCell>
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
                                            <TableCell align="center">
                                                <Tooltip title="View">
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={() => navigate(`/cars/${car.id}`)}
                                                    >
                                                        <ViewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => navigate(`/cars/edit/${car.id}`)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleDeleteClick(car.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={filteredCars.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteDialog.open}
                title="Delete Car"
                message="Are you sure you want to delete this car? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteDialog({ open: false, carId: null })}
            />
        </Box>
    );
};

export default CarsManagement;
