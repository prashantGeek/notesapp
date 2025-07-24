# 📝 Notes Backend API

A complete backend application for managing user notes with Google OAuth authentication, built with Node.js, Express, PostgreSQL, and TypeORM.

## 🚀 Features

- **Google OAuth Authentication** - Secure login with Google accounts
- **User Management** - Automatic user creation and session management
- **Notes CRUD Operations** - Create, Read, Update, Delete notes
- **Database Integration** - PostgreSQL with TypeORM
- **Session Management** - Secure cookie-based sessions
- **Docker Support** - Easy PostgreSQL setup with Docker
- **API Protection** - All note endpoints require authentication

## 🏗️ Architecture



## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM (with EntitySchema)
- **Authentication**: Passport.js + Google OAuth 2.0
- **Session Storage**: Express-session
- **Containerization**: Docker

## 📋 Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- Google Cloud Console account for OAuth credentials

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd notes-backend
npm install
```

### 2. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URI: `http://localhost:3000/auth/google/callback`
6. Copy your Client ID and Client Secret

### 3. Configure Environment Variables

Update your `.env` file with your Google OAuth credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=notes_db
DB_USERNAME=postgres
DB_PASSWORD=postgres

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Start PostgreSQL Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Verify database is running
docker-compose ps
```

### 5. Start the Server

```bash
npm start
```

You should see:
```
Database connected successfully
Server running on port 3000
```

## 🧪 Testing the API

### Authentication Flow

1. **Start Authentication**
   ```
   GET http://localhost:3000/auth/google
   ```

2. **Check Authentication Status**
   ```
   GET http://localhost:3000/auth/user
   ```

3. **Logout**
   ```
   POST http://localhost:3000/auth/logout
   ```

### Notes Management (Requires Authentication)

1. **Get All Notes**
   ```
   GET http://localhost:3000/api/notes
   ```

2. **Create a Note**
   ```
   POST http://localhost:3000/api/notes
   Content-Type: application/json
   
   {
     "title": "My First Note",
     "content": "This is the content of my note"
   }
   ```

3. **Update a Note**
   ```
   PUT http://localhost:3000/api/notes/:id
   Content-Type: application/json
   
   {
     "title": "Updated Title",
     "content": "Updated content"
   }
   ```

4. **Delete a Note**
   ```
   DELETE http://localhost:3000/api/notes/:id
   ```

### Manual Testing with Browser

1. Open `http://localhost:3000/auth/google`
2. Complete Google sign-in
3. Use browser console to test API:

```javascript
// Get user info
fetch('/auth/user', {credentials: 'include'}).then(r => r.json()).then(console.log)

// Create a note
fetch('/api/notes', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  credentials: 'include',
  body: JSON.stringify({title: 'Test Note', content: 'Test content'})
}).then(r => r.json()).then(console.log)

// Get all notes
fetch('/api/notes', {credentials: 'include'}).then(r => r.json()).then(console.log)
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/auth/google` | Start Google OAuth flow | No |
| GET | `/auth/user` | Get current user info | Yes |
| POST | `/auth/logout` | Logout current user | No |

### Notes Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/notes` | Get all user notes | Yes |
| POST | `/api/notes` | Create a new note | Yes |
| PUT | `/api/notes/:id` | Update a note | Yes |
| DELETE | `/api/notes/:id` | Delete a note | Yes |

### Response Formats

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `googleId` (Unique)
- `email` (Unique)
- `name`
- `profilePicture`
- `createdAt`
- `updatedAt`

### Notes Table
- `id` (Primary Key)
- `title`
- `content`
- `userId` (Foreign Key → Users)
- `createdAt`
- `updatedAt`

## 🔒 Security Features

- **OAuth 2.0** - Secure Google authentication
- **Session Management** - HTTP-only cookies
- **CORS Protection** - Configured for specific origins
- **Route Protection** - Authentication required for sensitive endpoints
- **Input Validation** - Basic validation on note creation
- **Environment Variables** - Sensitive data stored securely

## 🚨 Common Issues & Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose down
docker-compose up -d
```

### Google OAuth Issues
- Verify your Client ID and Client Secret in `.env`
- Check redirect URI in Google Cloud Console
- Ensure you're using the correct callback URL

### Session Issues
- Clear browser cookies
- Restart the server
- Check if SESSION_SECRET is set

### Port Issues
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in .env file
PORT=4000
```

## 🔄 Development Workflow

1. **Make changes** to your code
2. **Server auto-restarts** (thanks to nodemon)
3. **Test endpoints** using browser or curl
4. **Check logs** in terminal for any errors
5. **Database changes** are auto-synced (development mode)

## 📦 Dependencies Explained

- **express** - Web framework
- **passport** - Authentication middleware
- **passport-google-oauth20** - Google OAuth strategy
- **typeorm** - Database ORM
- **pg** - PostgreSQL driver
- **express-session** - Session management
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Development auto-restart

## 🚀 Next Steps

This backend is ready for:

1. **Frontend Integration** - Connect with React, Vue, or any frontend
2. **API Documentation** - Add Swagger/OpenAPI docs
3. **Testing** - Add unit and integration tests
4. **Deployment** - Deploy to Heroku, AWS, or other platforms
5. **Features** - Add note categories, sharing, search, etc.

## 📝 Learning Notes

This project demonstrates:

- **RESTful API Design** - Standard HTTP methods and status codes
- **Database Relationships** - Users have many notes
- **Authentication Flow** - OAuth 2.0 implementation
- **Middleware Usage** - Express middleware for auth, CORS, etc.
- **Environment Configuration** - Proper config management
- **Error Handling** - Consistent error responses
- **Security Best Practices** - Session management, input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.

---

**Happy Coding! 🎉**

For questions or issues, please check the troubleshooting section or create an issue in the repository.

Next step to deploy on vercel (frontend)
