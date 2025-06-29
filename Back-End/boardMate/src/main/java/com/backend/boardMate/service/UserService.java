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
        return user;
    }

    public User registerStudent(String email, String password, String firstName, String lastName, String mobile,
                                String day, String month, String year, String university, String universityId) {

        // Register the student
        User student = registerUser(email, password, firstName, lastName, mobile, day, month, year, "STUDENT");
        // Additional student-specific settings could be added here
        student.setUniversity(university);
        student.setUniversityId(universityId);

        return userRepository.save(student);
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

        return userRepository.save(landlord);
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword());
    }

    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return user;
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return user;
    }

    public void markUserAsVerified(String recipient) {
        Optional<User> userOpt = userRepository.findByEmail(recipient);
        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByMobile(recipient);
        }
        userOpt.ifPresent(user -> {
            user.setVerified(true);
            userRepository.save(user);
        });
    }

    public User updateUserProfile(Long userId, String firstName, String lastName, String mobile,
                                  String dateOfBirthDay, String dateOfBirthMonth, String dateOfBirthYear,
                                  String university, String universityId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        if (firstName != null) user.setFirstName(firstName);
        if (lastName != null) user.setLastName(lastName);
        if (mobile != null) user.setMobile(mobile);
        if (dateOfBirthDay != null) user.setDateOfBirthDay(dateOfBirthDay);
        if (dateOfBirthMonth != null) user.setDateOfBirthMonth(dateOfBirthMonth);
        if (dateOfBirthYear != null) user.setDateOfBirthYear(dateOfBirthYear);
        if (university != null) user.setUniversity(university);
        if (universityId != null) user.setUniversityId(universityId);
        
        return userRepository.save(user);
    }
}