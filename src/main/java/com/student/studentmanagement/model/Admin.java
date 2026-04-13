package com.student.studentmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name="name",nullable = false,length=40) 
    String name; // New Field
    
    @Column(name="email",nullable = false,length=40,unique = true)
    private String email;
    
    @Column(name="password",nullable = false,length=40)
    private String password;

    // Updated Getters and Setters
    public String getName() { return name; }
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setName(String name) { this.name = name; }
    
    // ... keep existing getters/setters for id, email, password ...
}
