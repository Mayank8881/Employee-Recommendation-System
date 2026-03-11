# Employee Recommendation Engine (Backend)

A backend-only **Employee Recommendation Engine** built using **Node.js, Express, Supabase (PostgreSQL), and Swagger**.

The system intelligently recommends the most suitable employees for a project based on:

* Skill matching
* Skill proficiency levels
* Employee experience
* Employee availability

The API evaluates employee profiles against project requirements and returns **ranked employee recommendations with explanations**.

---

# Features

## Employee Management

* Create employee
* Update employee
* Delete employee
* Get employee details

## Project Management

* Create project
* Update project
* Delete project
* Get project details

## Skill Management

* Assign skills to employees
* Define required skills for projects

## Employee Search

Search employees by:

* First name
* Last name
* Skill
* Experience
* Department
* Availability

## Recommendation Engine

Generate **ranked employee recommendations** for a project based on:

* Skill coverage
* Skill proficiency match
* Experience level
* Availability

## API Documentation

Swagger UI provides interactive documentation for all APIs.

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* Supabase (PostgreSQL)

## Documentation

* Swagger UI
* swagger-jsdoc

## Environment Management

* dotenv

---

# Project Architecture

The project follows a **modular layered architecture**:

```
backend
│
├── config
│   └── supabase.js
│
├── controllers
│   ├── employeeController.js
│   ├── projectController.js
│   ├── employeeSkillController.js
│   ├── projectSkillController.js
│   ├── employeeSearchController.js
│   └── recommendationController.js
│
├── models
│   ├── employeeModel.js
│   ├── projectModel.js
│   ├── employeeSkillModel.js
│   ├── projectSkillModel.js
│   ├── employeeSearchModel.js
│   └── recommendationModel.js
│
├── routes
│   ├── employeeRoutes.js
│   ├── projectRoutes.js
│   ├── employeeSkillRoutes.js
│   ├── projectSkillRoutes.js
│   ├── employeeSearchRoutes.js
│   └── recommendationRoutes.js
│
├── utils
│   └── recommendationEngine.js
│
├── swagger
│   └── swagger.js
│
└── server.js
```

---

# Database Schema

## employees

```
id
first_name
last_name
email
experience_years
seniority_level
availability_status
department
created_at
```

## skills

```
id
skill_name
category
```

## projects

```
id
project_name
description
start_date
end_date
priority
created_at
```

## employee_skills

```
id
employee_id
skill_id
proficiency_level
years_of_experience
```

## project_skills

```
id
project_id
skill_id
required_proficiency
```

## employee_projects (optional)

```
id
employee_id
project_id
role
start_date
end_date
```

---

# API Endpoints

## Employees

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | /api/employees      | Create employee    |
| GET    | /api/employees      | Get all employees  |
| GET    | /api/employees/{id} | Get employee by id |
| PUT    | /api/employees/{id} | Update employee    |
| DELETE | /api/employees/{id} | Delete employee    |

---

## Projects

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/projects      | Create project   |
| GET    | /api/projects      | Get all projects |
| GET    | /api/projects/{id} | Get project      |
| PUT    | /api/projects/{id} | Update project   |
| DELETE | /api/projects/{id} | Delete project   |

---

## Employee Skills

| Method | Endpoint                          | Description              |
| ------ | --------------------------------- | ------------------------ |
| POST   | /api/employee-skills              | Assign skill to employee |
| GET    | /api/employee-skills/{employeeId} | Get employee skills      |
| PUT    | /api/employee-skills/{id}         | Update skill             |
| DELETE | /api/employee-skills/{id}         | Remove skill             |

---

## Project Skills

| Method | Endpoint                        | Description                   |
| ------ | ------------------------------- | ----------------------------- |
| POST   | /api/project-skills             | Add project skill requirement |
| GET    | /api/project-skills/{projectId} | Get project skills            |
| PUT    | /api/project-skills/{id}        | Update requirement            |
| DELETE | /api/project-skills/{id}        | Remove requirement            |

---

## Employee Search

Search employees using filters.

```
GET /api/employees/search
```

Supported filters:

```
firstname
lastname
skill
experience
department
availability
```

Example:

```
/api/employees/search?skill=Node.js&experience=3
```

---

## Recommendation Engine

```
GET /api/recommendations/{projectId}
```

Returns ranked employee recommendations.

Example response:

```json
{
  "project_id": 1,
  "recommended_employees": [
    {
      "employee_id": 2,
      "name": "Rahul Sharma",
      "score": 87,
      "explanation": "Matched Node.js skill, higher proficiency than required, strong experience, employee available"
    }
  ]
}
```

---

# Recommendation Algorithm

Employee suitability score is calculated based on:

| Factor            | Weight  |
| ----------------- | ------- |
| Skill coverage    | 0-50    |
| Proficiency match | 15-35   |
| Experience        | 5-10    |
| Availability      | 5       |

Total Score Range-> 0-100

The algorithm evaluates:

1. Number of required skills matched
2. Difference between employee proficiency and required proficiency
3. Experience tiers
4. Availability status

Employees are then **ranked by score**.

---

# Installation

Clone the repository

```
git clone https://github.com/Mayank8881/Employee-Recommendation-System.git
```

Install dependencies

```
npm install
```

---

# Environment Variables

Create a `.env` file in the backend root.

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
PORT=5000
```

---

# Running the Server

Development mode

```
npm run dev
```

Server will run on

```
http://localhost:5000
```

---

# Swagger Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

This provides interactive API documentation for all endpoints.

---

<!-- # Future Improvements

Possible enhancements:

* Machine learning based recommendation
* Skill weighting by domain
* Employee workload balancing
* Project similarity matching
* Role-based recommendations
* Authentication and authorization

--- -->

# Author

Mayank
Backend system developed for the **Employee Recommendation Engine assignment**.

