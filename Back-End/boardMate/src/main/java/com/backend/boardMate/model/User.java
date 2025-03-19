package com.landlord.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String mobile;

    @Column
    private String dateOfBirthDay;

    @Column
    private String dateOfBirthMonth;

    @Column
    private String dateOfBirthYear;}
