package com.example.carrental.controller;

import com.example.carrental.dto.RentalDTO;
import com.example.carrental.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "*")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<RentalDTO> getAllRentals() {
        return rentalService.getAllRentals();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    public List<RentalDTO> getRentalsByUser(@PathVariable Long userId) {
        return rentalService.getRentalsByUser(userId);
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    public ResponseEntity<RentalDTO> createRental(@RequestBody RentalDTO rentalDTO) {
        return new ResponseEntity<>(rentalService.createRental(rentalDTO), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RentalDTO> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(rentalService.updateStatus(id, status));
    }
}
