package com.student.studentmanagement.controller;

import com.student.studentmanagement.model.Feedback;
import com.student.studentmanagement.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback") // CHANGE THIS from /api/student
@CrossOrigin(origins = "http://localhost:3000") // Connects to your Next.js Frontend
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    /**
     * 1. Endpoint for Students to Submit Feedback
     * POST http://localhost:8087/api/student/submit-feedback
     */
    @PostMapping("/submit-feedback")
    public ResponseEntity<String> submitFeedback(@RequestBody Feedback feedback) {
        // 1. THIS IS THE UPDATION: Check for duplicate submission first
        if (feedbackService.hasSubmitted(feedback.getStudentId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("You have already submitted your feedback.");
        }

        try {
            // Log the incoming data for debugging
            System.out.println(">>> Received feedback for Student ID: " + feedback.getStudentId());
            
            feedbackService.saveFeedback(feedback);
            return ResponseEntity.status(HttpStatus.CREATED).body("Feedback submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to save feedback: " + e.getMessage());
        }
    }
    /**
     * 2. Admin Endpoint to View Feedback by Student ID
     * GET http://localhost:8087/api/student/admin/feedback/{id}
     */
    @GetMapping("/admin/feedback/{id}")
    public ResponseEntity<List<Feedback>> getFeedbackByStudent(@PathVariable("id") Long studentId) {
        List<Feedback> feedbacks = feedbackService.getFeedbackByStudentId(studentId);
        
        if (feedbacks.isEmpty()) {
            return ResponseEntity.noContent().build(); // Returns 204 if no feedback found
        }
        return ResponseEntity.ok(feedbacks);
    }
}
