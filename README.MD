# 🌟 JotNote: Collaborative Journaling  Platform

## 🚀 Project Overview
JotNote is an innovative journaling application that combines personal reflection with collaborative code sharing, enabling users to document their thoughts, experiences, and programming insights seamlessly.

## 🛠 Tech Stack
- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io (for real-time collaboration)

## ✨ Key Features

### 📓 Journaling Capabilities
- Personal journal entries
- Private and shared journal modes
- Rich text and markdown support
- Mood tracking
- Tags and categorization

### 🤝 Collaboration Features
- Friend-based code and journal sharing
- Real-time collaborative editing
- Secure friend invitations
- Code snippet sharing
- Version history tracking

### 🔒 Security
- End-to-end encryption
- JWT authentication
- Role-based access control
- Two-factor authentication

## 📂 Project Structure
```
jotnote/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── journalController.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── JournalCode.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── journalRoutes.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── services/
│   │   ├── authService.ts
│   │   └── journalService.ts
│   ├── types/
│   │   └── custom.d.ts
│   └── app.ts
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🔧 Prerequisites
- Node.js (v18+)
- MongoDB
- TypeScript
- npm/yarn

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/jotnote.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## 🔒 Environment Configuration
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SOCKET_SECRET=your_socket_secret
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/invite-friend`

### Journals
- `GET /api/journals`
- `POST /api/journals`
- `PUT /api/journals/:id`
- `DELETE /api/journals/:id`

### Code Sharing
- `POST /api/code/share`
- `GET /api/code/friends`

## 🧪 Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request



## 🎉 Author
Magmastorm3007



## 🌈 Additional Notes
- Implement robust error handling
- Optimize database queries
- Ensure GDPR and data privacy compliance
- Regular security audits

## 🔍 Future Roadmap
- Mobile app development
- AI-powered journaling insights
- Enhanced collaboration tools
- Integration with popular IDEs