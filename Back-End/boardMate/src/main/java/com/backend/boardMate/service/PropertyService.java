package com.backend.boardMate.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.boardMate.model.Property;
import com.backend.boardMate.model.User;
import com.backend.boardMate.model.VirtualTour;
import com.backend.boardMate.model.Chat;
// import com.backend.boardMate.entity.Property;
// import com.backend.boardMate.entity.VirtualTour;

import com.backend.boardMate.repository.PropertyRepository;
import com.backend.boardMate.repository.UserRepository;
import com.backend.boardMate.repository.VirtualTourRepository;
import com.backend.boardMate.repository.ChatRepository;
import com.backend.boardMate.service.EmailService;
import com.backend.boardMate.service.ChatService;

import java.text.SimpleDateFormat;
import java.text.ParseException;

@Service
public class PropertyService {
    private static final Logger logger = LoggerFactory.getLogger(PropertyService.class);

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private VirtualTourRepository virtualTourRepository;

    // Add a new property
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ChatService chatService;

    // Add a new property
    public Property addProperty(Property property) {
        Property savedProperty = propertyRepository.save(property); // Save the property

        // Fetch all users to notify them
        List<User> users = userRepository.findAll();
        for (User user : users) {
            try {
                String subject = "New Property Added!";
                String text = "A new property has been added:\n" +
                        "Title: " + savedProperty.getTitle() + "\n" +
                        "Location: " + savedProperty.getLocation() + "\n" +
                        "Price: " + savedProperty.getPrice() + "\n" +
                        "For more details, visit our website.";

                emailService.sendSimpleEmail(user.getEmail(), subject, text);

            } catch (Exception e) {
                logger.error("Failed to send email to {}: {}", user.getEmail(), e.getMessage());
            }
        }


        return savedProperty; // Return the saved property
    }

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get a property by ID
    public Property getPropertyById(Long id) {
        Property property = propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Property not found with id: " + id));
        property = this.updatePropertyViewCount(property);
        return property;
    }

    // Update a property
    public Property updateProperty(Long id, Property property) {
        Property existingProperty = getPropertyById(id); // Fetch the existing property

        // Update basic fields
        existingProperty.setTitle(property.getTitle());
        existingProperty.setLocation(property.getLocation());
        existingProperty.setLatitude(property.getLatitude());
        existingProperty.setLongitude(property.getLongitude());
        existingProperty.setMapLink(property.getMapLink());
        existingProperty.setPrice(property.getPrice());
        existingProperty.setType(property.getType());
        existingProperty.setBedrooms(property.getBedrooms());
        existingProperty.setBathrooms(property.getBathrooms());
        existingProperty.setRooms(property.getRooms());
        existingProperty.setArea(property.getArea());
        existingProperty.setDescription(property.getDescription());
        // existingProperty.setAmenities(property.getAmenities());
        // existingProperty.setImageUrls(property.getImageUrls());
        existingProperty.setAddress(property.getAddress());
        existingProperty.setContactNumber(property.getContactNumber());
        existingProperty.setRating(property.getRating());
        existingProperty.setUniversity(property.getUniversity());


        return propertyRepository.save(existingProperty); // Save the updated property
    }

    // Delete a property
    public void deleteProperty(Long id) {
        Property property = getPropertyById(id); // Fetch the property

        // Delete the virtual tour if it exists
        // if (property.getVirtualTour() != null) {
        //     virtualTourRepository.delete(property.getVirtualTour());
        // }

        propertyRepository.deleteById(id); // Delete the property
    }

    // Get properties by landlord ID
    public List<Property> getPropertiesByLandlordId(Integer landlordId) {
        return propertyRepository.findByLandlordId(landlordId);
    }

    // search using query for location, type, price range, rooms, bathrooms, bedrooms
    public List<Property> searchProperties(String location, String type, Double minPrice, Double maxPrice) {
        return propertyRepository.search(location, type, minPrice, maxPrice);
    }


    public Property updatePropertyViewCount(Property property) {
        property.setViews(property.getViews() + 1);
        return propertyRepository.save(property);
    }

    public Property updatePropertyInquiryCount(Long id) {
        Property existingProperty = propertyRepository.getReferenceById(id); // Fetch the existing property
        existingProperty.setInquiries(existingProperty.getInquiries() + 1);
        return propertyRepository.saveAndFlush(existingProperty);
    }

    public void bookATour(Long propertyID, Long studentID, String tourDateTime) {
        try {
            VirtualTour virtualTour = new VirtualTour();
            // tourDateTime is a iso string
            try {
                // Handle ISO string format with milliseconds and timezone
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                try {
                    virtualTour.setDate(dateFormat.parse(tourDateTime));
                } catch (ParseException e1) {
                    // Try without milliseconds
                    SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
                    try {
                        virtualTour.setDate(dateFormat2.parse(tourDateTime));
                    } catch (ParseException e2) {
                        // Try without timezone
                        SimpleDateFormat dateFormat3 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                        virtualTour.setDate(dateFormat3.parse(tourDateTime));
                    }
                }
            } catch (ParseException e) {
                throw new RuntimeException("Invalid date format for tourDateTime: " + tourDateTime, e);
            }
            virtualTour.setPropertyId(propertyID);
            virtualTour.setStudentId(studentID);
            virtualTourRepository.save(virtualTour);

            logger.info("Tour booked successfully for property {} by student {}", propertyID, studentID);

            // --- NOTIFY LANDLORD VIA CHAT ---
            // Get property details for the chat message
            Property property = propertyRepository.findById(propertyID)
                    .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyID));
            // Get student details for the chat message
            User student = userRepository.findById(studentID)
                    .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentID));
            // Start or get existing chat between student and landlord
            Chat chat = chatService.startChat(studentID, property.getLandlordId().longValue(), propertyID);
            // Create tour booking message
            SimpleDateFormat displayFormat = new SimpleDateFormat("EEEE, MMMM dd, yyyy 'at' hh:mm a");
            String formattedDateTime = displayFormat.format(virtualTour.getDate());
            
            // Generate Google Meeting link (you can replace this with actual Google Calendar API integration)
            String googleMeetingLink = generateGoogleMeetingLink(property.getTitle(), formattedDateTime, student.getFirstName() + " " + student.getLastName(), virtualTour.getDate());
            
            String messageContent = String.format(
                "🏠 **Tour Booking Request**\n\n" +
                "Hello! I would like to book a tour for your property.\n\n" +
                "**Property Details:**\n" +
                "Property: %s\n" +
                "Address: %s\n\n" +
                "**Tour Details:**\n" +
                "Requested Date & Time: %s\n\n" +
                "**Student Information:**\n" +
                "Name: %s %s\n" +
                "Email: %s\n\n" +
                "**Virtual Tour Meeting:**\n" +
                " 🔗 Google Meet Link: %s\n\n" +
                "Please confirm if this time works for you or suggest an alternative.\n" +
                "You can join the meeting using the link above for the virtual tour.\n" +
                "Thank you!",
                property.getTitle(),
                property.getAddress(),
                formattedDateTime,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                googleMeetingLink
            );
            // Send the message to the landlord
            chatService.sendMessage(chat.getId(), studentID, "STUDENT", messageContent);

        } catch (Exception e) {
            logger.error("Error booking tour for property {} by student {}: {}", propertyID, studentID, e.getMessage(), e);
            throw e;
        }
    }

    // Add images to a property
    public Property addImagesToProperty(Long propertyId, List<String> imageReferences) {
        Property property = propertyRepository.getReferenceById(propertyId);
        List<String> existingImages =  property.getImagesList() != null && property.getImagesList().split(",").length > 0 ? List.of(property.getImagesList().split(",")) : null;
        if (existingImages == null) {
            existingImages = new ArrayList<>();
        }
        existingImages.addAll(imageReferences);
        property.setImagesList(String.join(",", existingImages));
        return propertyRepository.save(property);
    }

    /**
     * Generate a Google Meeting link for virtual tour
     * Note: This is a simple implementation. For production, consider using Google Calendar API
     * to create actual calendar events with meeting links.
     */
    private String generateGoogleMeetingLink(String propertyTitle, String dateTime, String studentName, Date tourDate) {
        try {
            // Create a simple Google Meet link
            // In production, you would use Google Calendar API to create an actual meeting
            String meetingTitle = "Virtual Tour - " + propertyTitle + " with " + studentName;
            String encodedTitle = java.net.URLEncoder.encode(meetingTitle, "UTF-8");
            
            // Generate a unique meeting ID (you can make this more sophisticated)
            String meetingId = "boardmate-" + System.currentTimeMillis();
            
            // Create Google Meet link
            String googleMeetLink = "https://meet.google.com/" + meetingId;
            
            // Calculate end time (1 hour after start time)
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(tourDate);
            calendar.add(Calendar.HOUR, 1);
            Date endDate = calendar.getTime();
            
            // Alternative: Create a calendar event link (opens Google Calendar)
            String calendarLink = String.format(
                "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%s&dates=%s/%s&details=Virtual%%20Tour%%20for%%20%s%%20with%%20%s",
                encodedTitle,
                getCalendarDate(tourDate),
                getCalendarDate(endDate),
                propertyTitle,
                studentName
            );
            
            return googleMeetLink + "\n📅 Create Calendar Event: " + calendarLink;
            
        } catch (Exception e) {
            logger.error("Error generating Google Meeting link: {}", e.getMessage());
            return "https://meet.google.com/boardmate-tour-" + System.currentTimeMillis();
        }
    }
    
    /**
     * Convert Date to Google Calendar format (YYYYMMDDTHHMMSSZ)
     */
    private String getCalendarDate(Date date) {
        SimpleDateFormat calendarFormat = new SimpleDateFormat("yyyyMMdd'T'HHmmss'Z'");
        return calendarFormat.format(date);
    }
    
    /**
     * Get student details for a booked property
     */
    public Map<String, Object> getStudentDetailsForProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
        
        if (property.getStudentId() == null) {
            throw new RuntimeException("This property is not booked by any student");
        }
        
        User student = userRepository.findById(property.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + property.getStudentId()));
        
        Map<String, Object> studentDetails = new java.util.HashMap<>();
        studentDetails.put("studentId", student.getId());
        studentDetails.put("firstName", student.getFirstName());
        studentDetails.put("lastName", student.getLastName());
        studentDetails.put("email", student.getEmail());
        studentDetails.put("mobile", student.getMobile());
        studentDetails.put("university", student.getUniversity());
        studentDetails.put("universityId", student.getUniversityId());
        studentDetails.put("dateOfBirthDay", student.getDateOfBirthDay());
        studentDetails.put("dateOfBirthMonth", student.getDateOfBirthMonth());
        studentDetails.put("dateOfBirthYear", student.getDateOfBirthYear());
        studentDetails.put("verified", student.isVerified());
        
        return studentDetails;
    }
    
    /**
     * Book a property by setting the studentId
     */
    public Property bookProperty(Long propertyId, Long studentId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
        
        if (property.getStudentId() != null) {
            throw new RuntimeException("This property is already booked by another student");
        }
        
        // Verify the student exists
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        
        if (!"STUDENT".equals(student.getUserType())) {
            throw new RuntimeException("Only students can book properties");
        }
        
        property.setStudentId(studentId);
        return propertyRepository.save(property);
    }
    
    /**
     * Cancel booking by removing the studentId
     */
    public Property cancelBooking(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyId));
        
        property.setStudentId(null);
        return propertyRepository.save(property);
    }
}