package com.landlord.demo.service;

import com.landlord.demo.model.User;
import com.landlord.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationService verificationService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String email, String password, String firstName, String lastName, String mobile,
                             String day, String month, String year) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setMobile(mobile);
        user.setDateOfBirthDay(day);
        user.setDateOfBirthMonth(month);
        user.setDateOfBirthYear(year);

        return userRepository.save(user);
    }

    public User registerLandlord(String email, String password, String firstName, String lastName, String mobile,
                                 String day, String month, String year, boolean isVerified) {
        // Check if verification is required
        if (!isVerified) {
            throw new RuntimeException("Landlord must be verified before registration");
        }

        // Create the user as a landlord
        User landlord = registerUser(email, password, firstName, lastName, mobile, day, month, year);
        // Additional landlord-specific settings could be added here

        return landlord;
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword());
    }
}