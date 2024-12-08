# Task Management API

A RESTful API for managing tasks, built using Node.js, Express, and MongoDB. This application supports task creation, retrieval, updates, and deletion with robust input validation and filtering options.

---

## **Features**

- **Task Management**: Create, update, delete, and retrieve tasks.
- **Filtering and Sorting**: Filter tasks by status and priority. Sort by `createdAt` or `dueDate`.
- **Validation**: Ensures input data integrity using `Joi`.
- **Pagination**: Supports limit and skip for efficient data retrieval.
- **Error Handling**: Centralized error handling with proper HTTP status codes.
- **Environment Configuration**: Sensitive data managed using `.env` file.

---

## **API Endpoints**

### **Tasks**
- **POST `/tasks`**  
  Create a new task.  
  **Body**:  
  ```json
  {
    "title": "Task Title",
    "description": "Optional task description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2024-12-31T00:00:00.000Z"
  }
