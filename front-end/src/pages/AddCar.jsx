import React, { useState } from 'react';
import { createCar } from '../services/carService';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const navigate = useNavigate();
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        available: true
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCar({
            ...car,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCar(car);
            // Clear form
            setCar({ brand: '', model: '', year: '', pricePerDay: '', available: true });
            // Redirect to list
            navigate('/');
        } catch (err) {
            console.error("Error creating car:", err);
            setError('Failed to create car. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={car.brand}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Model</label>
                    <input
                        type="text"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-semibold mb-2">Year</label>
                        <input
                            type="number"
                            name="year"
                            value={car.year}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-semibold mb-2">Price Per Day</label>
                        <input
                            type="number"
                            name="pricePerDay"
                            value={car.pricePerDay}
                            onChange={handleChange}
                            required
                            step="0.01"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="available"
                            checked={car.available}
                            onChange={handleChange}
                            className="mr-2 h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700 font-semibold">Available for Rent</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCar;
