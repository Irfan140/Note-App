# Note-App

A full-stack note-taking application built with React Native (Expo), Node.js/Express, and PostgreSQL. Features user authentication via Clerk and a clean, modern interface for creating, editing, and managing notes.

##  Features

- **User Authentication**: Secure authentication powered by Clerk
- **Create & Edit Notes**: Intuitive interface for note management
- **Real-time Sync**: Notes are synced with a PostgreSQL database
- **Cross-Platform**: Mobile app runs on iOS, Android, and Web
- **Type-Safe**: Full TypeScript implementation across frontend and backend
- **Modern Stack**: Built with latest technologies and best practices

## 📋 Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk Express SDK

### Mobile (Frontend)
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Authentication**: Clerk Expo SDK
- **HTTP Client**: Axios

## 📁 Project Structure

```
Note-App/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── config/         # Configuration files
│   │   └── types/          # TypeScript type definitions
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
│
└── mobile/                  # React Native mobile app
    ├── src/
    │   ├── app/            # Expo Router pages
    │   │   ├── (auth)/     # Authentication screens
    │   │   ├── (home)/     # Home screens
    │   │   └── note/       # Note-related screens
    │   ├── components/     # Reusable components
    │   ├── lib/            # Utilities and API client
    │   └── types/          # TypeScript type definitions
    └── package.json
```



## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Irfan140/Note-App.git
cd Note-App
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
bun install

# Run database migrations
bun run db:migrate

# Start the development server
bun run dev
```

The backend server will start on `http://localhost:3000`

### 3. Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start the Expo development server
npm start
```

## 🚀 Running the Application

### Backend
```bash
cd backend
bun run dev
```

### Mobile App
```bash
cd mobile
npm start

# Then choose your platform:
# Press 'a' for Android
# Press 'i' for iOS
# Press 'w' for Web
```

## 🗄️ Database Schema

The application uses two main models:

### User
- `id` (String): Clerk user ID
- `email` (String): User's email address
- `name` (String?): Optional user name
- `imageUrl` (String?): Optional profile image
- `notes` (Note[]): User's notes
- `createdAt` (DateTime): Account creation timestamp

### Note
- `id` (String): Unique note identifier (CUID)
- `title` (String): Note title
- `content` (String?): Optional note content
- `userId` (String): Foreign key to User
- `createdAt` (DateTime): Note creation timestamp

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/noteapp"
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
PORT=3000
```

### Mobile (.env)
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
EXPO_PUBLIC_API_URL="http://localhost:3000"
```

## 📱 Available Scripts

### Backend
- `bun run dev` - Start development server with hot reload
- `bun run db:migrate` - Run database migrations

### Mobile
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## 🏗️ API Endpoints

### Notes API
- `GET /notes` - Get all notes for authenticated user
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

All endpoints require Clerk authentication.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Future Plans

### Deployment
- **Backend Deployment**: Deploy the Express.js backend to a cloud platform (e.g., Railway, Render, or AWS)
- **Mobile App Distribution**: 
  - Publish the app to Google Play Store
  - Create APK builds for testing and distribution
  - iOS App Store submission (future consideration)

### AI-Powered Features
- **Smart Note Summaries**: Develop a separate Flask microservice that leverages Large Language Models (LLMs) to:
  - Generate intelligent summaries of user notes
  - Provide contextual insights and key point extraction
  - Display AI-generated summaries in the mobile app
  - Integrate with the main backend via REST API

### UI/UX Improvements
- Enhanced note editor with rich text formatting
- Dark mode support
- Improved navigation and user experience
- Better visual design and animations
- Search and filter functionality for notes
- Tags and categories for better organization

### Security Enhancements
- Implement rate limiting on API endpoints
- Add data encryption for sensitive note content
- Enhanced input validation and sanitization
- Implement proper CORS policies
- Add logging and monitoring for security events
- Regular security audits and dependency updates
- End-to-end encryption for notes (optional)

## 👤 Author

**Irfan Mehmud**
- GitHub: [@Irfan140](https://github.com/Irfan140)