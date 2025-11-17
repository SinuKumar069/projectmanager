# Project Manager - Full Stack Application

A full-stack project management application with authentication, project management, task tracking, and team collaboration features.

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **React Hook Form** - Form management

### Backend
- **Express.js 5** - Node.js framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## Project Structure

```
projectmanager/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and API clients
│   └── public/       # Static assets
│
└── backend/          # Express.js backend API
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   ├── middlewares/ # Express middlewares
    │   ├── utils/        # Utility functions
    │   └── validators/   # Input validators
    └── public/       # Static files (uploads)
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/projectmanager

# JWT Configuration
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here
REFRESH_TOKEN_EXPIRY=10d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Server URL (for file uploads)
SERVER_URL=http://localhost:3000

# Email Configuration (Optional)
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/reset-password
```

4. Start MongoDB (if running locally):
```bash
# On macOS/Linux
mongod

# On Windows
# Start MongoDB service from Services or use MongoDB Compass
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3001` (or 3000 if 3001 is taken)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/current-user` - Get current user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password/:token` - Reset password
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Projects
- `GET /api/v1/projects` - Get all projects for current user
- `GET /api/v1/projects/:projectId` - Get project by ID
- `POST /api/v1/projects` - Create a new project
- `PUT /api/v1/projects/:projectId` - Update project
- `DELETE /api/v1/projects/:projectId` - Delete project
- `GET /api/v1/projects/:projectId/members` - Get project members
- `POST /api/v1/projects/:projectId/members` - Add member to project
- `PUT /api/v1/projects/:projectId/members/:userId` - Update member role
- `DELETE /api/v1/projects/:projectId/members/:userId` - Remove member

### Tasks
- `GET /api/v1/projects/:projectId/tasks` - Get all tasks for a project
- `GET /api/v1/projects/:projectId/tasks/:taskId` - Get task by ID
- `POST /api/v1/projects/:projectId/tasks` - Create a new task
- `PUT /api/v1/projects/:projectId/tasks/:taskId` - Update task
- `DELETE /api/v1/projects/:projectId/tasks/:taskId` - Delete task

## Features

### ✅ Implemented
- User authentication (register, login, logout)
- JWT-based authentication with refresh tokens
- Project creation and management
- Project member management
- Role-based access control (Admin, Project Admin, Member)
- CORS configuration for frontend-backend communication
- API client with automatic token management
- Responsive UI with modern design

### 🚧 In Progress / TODO
- Task management (controllers exist, need frontend integration)
- Subtask management
- File uploads for task attachments
- Email verification
- Password reset flow
- Real-time updates
- Project progress calculation
- Task status tracking

## Development

### Running Both Servers

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Authentication Flow

1. User registers with email, username, and password
2. Backend creates user and sends verification email (if configured)
3. User logs in with email and password
4. Backend returns JWT tokens (accessToken and refreshToken)
5. Frontend stores accessToken in localStorage
6. All subsequent API requests include the token in Authorization header
7. Backend validates token on protected routes

## Project Roles

- **ADMIN**: Full access to all project features
- **PROJECT_ADMIN**: Can manage project settings and members
- **MEMBER**: Can view and work on tasks

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend `.env` includes your frontend URL
- Check that both servers are running on the correct ports

### Authentication Issues
- Verify JWT secrets are set in backend `.env`
- Check that tokens are being stored in localStorage
- Ensure cookies are enabled in browser

### MongoDB Connection
- Verify MongoDB is running
- Check `MONGO_URI` in backend `.env`
- Ensure database name is correct

## License

ISC

## Author

Project Camp Team

