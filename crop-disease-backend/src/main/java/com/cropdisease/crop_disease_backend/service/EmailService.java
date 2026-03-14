package com.cropdisease.crop_disease_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${spring.mail.username:}")
    private String senderEmail;

    // For now, we omit the actual JavaMailSender injection to avoid crashes if SMTP is not fully configured.
    // We will simulate sending the email by logging the OTP to the console.

    public void sendOtpEmail(String to, String otp) {
        // Simulated Console Email
        logger.info("\n=======================================================");
        logger.info("EMAIL DISPATCH SECURE COMM-LINK");
        logger.info("TO: {}", to);
        logger.info("SUBJECT: Agri-Tech Intelligence Console - Authentication");
        logger.info("BODY: Your secure access code is: {}", otp);
        logger.info("      This code will expire in 5 minutes.");
        logger.info("=======================================================\n");

        if (senderEmail != null && !senderEmail.isEmpty()) {
            logger.warn("SMTP credentials detected but actual email sending is bypassed for local development.");
        }
    }
}
