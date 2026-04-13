package com.student.studentmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.studentmanagement.model.Student;
import com.student.studentmanagement.repository.StudentRepository;
import com.student.studentmanagement.service.StudentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class StudentController {

    @Autowired
    private StudentService service;

    
    // 1. POST mapping for Registration
    @PostMapping("/register")
    public String register(@RequestBody Student student) {
        return service.registerStudent(student);
    }
    
    
    
    // 2. Student Login Endpoint
	/*
	 * @PostMapping("/login") public ResponseEntity<?> login(@RequestBody
	 * Map<String, String> credentials) { Student s =
	 * service.login(credentials.get("email"), credentials.get("password")); if (s
	 * != null) { return ResponseEntity.ok(s); // Success returns 200 OK } else { //
	 * This triggers the !response.ok block in your Next.js fetch call return
	 * ResponseEntity.status(401).body("Invalid Email or Password"); } }
	 */
    
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        // ADD THIS LINE:
        System.out.println(">>> Login Request received for: " + credentials.get("email"));

        Student s = service.login(credentials.get("email"), credentials.get("password"));
        if (s != null) {
            return ResponseEntity.ok(s);
        } else {
            return ResponseEntity.status(401).body("Invalid Email or Password");
        }
    }
        
    
    
        // 3. Requirement: Show Details
    @GetMapping("/{id}")
    public Student getDetails(@PathVariable Long id) {
        return service.getStudentById(id);
    }

    // 4. Requirement: Edit Details
	
    /*
	 * @PutMapping("/edit") public Student edit(@RequestBody Student s) { return
	 * service.updateStudent(s); }
	 */

    
 // 1. KEEP THIS ONE (Correct for Next.js URL parameters)
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        System.out.println(">>> Checking reset for: [" + email + "]");
        boolean exists = service.verifyEmail(email);
        if (exists) {
            return ResponseEntity.ok("User verified");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
    }    
	
	  
	//Reset Password
    @PutMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> data) {
        // 1. Extract data from the JSON body sent by Next.js
        String email = data.get("email");
        String newPassword = data.get("newPassword");

        // 2. Call the service to perform the update
        boolean isUpdated = service.updatePassword(email, newPassword);

        if (isUpdated) {
            // Returns 200 OK
            return ResponseEntity.ok("Password updated successfully!");
        } else {
            // Returns 404 if the email somehow disappeared
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
	  
    @PutMapping("/update-student/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        // Set ID so Service knows which record to find
        studentDetails.setId(id);
        Student updatedStudent = service.updateStudent(studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }

    // 5. Requirement: Delete Student
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.removeStudent(id);
        return "Student deleted successfully";
    }
    
    // 6. Requirement: Admin sees all student details
    // Endpoint: GET http://YOUR_IP:8080/api/admin/all-students
    @GetMapping("/all-students")
    public List<Student> displayAll() {
        return service.getAllStudentDetails();
    }
}

