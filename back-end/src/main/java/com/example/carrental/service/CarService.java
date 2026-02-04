package com.example.carrental.service;

import com.example.carrental.dto.CarDTO;
import java.util.List;

public interface CarService {
    List<CarDTO> getAllCars();

    CarDTO getCarById(Long id);

    CarDTO createCar(CarDTO carDTO);

    CarDTO updateCar(Long id, CarDTO carDTO);

    void deleteCar(Long id);
}
