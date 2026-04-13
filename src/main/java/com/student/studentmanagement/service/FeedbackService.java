package com.student.studentmanagement.service;

import com.student.studentmanagement.model.Feedback;
import com.student.studentmanagement.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Save logic
    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Admin logic: Get feedback by ID
    public List<Feedback> getFeedbackByStudentId(Long studentId) {
        return feedbackRepository.findByStudentId(studentId);
    }
    
    //use to check student already submit feedback or not
    public boolean hasSubmitted(Long studentId) {
        return feedbackRepository.existsByStudentId(studentId);
    }
}
