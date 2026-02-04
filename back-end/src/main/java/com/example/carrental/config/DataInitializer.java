package com.example.carrental.config;

import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Users
        if (!userRepository.existsByEmail("admin@drivehub.com")) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@drivehub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@drivehub.com / admin123");
        }

        if (!userRepository.existsByEmail("client@drivehub.com")) {
            User client = new User();
            client.setName("John Doe");
            client.setEmail("client@drivehub.com");
            client.setPassword(passwordEncoder.encode("client123"));
            client.setRole("CLIENT");
            userRepository.save(client);
            System.out.println("Default client user created: client@drivehub.com / client123");
        }

        // Seed Cars if empty
        if (carRepository.count() == 0) {
            createCar("Mercedes", "C-Class", 2023, 120.0);
            createCar("BMW", "M4 Competition", 2024, 250.0);
            createCar("Audi", "RS6 Avant", 2023, 220.0);
            createCar("Range Rover", "Sport HSE", 2024, 180.0);
            createCar("Volkswagen", "Golf 8 GTI", 2022, 90.0);
            System.out.println("Sample car fleet initialized.");
        }
    }

    private void createCar(String brand, String model, int year, double price) {
        Car car = new Car();
        car.setBrand(brand);
        car.setModel(model);
        car.setYear(year);
        car.setPricePerDay(price);
        car.setAvailable(true);
        carRepository.save(car);
    }
}
