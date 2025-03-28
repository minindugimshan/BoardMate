package com.backend.boardMate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableJpaRepositories(basePackages = "com.backend.boardMate.repository")
public class BoardMateApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoardMateApplication.class, args);
	}

}
