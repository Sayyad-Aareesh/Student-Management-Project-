package com.student.studentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.student.studentmanagement.model.Student;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    
	// Check if email already exists before registration
    Optional<Student> findByEmail(String email);
    
	
	
	/**
     * Requirement: Student Login (Dynamic)
     * We create this because finding by email AND password is not a default method.
     */
    Optional<Student> findByEmailAndPassword(String email, String password);
        
}



