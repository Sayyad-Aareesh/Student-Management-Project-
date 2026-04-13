package com.student.studentmanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "student_feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentName;
    private String studentEmail;

    // Fixed Mapping: Using 'responses_key' to match MySQL expectations
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "feedback_responses", 
        joinColumns = @JoinColumn(name = "feedback_id")
    )
    @MapKeyColumn(name = "responses_key") 
    @Column(name = "answer")
    private Map<String, String> responses;

    private LocalDateTime submittedAt;

    // Default Constructor (Required by JPA)
    public Feedback() {
        this.submittedAt = LocalDateTime.now();
    }

    // Parameterized Constructor
    public Feedback(Long studentId, String studentName, String studentEmail, Map<String, String> responses) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.responses = responses;
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public Map<String, String> getResponses() { return responses; }
    public void setResponses(Map<String, String> responses) { this.responses = responses; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
