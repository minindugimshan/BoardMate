package com.backend.boardMate.service;

import com.backend.boardMate.model.User;
import com.backend.boardMate.repository.UserRepository;
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
                             String day, String month, String year, String userType) {
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
        user.setUserType(userType);
        return userRepository.save(user);
    }

    public User registerStudent(String email, String password, String firstName, String lastName, String mobile,
                                String day, String month, String year) {
        // Check if the user's document has been verified
        boolean isVerified = verificationService.isDocumentVerified(email);

        // Register the student
        User student = registerUser(email, password, firstName, lastName, mobile, day, month, year, "STUDENT");
        // Additional student-specific settings could be added here

        return student;
    }

    public User registerLandlord(String email, String password, String firstName, String lastName, String mobile,
                                 String day, String month, String year, boolean isVerified) {
        // Check if verification is required
        if (!isVerified) {
            throw new RuntimeException("Landlord must be verified before registration");
        }

        // Create the user as a landlord
        User landlord = registerUser(email, password, firstName, lastName, mobile, day, month, year, "LANDLORD");
        // Additional landlord-specific settings could be added here

        return landlord;
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword());
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}