# 🎥 YouTube Clone - Full Stack Web Application

A complete YouTube clone built with modern web technologies, featuring video streaming, user authentication, comments system, and responsive design.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Features Implementation](#features-implementation)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Registration & Login**
- **Google OAuth Authentication** via Firebase
- **JWT Token-based Authentication**
- **Persistent Login Sessions** with Redux Persist
- **User Profile Management**
- **Secure Password Hashing** with bcrypt

### 📺 Video Features
- **Video Streaming** with HTML5 video player
- **Video Upload & Management** (CRUD operations)
- **Video Categories** (Trending, Music, Sports, Gaming, etc.)
- **Video Search Functionality**
- **View Count Tracking**
- **Video Recommendations** based on tags

### 💬 Interactive Features
- **Comments System** (Add, Edit, Delete, Reply)
- **Like/Dislike Videos**
- **Subscribe/Unsubscribe to Channels**
- **Real-time Comment Updates**
- **User Profile Pictures** with UI Avatars fallback

### 🎨 UI/UX Features
- **Responsive Design** (Mobile, Tablet, Desktop)
- **Dark/Light Theme Toggle**
- **YouTube-like Interface**
- **Loading States & Error Handling**
- **Smooth Animations & Transitions**
- **Mobile-first Approach**

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI Library
- **Redux Toolkit** - State Management
- **Redux Persist** - Persistent State
- **React Router DOM** - Client-side Routing
- **Material-UI Icons** - Icon Library
- **React Icons** - Additional Icons
- **Vite** - Build Tool & Development Server
- **CSS3** - Styling with CSS Variables
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - MongoDB Object Modeling
- **JWT** - Authentication Tokens
- **bcrypt** - Password Hashing
- **Cookie Parser** - Cookie Handling
- **CORS** - Cross-Origin Resource Sharing

### Authentication
- **Firebase Authentication** - Google OAuth
- **JWT Tokens** - Session Management
- **HTTP-only Cookies** - Secure Token Storage

### Development Tools
- **ESLint** - Code Linting
- **Vite** - Fast Development & Build
- **Nodemon** - Auto-restart Development Server

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

```bash
Node.js (version 16.0 or higher)
npm (version 7.0 or higher)
MongoDB (version 4.4 or higher)
Git
```

Check your versions:
```bash
node --version
npm --version
mongod --version
git --version
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/youtube-clone.git
cd youtube-clone
```

### 2. Install Dependencies

**Frontend Dependencies:**
```bash
npm install
```

**Backend Dependencies:**
```bash
cd server
npm init -y
npm install express mongoose dotenv cors cookie-parser bcrypt jsonwebtoken
npm install -D nodemon
```

### 3. Project Structure Setup
```
YouTube-Clone/
├── src/                    # Frontend React code
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── redux/             # Redux store & slices
│   ├── utils/             # Utility functions
│   └── assets/            # Static assets
├── server/                # Backend Express code
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── config/           # Configuration files
└── public/               # Public static files
```

## 🔧 Environment Variables

### Frontend (.env in root directory)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### Backend (.env in server directory)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/youtube-clone
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### How to Get Environment Variables:

#### Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication → Sign-in method → Google
4. Go to Project Settings → General → Your apps
5. Add a web app and copy the config values

#### MongoDB Setup:
1. **Local MongoDB**: `mongodb://localhost:27017/youtube-clone`
2. **MongoDB Atlas**: Get connection string from Atlas dashboard

## 🗄️ Database Setup

### Local MongoDB Setup:
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# Create database (automatically created on first connection)
```

### MongoDB Atlas Setup (Cloud):
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string

### Database Models:

#### User Model:
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  img: String,
  subscribers: Number,
  subscribedUsers: [String],
  timestamps: true
}
```

#### Video Model:
```javascript
{
  userId: String,
  title: String,
  desc: String,
  imgUrl: String,
  videoUrl: String,
  views: Number,
  tags: [String],
  likes: [String],
  dislikes: [String],
  timestamps: true
}
```

#### Comment Model:
```javascript
{
  userId: String,
  videoId: String,
  desc: String,
  parentId: String (for replies),
  timestamps: true
}
```

## 🎯 Running the Application

### Development Mode:

#### Terminal 1 - Frontend:
```bash
npm run dev
# Runs on http://localhost:5173
```

#### Terminal 2 - Backend:
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

#### Terminal 3 - MongoDB (if local):
```bash
mongod
# Runs on default port 27017
```

### Production Build:
```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Start production server
cd server
npm start
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Header.css
│   ├── Menu.jsx            # Sidebar navigation
│   ├── Menu.css
│   ├── Card.jsx            # Video card component
│   ├── Card.css
│   ├── Comment.jsx         # Individual comment
│   ├── Comment.css
│   ├── Comments.jsx        # Comments section
│   ├── Comments.css
│   ├── UserProfile.jsx     # User profile page
│   ├── UserProfile.css
│   └── Recommendation.jsx  # Video recommendations
├── pages/
│   ├── Home.jsx            # Homepage with video grid
│   ├── Home.css
│   ├── Video.jsx           # Video player page
│   ├── Video.css
│   ├── Search.jsx          # Search results page
│   ├── Search.css
│   ├── Signin.jsx          # Authentication page
│   └── Signin.css
├── redux/
│   ├── store.js            # Redux store configuration
│   ├── userSlice.js        # User state management
│   └── videoSlice.js       # Video state management
├── utils/
│   ├── axiosInstance.js    # Axios configuration
│   ├── firebase.js         # Firebase configuration
│   └── theme.js            # Theme configuration (deleted)
├── assets/
│   └── logo.png            # Application logo
├── App.jsx                 # Main application component
├── App.css                 # Main application styles
├── main.jsx                # Application entry point
└── index.css               # Global styles

server/
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── user.controller.js   # User operations
│   ├── video.controller.js  # Video operations
│   └── comment.controller.js # Comment operations
├── models/
│   ├── User.js             # User schema
│   ├── Video.js            # Video schema
│   └── Comment.js          # Comment schema
├── routes/
│   ├── auth.routes.js      # Authentication routes
│   ├── user.routes.js      # User action routes
│   ├── users.js            # User data routes
│   ├── video.routes.js     # Video routes
│   └── comment.routes.js   # Comment routes
├── middleware/
│   └── auth.js             # JWT verification
├── validations/
│   └── auth.validation.js  # Input validation
├── config/
│   └── database.js         # Database connection
├── seeds/                  # Database seeding
│   ├── users.seed.js
│   └── videos.seed.js
├── error.js                # Error handling utility
└── index.js                # Server entry point
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
```http
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/google       # Google OAuth login
POST /api/auth/logout       # User logout
POST /api/auth/refresh      # Refresh JWT token
```

### User Routes (`/api/users`)
```http
GET  /api/users/find/:id          # Get user by ID
PUT  /api/users/sub/:channelId    # Subscribe to channel
PUT  /api/users/unsub/:channelId  # Unsubscribe from channel
PUT  /api/users/like/:videoId     # Like a video
PUT  /api/users/dislike/:videoId  # Dislike a video
```

### Video Routes (`/api/videos`)
```http
GET  /api/videos/random           # Get random videos
GET  /api/videos/trending         # Get trending videos
GET  /api/videos/subscribed       # Get subscribed videos (auth required)
GET  /api/videos/find/:id         # Get video by ID
GET  /api/videos/search?q=query   # Search videos
GET  /api/videos/tags?tags=tag1,tag2 # Get videos by tags
POST /api/videos                  # Create video (auth required)
PUT  /api/videos/:id              # Update video (auth required)
DELETE /api/videos/:id            # Delete video (auth required)
```

### Comment Routes (`/api/comments`)
```http
GET  /api/comments/:videoId       # Get video comments
POST /api/comments/:videoId       # Add comment (auth required)
PUT  /api/comments/:id            # Edit comment (auth required)
DELETE /api/comments/:id          # Delete comment (auth required)
```

## 🔐 Authentication Flow

### Registration Process:
1. User fills registration form
2. Frontend validates input
3. Backend validates data using `auth.validation.js`
4. Password hashed with bcrypt
5. User saved to MongoDB
6. JWT token generated and sent as HTTP-only cookie
7. User data stored in Redux state
8. User redirected to homepage

### Login Process:
1. User enters email/password
2. Backend validates credentials
3. Password compared with bcrypt
4. JWT token generated on success
5. Token sent as HTTP-only cookie
6. User data stored in Redux state

### Google OAuth Process:
1. User clicks "Sign in with Google"
2. Firebase popup opens
3. User authenticates with Google
4. Firebase returns user data
5. Backend creates/finds user in database
6. JWT token generated and sent
7. User logged in successfully

### Protected Routes:
- JWT token verified on each request
- Token stored in HTTP-only cookies
- Automatic redirect to login if unauthorized
- Redux state persistence across sessions

## 🎯 Features Implementation

### Video Streaming:
```javascript
// HTML5 video player with controls
<video src={videoUrl} controls className="video-player">
  Your browser does not support the video tag.
</video>
```

### Comments System:
- CRUD operations (Create, Read, Update, Delete)
- Real-time updates after actions
- Edit mode with keyboard shortcuts (Enter to save, Escape to cancel)
- User verification for edit/delete permissions
- Nested comment structure support

### Like/Dislike System:
- Mutually exclusive (like removes dislike and vice versa)
- Real-time UI updates
- Redux state management
- Database updates via API calls

### Search Functionality:
- Real-time search as you type
- Case-insensitive regex matching
- Search in video titles
- Dedicated search results page

### Theme System:
```css
/* CSS Variables for theme switching */
.theme-light {
  --bg: #fff;
  --text: #0f0f0f;
  --textSoft: #606060;
}

.theme-dark {
  --bg: #0f0f0f;
  --text: #fff;
  --textSoft: #aaa;
}
```

## 📱 Responsive Design

### Breakpoints:
```css
/* Mobile */
@media (max-width: 768px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .home-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
```

### Mobile Features:
- Collapsible sidebar menu
- Touch-friendly buttons
- Optimized video player
- Responsive navigation
- Mobile-first CSS Grid

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify):
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up redirects for React Router

### Backend Deployment (Heroku/Railway):
1. Create `Procfile`: `web: node server/index.js`
2. Configure environment variables
3. Connect MongoDB Atlas
4. Deploy server code

### Environment Variables for Production:
```env
# Frontend
VITE_FIREBASE_API_KEY=production_key
VITE_API_URL=https://your-api-domain.com

# Backend
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube-clone
JWT_SECRET=super_secure_production_secret
```

## 🧪 Testing

### Manual Testing Checklist:
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works
- [ ] Video streaming works
- [ ] Comments CRUD works
- [ ] Like/Dislike works
- [ ] Subscribe/Unsubscribe works
- [ ] Search functionality works
- [ ] Theme toggle works
- [ ] Mobile responsiveness works
- [ ] Error handling works

### Database Seeding:
```bash
# Seed sample users
node server/seeds/users.seed.js

# Seed sample videos
node server/seeds/videos.seed.js
```

## 🐛 Troubleshooting

### Common Issues:

#### CORS Errors:
```javascript
// server/index.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### Firebase Authentication Issues:
- Check Firebase project configuration
- Verify domain is added to authorized domains
- Enable Google sign-in method

#### MongoDB Connection Issues:
- Ensure MongoDB is running
- Check connection string format
- Verify network access (Atlas)

#### JWT Token Issues:
- Check JWT_SECRET in environment variables
- Verify cookie settings
- Clear browser cookies if needed

## 📚 Learning Outcomes

By building this project, students learn:

### Frontend Skills:
- React functional components and hooks
- Redux state management
- React Router for navigation
- API integration with Axios
- Responsive CSS design
- Material-UI component usage

### Backend Skills:
- Express.js server setup
- MongoDB database design
- RESTful API development
- JWT authentication
- Middleware implementation
- Error handling patterns

### Full-Stack Concepts:
- Client-server communication
- Authentication flows
- Database relationships
- State management across components
- Real-time updates
- Production deployment

## 🔄 Future Enhancements

### Potential Features to Add:
- [ ] Video upload functionality
- [ ] Live streaming support
- [ ] Push notifications
- [ ] Video playlists
- [ ] Channel subscriptions feed
- [ ] Video analytics dashboard
- [ ] Content moderation
- [ ] Multiple language support
- [ ] Progressive Web App (PWA)
- [ ] Video compression
- [ ] Social sharing
- [ ] Email verification

## 🤝 Contributing

### How to Contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test thoroughly
5. Commit changes: `git commit -m "Add new feature"`
6. Push to branch: `git push origin feature/new-feature`
7. Create a Pull Request

### Code Style Guidelines:
- Use camelCase for variables and functions
- Use PascalCase for components
- Write meaningful commit messages
- Add comments for complex logic
- Follow existing file structure

**⭐ If you found this project helpful, please give it a star on GitHub!**

### Project Stats:
- **Total Files**: 50+ files
- **Lines of Code**: 3000+ lines
- **Development Time**: 2-3 weeks
- **Technologies Used**: 15+ technologies
- **Features Implemented**: 20+ features

*This project demonstrates full-stack development skills and can serve as a strong portfolio piece for web developers.*
