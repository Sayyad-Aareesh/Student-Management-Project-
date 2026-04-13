package com.student.studentmanagement.repository;

import com.student.studentmanagement.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // This allows the Admin to find feedback using the Student's ID
    List<Feedback> findByStudentId(Long studentId);
    
    // 2. Used by Controller to prevent duplicate submissions
    boolean existsByStudentId(Long studentId);
}
