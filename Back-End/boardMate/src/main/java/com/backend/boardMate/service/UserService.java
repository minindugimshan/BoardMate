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
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setMobile(mobile);
        user.setDateOfBirthDay(day);
        user.setDateOfBirthMonth(month);
        user.setDateOfBirthYear(year);
        user.setUserType(userType);
        user.setVerified(false); // Default to not verified
        verificationService.sendVerificationCodeToEmail(email);
        return userRepository.save(user);
    }

    public User registerStudent(String email, String password, String firstName, String lastName, String mobile,
                                String day, String month, String year, String university, String universityId) {
        User student = registerUser(email, password, firstName, lastName, mobile, day, month, year, "STUDENT");
        student.setUniversity(university);
        student.setUniversityId(universityId);
        return userRepository.save(student);
    }

    public User registerLandlord(String email, String password, String firstName, String lastName, String mobile,
                                 String day, String month, String year, boolean isVerified) {
        if (!isVerified) {
            throw new RuntimeException("Landlord must be verified before registration");
        }

        User landlord = registerUser(email, password, firstName, lastName, mobile, day, month, year, "LANDLORD");
        landlord.setVerified(true); // Landlords must be verified
        return userRepository.save(landlord);
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword());
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public String getUserEmailById(Long userId) {
        return userRepository.findById(userId)
                .map(User::getEmail)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public void markUserAsVerified(String recipient) {
        Optional<User> userOpt = userRepository.findByEmail(recipient);
        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByMobile(recipient);
        }
        User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
    }

    public User updateUserProfile(Long userId, String firstName, String lastName, String mobile,
                                  String dateOfBirthDay, String dateOfBirthMonth, String dateOfBirthYear,
                                  String university, String universityId) {
        User user = getUserById(userId);
        
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

    // New method to check if user exists
    public boolean userExists(Long userId) {
        return userRepository.existsById(userId);
    }

    // New method to get user's full name
    public String getUserFullName(Long userId) {
        User user = getUserById(userId);
        return user.getFirstName() + " " + user.getLastName();
    }

    // New method to get user's mobile number
    public String getUserMobile(Long userId) {
        return getUserById(userId).getMobile();
    }
}