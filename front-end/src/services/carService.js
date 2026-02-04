import api from './api';

export const getAllCars = async () => {
    try {
        const response = await api.get('');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCarById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCar = async (car) => {
    try {
        const response = await api.post('', car);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCar = async (id, car) => {
    try {
        const response = await api.put(`/${id}`, car);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCar = async (id) => {
    try {
        await api.delete(`/${id}`);
    } catch (error) {
        throw error;
    }
};
