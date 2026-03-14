package com.cropdisease.crop_disease_backend;

import com.cropdisease.crop_disease_backend.model.User;
import com.cropdisease.crop_disease_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CropDiseaseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CropDiseaseBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initSuperiorAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			String superAdminEmail = "ajaykalimuthu05@gmail.com";
			if (userRepository.findByEmail(superAdminEmail).isEmpty()) {
				User superAdmin = User.builder()
						.email(superAdminEmail)
						.password(passwordEncoder.encode("Ajay@2005"))
						.fullName("Superior Admin")
						.role(User.Role.ADMIN)
						.build();
				userRepository.save(superAdmin);
				System.out.println("Superior Admin account created successfully!");
			}
		};
	}
}
