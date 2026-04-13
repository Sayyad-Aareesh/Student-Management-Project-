package com.student.studentmanagement.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.student.studentmanagement.model.Admin;
import com.student.studentmanagement.model.Student;
import com.student.studentmanagement.service.AdminService;
import com.student.studentmanagement.service.StudentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000") // Add this exact line
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private StudentService studentService; // For Viewing Student Details

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");

        Admin admin = adminService.loginAdmin(email, password);

        if (admin != null) {
            // This sends the JSON object required by your Next.js fetch
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(401).body("Invalid Admin Credentials");
        }
    }
    // 2. Requirement: After login, display all student details
    // It calls the method you created in StudentService directly!
    @GetMapping("/view-all-students")
    public List<Student> viewAll() {
        return studentService.getAllStudentDetails(); 
    }
}
