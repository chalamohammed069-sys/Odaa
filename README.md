# Odaa - Social Media Platform

A full-stack social media web application inspired by Facebook built with React, Node.js, Express, and MongoDB.

## Features

- ✅ User registration and login with JWT authentication
- ✅ User profiles with avatar and bio
- ✅ Create, edit, and delete posts
- ✅ Like and comment on posts
- ✅ Friend request system
- ✅ News feed showing friends' posts
- ✅ Real-time chat using Socket.IO
- ✅ Notifications for likes, comments, and friend requests
- ✅ Responsive design for mobile and desktop
- ✅ Dark mode support
- ✅ REST API with proper validation and error handling
- ✅ Clean folder structure and reusable components

## Project Structure

```
Odaa/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Context API for state management
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   └── App.js
│   └── package.json
├── server/                    # Node.js/Express backend
│   ├── models/               # MongoDB schemas
│   ├── controllers/          # Route controllers
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── socket/               # Socket.IO setup
│   └── server.js
├── .env.example              # Environment variables template
└── package.json
```

## Tech Stack

### Frontend
- React 18
- Redux Toolkit (State management)
- Axios (HTTP client)
- Socket.IO Client (Real-time communication)
- Tailwind CSS (Styling)
- React Router (Navigation)

### Backend
- Node.js
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- Socket.IO (Real-time communication)
- bcryptjs (Password hashing)
- Multer (File uploads)
- Express Validator (Input validation)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp ../.env.example .env
```

4. Update `.env` with your configuration

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

4. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User Endpoints
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/:id/posts` - Get user posts
- `GET /api/users/:id/friends` - Get user friends

### Post Endpoints
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Add comment

### Friend Endpoints
- `POST /api/friends/request/send` - Send friend request
- `GET /api/friends/requests` - Get requests
- `POST /api/friends/request/accept` - Accept request
- `POST /api/friends/request/reject` - Reject request

### Message & Notification Endpoints
- `GET /api/messages/:recipientId` - Get chat history
- `POST /api/messages` - Send message
- `GET /api/notifications` - Get notifications

## Environment Variables

See `.env.example` for required variables.

## Contributing

Contributions are welcome! Follow the existing code style and best practices.

## License

MIT License
