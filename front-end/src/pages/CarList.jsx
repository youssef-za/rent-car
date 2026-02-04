import React, { useEffect, useState } from 'react';
import { getAllCars, deleteCar } from '../services/carService';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCars();
    }, []);

    const loadCars = async () => {
        try {
            const data = await getAllCars();
            setCars(data);
        } catch (err) {
            setError('Failed to fetch cars');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteCar(id);
                setCars(cars.filter(car => car.id !== id));
            } catch (err) {
                console.error("Error deleting car:", err);
                alert("Failed to delete car");
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Car List</h2>
                <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Car</Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Brand</th>
                            <th className="py-2 px-4 border-b text-left">Model</th>
                            <th className="py-2 px-4 border-b text-left">Year</th>
                            <th className="py-2 px-4 border-b text-left">Price/Day</th>
                            <th className="py-2 px-4 border-b text-center">Available</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">No cars found.</td>
                            </tr>
                        ) : (
                            cars.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{car.brand}</td>
                                    <td className="py-2 px-4 border-b">{car.model}</td>
                                    <td className="py-2 px-4 border-b">{car.year}</td>
                                    <td className="py-2 px-4 border-b">${car.pricePerDay}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {car.available ? (
                                            <span className="text-green-600 font-semibold">Yes</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">No</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleDelete(car.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarList;
