package com.student.studentmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import com.student.studentmanagement.model.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // Direct method to check both email and password in the database
    Optional<Admin> findByEmailAndPassword(String email, String password);
}