package com.example.carrental.service.impl;

import com.example.carrental.dto.RentalDTO;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.Rental;
import com.example.carrental.entity.User;
import com.example.carrental.exception.ResourceNotFoundException;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.RentalRepository;
import com.example.carrental.repository.UserRepository;
import com.example.carrental.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RentalServiceImpl implements RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RentalDTO> getAllRentals() {
        return rentalRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<RentalDTO> getRentalsByUser(Long userId) {
        return rentalRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RentalDTO createRental(RentalDTO dto) {
        Car car = carRepository.findById(dto.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car not found"));
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available");
        }

        Rental rental = new Rental();
        rental.setCar(car);
        rental.setUser(user);
        rental.setStartDate(dto.getStartDate());
        rental.setEndDate(dto.getEndDate());

        long days = ChronoUnit.DAYS.between(rental.getStartDate(), rental.getEndDate());
        if (days <= 0)
            days = 1;
        rental.setTotalPrice(days * car.getPricePerDay());
        rental.setStatus("BOOKED");

        car.setAvailable(false);
        carRepository.save(car);

        return convertToDTO(rentalRepository.save(rental));
    }

    @Override
    public RentalDTO updateStatus(Long id, String status) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rental not found"));

        rental.setStatus(status.toUpperCase());

        if (status.equalsIgnoreCase("COMPLETED") || status.equalsIgnoreCase("CANCELLED")) {
            Car car = rental.getCar();
            car.setAvailable(true);
            carRepository.save(car);
        }

        return convertToDTO(rentalRepository.save(rental));
    }

    private RentalDTO convertToDTO(Rental rental) {
        RentalDTO dto = new RentalDTO();
        dto.setId(rental.getId());
        dto.setUserId(rental.getUser().getId());
        dto.setUserName(rental.getUser().getName());
        dto.setCarId(rental.getCar().getId());
        dto.setCarBrandModel(rental.getCar().getBrand() + " " + rental.getCar().getModel());
        dto.setStartDate(rental.getStartDate());
        dto.setEndDate(rental.getEndDate());
        dto.setTotalPrice(rental.getTotalPrice());
        dto.setStatus(rental.getStatus());
        return dto;
    }
}
