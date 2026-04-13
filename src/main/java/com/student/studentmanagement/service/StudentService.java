package com.student.studentmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.studentmanagement.model.Student;
import com.student.studentmanagement.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    /**
     * REQUIREMENT: Student Registration (Insert)
     * Logic: Check if email exists, then save using the built-in repository.save() method.
     */
    @Transactional
    public String registerStudent(Student student) {
        // Check if email exists
        if (studentRepo.findByEmail(student.getEmail()).isPresent()) {
            System.out.println(">>> Registration Failed: Email already exists: " + student.getEmail());
            return "Email already exists!";
        }
        
        // Log before saving to confirm the code reaches here
        System.out.println(">>> Attempting to save new student: " + student.getName());
        
        try {
            studentRepo.save(student);
            System.out.println(">>> Student saved successfully!");
            return "Registration Successful";
        } catch (Exception e) {
            System.err.println(">>> Database Error: " + e.getMessage());
            return "Error: Database issue";
        }
    }
    
    
    
    // Requirement: Student Login (Checks MySQL for email and password)
    public Student login(String email, String password) {
        return studentRepo.findByEmailAndPassword(email, password).orElse(null);
    }

    // Requirement: Show Details
    public Student getStudentById(Long id) {
        return studentRepo.findById(id).orElse(null);
    }

    // Requirement: Edit Details (save() updates the record if the ID exists)
	
    /*
	 * public Student updateStudent(Student s) { return studentRepo.save(s); }
	 */
    
    
//    public Student updateStudent(Student incomingData) {
//        // 1. Find the existing student in the database by ID
//        Student existingStudent = studentRepo.findById(incomingData.getId())
//            .orElseThrow(() -> new RuntimeException("Student not found with id: " + incomingData.getId()));
//
//        // 2. Only update fields if they are NOT NULL in the request
//        if (incomingData.getName() != null) {
//            existingStudent.setName(incomingData.getName());
//        }
//        if (incomingData.getEmail() != null) {
//            existingStudent.setEmail(incomingData.getEmail());
//        }
//        if (incomingData.getPassword() != null) {
//            existingStudent.setPassword(incomingData.getPassword());
//        }
//
//        // 3. Save the updated "existingStudent" (Hibernate keeps the other fields as they were)
//        return studentRepo.save(existingStudent);
//    }
    
    
    @Transactional 
    public Student updateStudent(Student incomingData) {
        // 1. Fetch from DB
        Student existingStudent = studentRepo.findById(incomingData.getId())
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + incomingData.getId()));

        // 2. Update fields
        if (incomingData.getName() != null) existingStudent.setName(incomingData.getName());
        if (incomingData.getEmail() != null) existingStudent.setEmail(incomingData.getEmail());
        
        // Only update password if it's actually provided
        if (incomingData.getPassword() != null && !incomingData.getPassword().isEmpty()) {
            existingStudent.setPassword(incomingData.getPassword());
        }

        // 3. Use saveAndFlush to ensure the DB reflects changes BEFORE returning to Controller
        return studentRepo.saveAndFlush(existingStudent);
    }
    
    //	verify by Email
    public boolean verifyEmail(String email) {
        return studentRepo.findByEmail(email).isPresent();
    }
    
    //For new password
    @Transactional // Ensures the database saves correctly
    public boolean updatePassword(String email, String newPassword) {
        // Find the student (Case-insensitive to be safe)
        return studentRepo.findByEmail(email.trim())
            .map(student -> {
                student.setPassword(newPassword); // Set the new password
                studentRepo.save(student);        // Save to MySQL
                return true;
            })
            .orElse(false);
    }
    
    public String registerStudent1(Student student) {
        // 1. Check if email is already present in DB
        Optional<Student> existing = studentRepo.findByEmail(student.getEmail());
        
        if (existing.isPresent()) {
            // Return a message that the frontend can handle
            return "Duplicate Email"; 
        }

        // 2. Save only if email is unique
        studentRepo.save(student); 
        return "Registration Successful";
    }
       

    // Requirement: Delete Student
    public void removeStudent(Long id) {
        studentRepo.deleteById(id);
    }
    
    // Logic to fetch all student details from the database
    public List<Student> getAllStudentDetails() {
        return studentRepo.findAll(); // This is a built-in JpaRepository method
    }

}
