package com.cropdisease.crop_disease_backend.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    // Store OTPs in memory for now. Key: email, Value: OTP string
    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();
    
    // Executor to schedule OTP removal
    private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
    
    private final SecureRandom secureRandom = new SecureRandom();
    private static final int OTP_EXPIRATION_MINUTES = 5;

    public String generateOtp(String email) {
        // Generate a 6-digit cryptographic, secure OTP
        int number = secureRandom.nextInt(999999);
        String otp = String.format("%06d", number);
        
        // Store it
        otpStorage.put(email, otp);
        
        // Schedule removal after expiration
        executorService.schedule(() -> {
            otpStorage.remove(email);
        }, OTP_EXPIRATION_MINUTES, TimeUnit.MINUTES);
        
        return otp;
    }

    public boolean validateOtp(String email, String otp) {
        if (email == null || otp == null) {
            return false;
        }
        
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            // OTP is valid, remove it so it can't be used again
            otpStorage.remove(email);
            return true;
        }
        return false;
    }
}
