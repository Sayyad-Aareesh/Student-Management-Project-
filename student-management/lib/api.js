zv  // Configuration: Matches your Spring Boot port
const BASE_URL = "http://localhost:8087/api";

// Controller prefixes matching @RequestMapping in Java
const STUDENT_PREFIX = `${BASE_URL}/student`;
const ADMIN_PREFIX = `${BASE_URL}/admin`;
const FEEDBACK_PREFIX = `${BASE_URL}/feedback`;

export const studentApi = {
  login: async (credentials) => {
    const response = await fetch(`${STUDENT_PREFIX}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(await response.text() || "Login failed");
    return response.json(); 
  },
  
  register: async (data) => {
    const response = await fetch(`${STUDENT_PREFIX}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.text(); 
  },
  
  getDetails: async (id) => {
    const response = await fetch(`${STUDENT_PREFIX}/${id}`);
    if (!response.ok) throw new Error("Student not found");
    return response.json();
  },

  /**
   * UPDATED: Matches @PutMapping("/update-student/{id}") in StudentController.java
   */
  updateDetails: async (id, updatedData) => {
    const response = await fetch(`${STUDENT_PREFIX}/update-student/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error(await response.text() || "Failed to update details");
    return response.json();
  }
};

export const adminApi = {
  login: async (credentials) => {
    const response = await fetch(`${ADMIN_PREFIX}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error(await response.text() || "Admin login failed");
    return response.json(); 
  },
  
  getAllStudents: async () => {
    const response = await fetch(`${ADMIN_PREFIX}/view-all-students`);
    if (!response.ok) throw new Error("Could not fetch students");
    return response.json();
  },

  getStudentFeedback: async (studentId) => {
    const response = await fetch(`${FEEDBACK_PREFIX}/admin/feedback/${studentId}`);
    if (response.status === 204) return []; 
    if (!response.ok) throw new Error("Failed to load feedback");
    return response.json();
  }
};

export const feedbackApi = {
  /**
   * UPDATED: Specifically handles 409 Conflict for "Already Submitted"
   */
  submitFeedback: async (feedbackData) => {
    const response = await fetch(`${FEEDBACK_PREFIX}/submit-feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });

    // Check for "Duplicate Submission" status from Java
    if (response.status === 409) {
      const message = await response.text();
      throw new Error(message);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Submission failed");
    }
    
    return response.text();
  }
};
