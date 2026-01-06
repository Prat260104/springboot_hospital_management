# Hospital Management System

A full-stack Hospital Management System built with Spring Boot (backend) and React (frontend).

## Features

- **Patient Management**: CRUD operations for patient records
- **Doctor Management**: Manage doctors, specializations, and assignments
- **Appointment System**: Schedule, update, and cancel appointments
- **Department Management**: Organize doctors by departments
- **Insurance Management**: Track patient insurance information
- **Modern UI**: Dark mode interface with smooth animations

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.3
- **Database**: H2 (in-memory) / PostgreSQL/MySQL (production)
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Java Version**: 21

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Vanilla CSS

## Project Structure

```
hospital-management-system/
├── backend/               # Backend Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/     # Java source files
│   │   │   └── resources/ # Application properties
│   ├── pom.xml           # Maven configuration
│   ├── mvnw              # Maven wrapper
│   └── .gitignore        # Backend gitignore
├── frontend/             # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   ├── package.json
│   └── .gitignore       # Frontend gitignore
├── README.md
└── .gitignore           # Root gitignore
```

## Quick Start

**Run Backend:**
```bash
cd backend
./mvnw clean spring-boot:run
```
Backend will be available at: `http://localhost:8080`

**Run Frontend (in a new terminal):**
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at: `http://localhost:5173`

---

## Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the Spring Boot application:
```bash
./mvnw clean spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Patients
- `GET /admin/patients` - List all patients (paginated)
- `GET /patients/{id}` - Get patient by ID
- `PUT /patients/{id}` - Update patient
- `DELETE /admin/patients/{id}` - Delete patient
- `GET /patients/{id}/appointments` - Get patient appointments

### Doctors
- `GET /public/doctors` - List all doctors
- `GET /doctors/{id}` - Get doctor by ID
- `PUT /doctors/{id}` - Update doctor
- `DELETE /admin/doctors/{id}` - Delete doctor
- `POST /admin/onBoardNewDoctor` - Onboard new doctor

### Appointments
- `GET /admin/appointments` - List all appointments
- `POST /patients/appointments` - Create appointment
- `PUT /appointments/{id}` - Update appointment
- `DELETE /patients/appointments/{id}` - Cancel appointment

### Departments
- `GET /public/departments` - List all departments
- `POST /admin/departments` - Create department
- `PUT /admin/departments/{id}` - Update department
- `DELETE /admin/departments/{id}` - Delete department
- `POST /admin/departments/{deptId}/doctors/{doctorId}` - Assign doctor
- `DELETE /admin/departments/{deptId}/doctors/{doctorId}` - Remove doctor

## Database

The application uses H2 in-memory database by default. You can access the H2 console at:
```
http://localhost:8080/h2-console
```

**Connection Details:**
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
