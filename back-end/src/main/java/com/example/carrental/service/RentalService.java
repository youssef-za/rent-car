package com.example.carrental.service;

import com.example.carrental.dto.RentalDTO;
import java.util.List;

public interface RentalService {
    List<RentalDTO> getAllRentals();

    List<RentalDTO> getRentalsByUser(Long userId);

    RentalDTO createRental(RentalDTO rentalDTO);

    RentalDTO updateStatus(Long id, String status);
}
