package com.backend.boardMate.service;

import com.backend.boardMate.model.PaymentBookingDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final String fromEmail;
    private final String supportEmail;

    public EmailService(JavaMailSender mailSender,
                      TemplateEngine templateEngine,
                      @Value("${spring.mail.username}") String fromEmail,
                      @Value("${app.support-email}") String supportEmail) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
        this.fromEmail = fromEmail;
        this.supportEmail = supportEmail;
    }

    /**
     * Sends a simple text email
     */
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Simple email sent to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send simple email to {}: {}", to, e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Sends an HTML payment receipt email
     */
    public void sendPaymentReceipt(PaymentBookingDetails payment, String recipientEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String subject = "Your Payment Receipt #" + payment.getTransactionId();
            String htmlContent = generateReceiptHtml(payment);

            helper.setFrom(fromEmail);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Payment receipt sent to {}", recipientEmail);
        } catch (MessagingException e) {
            logger.error("Failed to send payment receipt to {}: {}", recipientEmail, e.getMessage());
            throw new RuntimeException("Failed to send payment receipt", e);
        }
    }

    private String generateReceiptHtml(PaymentBookingDetails payment) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("payment", payment);
        variables.put("formattedDate", payment.getBookingDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
        variables.put("formattedAmount", String.format("Rs. %,.2f", payment.getPrice()));
        variables.put("supportEmail", supportEmail);

        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process("email/payment-receipt", context);
    }
}