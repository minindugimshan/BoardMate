package com.backend.boardMate.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class TwilioConfig {
    private String accountSid;
    private String authToken;
    private String verifyServiceSid;

    @PostConstruct
    public void validate() {
        if (accountSid == null || authToken == null || verifyServiceSid == null) {
            throw new IllegalStateException(
                "Twilio configuration is missing. Please check your application.properties file");
        }
    }

    public String getVerifyServiceSid() {
        return verifyServiceSid;
    }

    public String getAccountSid() {
        return accountSid;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAccountSid(String accountSid) { this.accountSid = accountSid; }
    public void setAuthToken(String authToken) { this.authToken = authToken; }
    public void setVerifyServiceSid(String verifyServiceSid) { this.verifyServiceSid = verifyServiceSid; }

    // Getters and setters...
}
