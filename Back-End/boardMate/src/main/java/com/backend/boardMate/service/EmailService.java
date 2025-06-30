// package com.backend.boardMate.service;

// import com.backend.boardMate.model.PaymentBookingDetails;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.MailException;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.scheduling.annotation.Async;
// import org.springframework.stereotype.Service;
// import org.thymeleaf.TemplateEngine;
// import org.thymeleaf.context.Context;

// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;
// import java.time.format.DateTimeFormatter;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.concurrent.CompletableFuture;

// @Service
// public class EmailService {
//     private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

//     private final JavaMailSender emailSender;
//     private final TemplateEngine templateEngine;
//     private final String fromEmail;
//     private final String baseUrl;
//     private final String supportEmail;

//     @Autowired
//     public EmailService(JavaMailSender emailSender,
//                       TemplateEngine templateEngine,
//                       @Value("${spring.mail.username}") String fromEmail,
//                       @Value("${app.base-url}") String baseUrl,
//                       @Value("${app.support-email}") String supportEmail) {
//         this.emailSender = emailSender;
//         this.templateEngine = templateEngine;
//         this.fromEmail = fromEmail;
//         this.baseUrl = baseUrl;
//         this.supportEmail = supportEmail;
//     }

//     /**
//      * Sends a simple text email synchronously
//      */
//     public void sendSimpleEmail(String to, String subject, String text) {
//         try {
//             SimpleMailMessage message = new SimpleMailMessage();
//             message.setFrom(fromEmail);
//             message.setTo(to);
//             message.setSubject(subject);
//             message.setText(text);
//             emailSender.send(message);

//             logger.info("Simple email sent successfully to {}", to);
//         } catch (MailException e) {
//             logger.error("Failed to send simple email to {}: {}", to, e.getMessage());
//             throw new EmailException("Failed to send email to " + to, e);
//         }
//     }

//     /**
//      * Sends an HTML payment receipt email asynchronously
//      */
//     @Async
//     public CompletableFuture<Void> sendPaymentReceipt(PaymentBookingDetails booking, String recipientEmail) {
//         try {
//             MimeMessage message = emailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

//             String subject = "Your BoardMate Booking Confirmation #" + booking.getId();
//             Map<String, Object> templateVariables = createReceiptTemplateVariables(booking);
//             String htmlContent = processTemplate("email/payment-receipt", templateVariables);

//             helper.setFrom(fromEmail);
//             helper.setTo(recipientEmail);
//             helper.setSubject(subject);
//             helper.setText(htmlContent, true);

//             emailSender.send(message);
//             logger.info("Payment receipt sent successfully to {}", recipientEmail);
//             return CompletableFuture.completedFuture(null);
//         } catch (MessagingException e) {
//             logger.error("Failed to send payment receipt to {}: {}", recipientEmail, e.getMessage());
//             throw new EmailException("Failed to send payment receipt", e);
//         } catch (Exception e) {
//             logger.error("Unexpected error sending payment receipt: {}", e.getMessage());
//             throw new EmailException("Unexpected error sending email", e);
//         }
//     }

//     /**
//      * Processes a Thymeleaf template with the given variables
//      */
//     private String processTemplate(String templateName, Map<String, Object> variables) {
//         Context context = new Context();
//         context.setVariables(variables);
//         return templateEngine.process(templateName, context);
//     }

//     /**
//      * Creates template variables for the receipt email
//      */
//     private Map<String, Object> createReceiptTemplateVariables(PaymentBookingDetails booking) {
//         Map<String, Object> variables = new HashMap<>();
        
//         variables.put("booking", booking);
//         variables.put("orderId", booking.getId());
//         variables.put("formattedDate", booking.getBookingDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
//         variables.put("formattedAmount", String.format("Rs. %,.2f", booking.getPrice()));
//         variables.put("propertyName", booking.getPropertyName());
//         variables.put("propertyAddress", booking.getPropertyAddress());
//         variables.put("supportEmail", supportEmail);
//         variables.put("baseUrl", baseUrl);
        
//         return variables;
//     }

//     public static class EmailException extends RuntimeException {
//         public EmailException(String message) {
//             super(message);
//         }

//         public EmailException(String message, Throwable cause) {
//             super(message, cause);
//         }
//     }
// }

// package com.backend.boardMate.service;

// import com.backend.boardMate.model.PaymentBookingDetails;
// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.stereotype.Service;
// import org.thymeleaf.TemplateEngine;
// import org.thymeleaf.context.Context;

// import java.time.format.DateTimeFormatter;
// import java.util.HashMap;
// import java.util.Map;

// @Service
// public class EmailService {
//     private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

//     private final JavaMailSender mailSender;
//     private final TemplateEngine templateEngine;
//     private final String fromEmail;
//     private final String supportEmail;

//     public EmailService(JavaMailSender mailSender,
//                        TemplateEngine templateEngine,
//                        @Value("${spring.mail.username}") String fromEmail,
//                        @Value("${app.support-email}") String supportEmail) {
//         this.mailSender = mailSender;
//         this.templateEngine = templateEngine;
//         this.fromEmail = fromEmail;
//         this.supportEmail = supportEmail;
//     }

//     public void sendPaymentReceipt(PaymentBookingDetails payment, String recipientEmail) {
//         try {
//             MimeMessage message = mailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

//             String subject = "Your Payment Receipt #" + payment.getTransactionId();
//             String htmlContent = generateReceiptHtml(payment);

//             helper.setFrom(fromEmail);
//             helper.setTo(recipientEmail);
//             helper.setSubject(subject);
//             helper.setText(htmlContent, true);

//             mailSender.send(message);
//             logger.info("Payment receipt email sent to {}", recipientEmail);
//         } catch (MessagingException e) {
//             logger.error("Failed to send payment receipt to {}: {}", recipientEmail, e.getMessage());
//             throw new RuntimeException("Failed to send payment receipt", e);
//         }
//     }

//     private String generateReceiptHtml(PaymentBookingDetails payment) {
//         Map<String, Object> variables = new HashMap<>();
//         variables.put("payment", payment);
//         variables.put("formattedDate", payment.getBookingDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
//         variables.put("formattedAmount", String.format("Rs. %,.2f", payment.getPrice()));
//         variables.put("supportEmail", supportEmail);

//         Context context = new Context();
//         context.setVariables(variables);
//         return templateEngine.process("email/payment-receipt", context);
//     }
// }

// package com.backend.boardMate.service;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.stereotype.Service;
// import org.thymeleaf.TemplateEngine;
// import org.thymeleaf.context.Context;

// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;
// import java.time.format.DateTimeFormatter;
// import java.util.HashMap;
// import java.util.Map;

// @Service
// public class EmailService {
//     private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

//     private final JavaMailSender mailSender;
//     private final TemplateEngine templateEngine;
//     private final String fromEmail;
//     private final String supportEmail;

//     public EmailService(JavaMailSender mailSender,
//                       TemplateEngine templateEngine,
//                       @Value("${spring.mail.username}") String fromEmail,
//                       @Value("${app.support-email}") String supportEmail) {
//         this.mailSender = mailSender;
//         this.templateEngine = templateEngine;
//         this.fromEmail = fromEmail;
//         this.supportEmail = supportEmail;
//     }

//     /**
//      * Sends a simple text email
//      */
//     public void sendSimpleEmail(String to, String subject, String text) {
//         try {
//             SimpleMailMessage message = new SimpleMailMessage();
//             message.setFrom(fromEmail);
//             message.setTo(to);
//             message.setSubject(subject);
//             message.setText(text);
//             mailSender.send(message);
//             logger.info("Simple email sent to {}", to);
//         } catch (Exception e) {
//             logger.error("Failed to send simple email to {}: {}", to, e.getMessage());
//             throw new RuntimeException("Failed to send email", e);
//         }
//     }

//     /**
//      * Sends an HTML payment receipt email
//      */
//     public void sendPaymentReceipt(PaymentBookingDetails payment, String recipientEmail) {
//         try {
//             MimeMessage message = mailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

//             String subject = "Your Payment Receipt #" + payment.getTransactionId();
//             String htmlContent = generateReceiptHtml(payment);

//             helper.setFrom(fromEmail);
//             helper.setTo(recipientEmail);
//             helper.setSubject(subject);
//             helper.setText(htmlContent, true);

//             mailSender.send(message);
//             logger.info("Payment receipt sent to {}", recipientEmail);
//         } catch (MessagingException e) {
//             logger.error("Failed to send payment receipt to {}: {}", recipientEmail, e.getMessage());
//             throw new RuntimeException("Failed to send payment receipt", e);
//         }
//     }

//     private String generateReceiptHtml(PaymentBookingDetails payment) {
//         Map<String, Object> variables = new HashMap<>();
//         variables.put("payment", payment);
//         variables.put("formattedDate", payment.getBookingDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")));
//         variables.put("formattedAmount", String.format("Rs. %,.2f", payment.getPrice()));
//         variables.put("supportEmail", supportEmail);

//         Context context = new Context();
//         context.setVariables(variables);
//         return templateEngine.process("email/payment-receipt", context);
//     }
// }

package com.backend.boardMate.service;

import com.backend.boardMate.model.PaymentBookingDetails; // Add this import
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