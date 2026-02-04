package com.example.carrental.controller;

import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.RentalRepository;
import com.example.carrental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "*")
public class StatisticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RentalRepository rentalRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalCars = carRepository.count();
        long totalRentals = rentalRepository.count();

        long availableCars = carRepository.findAll().stream().filter(c -> c.isAvailable()).count();
        long rentedCars = totalCars - availableCars;

        stats.put("totalUsers", totalUsers);
        stats.put("totalCars", totalCars);
        stats.put("totalRentals", totalRentals);
        stats.put("availableCars", availableCars);
        stats.put("rentedCars", rentedCars);

        return ResponseEntity.ok(stats);
    }
}
