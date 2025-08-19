# Portfolio Generator

A full-stack portfolio generator application that allows users to create professional portfolios with multiple themes. Built with React, Node.js, TypeScript, and MongoDB.

## 🚀 Features

- **Google OAuth Authentication** - Secure login with Google accounts
- **Professional Dashboard** - User-friendly interface to manage portfolio content
- **Multiple Portfolio Themes** - Three distinct themes with different layouts and designs
- **Image Upload** - Cloudinary integration for profile pictures and project images
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Preview** - See changes instantly in portfolio preview

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Joy UI** - Additional UI components
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **TypeORM** - Database ORM
- **MongoDB** - Database
- **Passport.js** - Authentication
- **JWT** - Session management
- **Cloudinary** - Image storage

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Google Cloud Console** account for OAuth
- **Cloudinary** account for image storage

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-generator.git
   cd portfolio-generator
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio-generator

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
CLIENT_URL=http://localhost:5173

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:4000
```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 🔐 Google OAuth Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to APIs & Services > Library
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:4000/auth/google/callback`
   - Authorized JavaScript origins: `http://localhost:5173`

4. **Configure OAuth Consent Screen**
   - Go to APIs & Services > OAuth consent screen
   - User Type: External
   - Add your email as a test user

## ☁️ Cloudinary Setup

1. **Create a Cloudinary Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account

2. **Get Your Credentials**
   - Go to Dashboard
   - Copy your Cloud Name, API Key, and API Secret
   - Add them to your backend `.env` file

## 📁 Project Structure

```
portfolio-generator/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── entities/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── themes/
│   │   └── lib/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🎨 Portfolio Themes

The application includes three distinct portfolio themes:

1. **Theme A** - Colorful hero with section navigation, project cards, and timelines
2. **Theme B** - Dark theme with gradient hero, project grid, and modern layout
3. **Theme C** - Sidebar navigation with fixed menu and scrollable content

## 📝 Usage

1. **Sign in** with your Google account
2. **Fill in your details** in the dashboard:
   - Profile information
   - Summary
   - Skills
   - Projects
   - Experience
   - Education
   - Certifications
   - Achievements
3. **Select a theme** for your portfolio
4. **Preview and customize** your portfolio
5. **Share your portfolio** URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- Cloudinary for image storage
- Google OAuth for authentication
- TypeORM for database management

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.


