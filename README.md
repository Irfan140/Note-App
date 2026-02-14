A full-stack note-taking application built with React Native (Expo), Node.js/Express, and PostgreSQL. Features user authentication via Clerk, AI-powered note summarization via a Python microservice, and a clean, modern interface for creating, editing, and managing notes.

##  Features

- **User Authentication**: Secure authentication powered by Clerk
- **Create & Edit Notes**: Intuitive interface for note management
- **AI Note Summarization**: Summarize notes using LLaMA 3.3 via Groq, powered by a FastAPI microservice with LangChain
- **Real-time Sync**: Notes are synced with a PostgreSQL database
- **Microservice Architecture**: Separate Python AI service communicates with the Express backend via REST
- **Cross-Platform**: Mobile app runs on iOS, Android, and Web
- **Type-Safe**: Full TypeScript implementation across frontend and backend
- **Modern Stack**: Built with latest technologies and best practices

## 📋 Tech Stack

### Backend
- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk Express SDK

### Python  Server
- **Framework**: FastAPI
- **LLM**: LLaMA 3.3 70B via Groq
- **AI Orchestration**: LangChain (LCEL chains)
- **Validation**: Pydantic

### Mobile (Frontend)
- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Authentication**: Clerk Expo SDK
- **HTTP Client**: Axios

## 📁 Project Structure

```
Note-App/
├── backend/                 # Express API server
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
├── python-server/           # AI Summarization microservice
│   ├── src/
│   │   ├── config/         # Environment & settings
│   │   ├── routers/        # FastAPI route handlers
│   │   ├── services/       # LLM chain logic
│   │   ├── models/         # Pydantic schemas
│   │   └── main.py         # App entry point
│   ├── requirements.txt
│   └── pyproject.toml
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


## 📷 Screenshots

<table align="center">
  <tr>
    <td align="center"><img src="mobile/assets/readme-assets/SignInScreen.jpg" alt="Sign In" width="240"/><br/><b>Sign In</b></td>
    <td align="center"><img src="mobile/assets/readme-assets/SignUpScreen.jpg" alt="Sign Up" width="240"/><br/><b>Sign Up</b></td>
    <td align="center"><img src="mobile/assets/readme-assets/HomeScreen.jpg" alt="Home Screen" width="240"/><br/><b>Home</b></td>
  </tr>
  <tr>
    <td align="center"><img src="mobile/assets/readme-assets/Create_Note.jpg" alt="Create Note" width="240"/><br/><b>Create Note</b></td>
    <td align="center"><img src="mobile/assets/readme-assets/View_Note.jpg" alt="View Note" width="240"/><br/><b>View Note</b></td>
    <td align="center"><img src="mobile/assets/readme-assets/Edit_Note.jpg" alt="Edit Note" width="240"/><br/><b>Edit Note</b></td>
  </tr>
  <tr>
    <td align="center"><img src="mobile/assets/readme-assets/Note_Summarizing.jpg" alt="Note Summarizing" width="240"/><br/><b>Summarizing</b></td>
    <td align="center"><img src="mobile/assets/readme-assets/AI_Summary.jpg" alt="AI Summary" width="240"/><br/><b>AI Summary</b></td>
    <td></td>
  </tr>
</table>


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

### 3. Python AI Server Setup

```bash
cd python-server

# Create virtual environment
uv init
uv venv
source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt

# Start the AI server
uvicorn src.main:app --reaload
```

The python server will start on `http://localhost:8000`

### 4. Mobile App Setup

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

### Python  Server
```bash
cd python-server
source .venv/bin/activate
uvicorn src.main:app --reaload
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
AI_SERVICE_URL="http://localhost:8000"
PORT=5000
```

### Python AI Server (.env)
```env
GROQ_API_KEY="gsk_..."
PORT=8000
```

### Mobile (.env)
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
EXPO_PUBLIC_API_URL="http://<your-local-ip>:5000"
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

### Notes API (Express Backend — port 5000)
- `GET /notes` - Get all notes for authenticated user
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note
- `POST /notes/:id/summarize` - Summarize a note using AI

All endpoints require Clerk authentication.

### AI Summarization API (Python Server — port 8000)
- `GET /` - Health check
- `GET /health` - Service health status
- `POST /summarize` - Summarize text content

The Express backend calls the Python server internally — the mobile app only talks to the Express backend.

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
- ~~**Smart Note Summaries**: Develop a separate microservice that leverages LLMs~~ ✅ **Done!** Built with FastAPI + LangChain + Groq (LLaMA 3.3 70B)
- **More AI Features** (planned):
  - Smart tagging and auto-categorization
  - Contextual insights and key point extraction
  - Search notes using natural language

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