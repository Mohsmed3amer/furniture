# 🛋️ Furniture Gallery - Complete Management System

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Router](https://img.shields.io/badge/React_Router-6.14.0-orange)
![JSON Server](https://img.shields.io/badge/JSON_Server-0.17.3-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Completed-success)

🌐 **Live Demo:** [https://furniture-eight-gold.vercel.app/](https://furniture-eight-gold.vercel.app/)

## 📖 Overview

**Furniture Gallery** is a complete furniture store management system built with React. It features a modern Arabic interface with full CRUD operations, user authentication, shopping cart system, and dark/light mode support.

## ✨ Key Features

### 🎨 User Interface
- Modern, responsive design
- Full Arabic language support
- Dark/Light mode toggle
- Intuitive and user-friendly interface

### 🔐 Authentication & Authorization
- User login and registration
- Role-based access (Admin/User)
- Protected routes
- Session management

### 🛍️ Product Management (Full CRUD)
- **Create** new products
- **Read** and display all products
- **Update** product information
- **Delete** products
- Stock and price management
- Product categorization

### 🛒 Shopping System
- Shopping cart for users
- Add/remove items from cart
- Quantity adjustment
- Checkout process
- Order tracking

### 📊 Admin Dashboard
- Sales statistics overview
- System performance metrics
- Order and user management
- Detailed reports

### 👤 User Profile
- View and edit personal information
- Order history tracking
- Purchase statistics
- Contact information update

## 🚀 Quick Start

### Prerequisites
- Node.js (Version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/furniture-website.git
cd furniture-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
# Run both React app and JSON Server together
npm run dev

# Or run separately in different terminals
npm start          # For React app
npm run server     # For JSON Server
```

4. **Open the application**
- App: http://localhost:3000
- API Server: http://localhost:3001

### Default Login Credentials

**Admin:**
- Email: `admin@furniture.com`
- Password: `admin123`

**Regular User:**
- Email: `user@furniture.com`
- Password: `user123`

## 📱 Main Pages

### 1. **Login** (`/login`)
- Secure login interface
- Credentials validation
- Automatic redirection

### 2. **Register** (`/register`)
- Create new account
- Password confirmation
- Auto-login after registration

### 3. **Dashboard** (`/dashboard`) - Admin Only
- Sales statistics
- System overview
- Quick actions

### 4. **Products** (`/products`)
- Browse all products
- Add/edit/delete (Admin only)
- Add to cart (Users)

### 5. **Shopping Cart** (`/cart`) - Users Only
- View added items
- Adjust quantities
- Complete purchase

### 6. **Orders** (`/orders`)
- View all orders
- Update order status (Admin)
- Track orders (Users)

### 7. **Profile** (`/profile`)
- View personal information
- Edit profile details
- Purchase history

## 🏗️ Project Structure

```
furniture-website/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Layout/        # Layout components
│   │   ├── Products/      # Product components
│   │   ├── Auth/          # Authentication components
│   │   └── Dashboard/     # Dashboard components
│   ├── context/           # Global state management
│   ├── pages/             # Main pages
│   ├── services/          # API services
│   ├── styles/            # CSS styles
│   ├── App.jsx           # Main App component
│   └── index.js          # Entry point
├── db.json               # Local JSON database
└── package.json          # Project configuration
```

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend library | 18.2.0 |
| **React Router DOM** | Routing | 6.14.0 |
| **Axios** | HTTP requests | 1.4.0 |
| **JSON Server** | Mock API backend | 0.17.3 |
| **Concurrently** | Run multiple commands | 8.2.0 |
| **CSS3** | Styling | - |

## 🔧 API Endpoints

### JSON Server Endpoints
```
GET    /products        # Get all products
GET    /products/:id    # Get single product
POST   /products        # Add new product
PUT    /products/:id    # Update product
DELETE /products/:id    # Delete product

GET    /orders         # Get all orders
POST   /orders         # Create new order
PUT    /orders/:id     # Update order
DELETE /orders/:id     # Delete order

GET    /users          # Get all users
POST   /users          # Add new user
```

## 🎨 Features in Detail

### 🌙 Dark/Light Mode
- Toggle between themes
- Theme preference saved in localStorage
- Smooth transitions between modes

### 🛒 Shopping Cart Features
- Persistent cart storage
- Real-time quantity updates
- Total price calculation
- Stock validation

### 👑 Admin Privileges
- Full product management (CRUD)
- Order status management
- View system statistics
- User management capabilities

### 👤 User Features
- Product browsing
- Shopping cart operations
- Order placement
- Profile management

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Environment Variables
Create `.env` file for production:
```env
REACT_APP_API_URL=https://your-api-url.com
```

## 🧪 Testing & Debugging

### Development Tools
- React DevTools for component inspection
- Browser DevTools for network monitoring
- Console logging for debugging

### Common Debugging Commands
```javascript
// Check data flow
console.log('Products:', products);
console.log('User:', user);

// Check authentication status
console.log('isAdmin:', isAdmin, 'isAuthenticated:', isAuthenticated);
```

## 🔒 Security Features

- Protected routes based on user roles
- Secure login with token-based authentication
- Input validation on all forms
- LocalStorage data sanitization

## 📈 Performance Optimizations

- Lazy loading for components
- Optimized image handling
- Efficient state management
- Memoized calculations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Coding Standards
- Use meaningful variable names
- Add comments for complex logic
- Follow consistent formatting
- Write descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Development Team

### Lead Developer
- **Name**: [Your Name]
- **Email**: [Your Email]
- **GitHub**: [Your GitHub Profile]

### Contributors
- Open to all contributions!

## 🙏 Acknowledgments

- React team for the amazing library
- The open-source community
- All contributors to this project

## 📞 Support & Contact

### Report Issues
1. Check existing [issues](https://github.com/.../issues)
2. Open a [new issue](https://github.com/.../issues/new)

### Questions & Discussions
- Use GitHub [Discussions](https://github.com/.../discussions)
- Email the development team

---
Built with ❤️ for the tech community
