# ATHLIXIR - Athlete Health Records Platform

## Overview
ATHLIXIR is a comprehensive platform designed to help athletes, coaches, and organizations maintain and verify health records. The platform offers secure medical document management, ensures data privacy, and utilizes AI to detect fake or manipulated records.

## Features
- Secure athlete health record management
- Real-time medical data verification
- AI-powered document authenticity checking
- Multi-user role system (Athletes, Coaches, Medical Staff)
- Organization and community management
- Interactive dashboard and analytics

## Tech Stack
- Frontend: React + Vite
- Styling: TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- File Storage: MongoDB GridFS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/athlixir.git
cd athlixir
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Start the development server:
```bash
# Start frontend
npm run dev

# Start backend (in a new terminal)
npm run server
```

## Project Structure
```
athlixir/
├── src/                    # Frontend source files
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── context/           # React context
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── services/          # API services
├── server/                 # Backend source files
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── config/           # Configuration files
└── public/                # Static assets
```

## API Documentation

### Authentication Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- GET /api/auth/profile - Get user profile

### Health Records Endpoints
- GET /api/records - Get all records
- POST /api/records - Create new record
- PUT /api/records/:id - Update record
- DELETE /api/records/:id - Delete record

### Organization Endpoints
- GET /api/organizations - Get all organizations
- POST /api/organizations - Create new organization
- PUT /api/organizations/:id - Update organization
- DELETE /api/organizations/:id - Delete organization

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- Website: [https://athlixir.com](https://athlixir.com)
- Email: support@athlixir.com
- Twitter: [@athlixir](https://twitter.com/athlixir) #   A T H L I X I R  
 