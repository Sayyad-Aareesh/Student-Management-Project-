package com.student.studentmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.student.studentmanagement.model.Admin;
import com.student.studentmanagement.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // UPDATED: Now returns the full Admin object instead of just true/false
    public Admin loginAdmin(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
