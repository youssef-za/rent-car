# 🚗 DriveHub - Car Rental Management System

> **Professional Car Rental Management Platform**

A modern, enterprise-level web application for managing car rental operations. Built with React, Material UI, and Spring Boot.

---

## 🎨 Branding

### Application Identity
- **Name**: DriveHub
- **Tagline**: Professional Car Rental Management
- **Company**: DriveHub Solutions
- **Logo**: 🚗 DriveHub (text-based with car emoji icon)

### Color Palette
```css
Primary (Corporate Blue):   #1976d2
Secondary (Energetic Orange): #ff9800
Success (Available):        #4caf50
Error (Rented):            #f44336
Warning:                   #ff9800
Info:                      #2196f3
Background:                #f5f7fa
```

### Typography
- **Primary Font**: Inter - Modern, clean, professional
- **Secondary Font**: Poppins - Friendly, contemporary for headings
- **Monospace**: Fira Code - For code snippets

---

## ✨ Features

### Dashboard
- 📊 Real-time statistics (Total Cars, Available, Rented, Revenue)
- 📈 Interactive charts (Bar chart by brand, Pie chart for availability)
- 📋 Recent cars overview table

### Cars Management
- 🔍 Advanced search functionality
- 🎯 Status filtering (All/Available/Rented)
- 📄 Pagination with customizable rows per page
- ⚡ Quick actions (View, Edit, Delete)
- 🔔 Toast notifications for all operations

### Car Operations
- ➕ Add new cars with validation
- ✏️ Edit existing car details
- 👁️ View detailed car information
- 🗑️ Delete with confirmation dialog

### UI/UX
- 📱 Fully responsive design
- 🎨 Material Design principles
- 🌓 Professional color scheme
- ⚡ Smooth animations and transitions
- ♿ Accessibility compliant

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **UI Library**: Material UI (MUI) v5
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Styling**: Emotion (CSS-in-JS)

### Backend
- **Framework**: Spring Boot 3.2.2
- **ORM**: Hibernate (JPA)
- **Database**: MySQL
- **Architecture**: REST API
- **Structure**: Layered (Entity, Repository, Service, Controller)

---

## 📁 Project Structure

```
loccation-voiture/
├── back-end/
│   ├── src/main/java/com/example/carrental/
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   └── config/          # Configuration (CORS, etc.)
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── database.sql
│
└── front-end/
    ├── src/
    │   ├── components/
    │   │   ├── layout/      # Layout components
    │   │   ├── common/      # Reusable components
    │   │   ├── dashboard/   # Dashboard-specific
    │   │   └── cars/        # Car-specific
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── theme/           # MUI theme config
    │   ├── utils/           # Constants & utilities
    │   ├── hooks/           # Custom React hooks
    │   └── styles/          # Global styles
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.8+
- MySQL 8.0+

### Backend Setup

1. **Configure MySQL**
   ```bash
   # Create database
   mysql -u root -p -P 4306
   CREATE DATABASE voiture;
   ```

2. **Run SQL script**
   ```bash
   mysql -u root -p -P 4306 voiture < back-end/database.sql
   ```

3. **Start Spring Boot**
   ```bash
   cd back-end
   mvn spring-boot:run
   ```
   Backend runs on: `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd front-end
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars |
| GET | `/api/cars/{id}` | Get car by ID |
| POST | `/api/cars` | Create new car |
| PUT | `/api/cars/{id}` | Update car |
| DELETE | `/api/cars/{id}` | Delete car |

---

## 🎯 Usage

### Adding a Car
1. Navigate to "Add Car" from sidebar
2. Fill in the form (Brand, Model, Year, Price, Availability)
3. Click "Add Car"
4. Success notification appears

### Managing Cars
1. Go to "Cars Management"
2. Use search bar to find specific cars
3. Filter by status (Available/Rented)
4. Click action buttons to View, Edit, or Delete

### Dashboard Overview
1. View real-time statistics
2. Analyze cars by brand (bar chart)
3. Check availability distribution (pie chart)
4. See recent cars in the table

---

## 🎨 Design Philosophy

### Professional & Modern
- Clean, minimalist interface
- Consistent spacing and alignment
- Professional color palette
- Clear visual hierarchy

### User-Centric
- Intuitive navigation
- Clear feedback for all actions
- Loading states for better UX
- Confirmation dialogs for destructive actions

### Enterprise-Ready
- Scalable architecture
- Maintainable code structure
- Reusable components
- Comprehensive error handling

---

## 📸 Screenshots

### Dashboard
- Statistics cards with gradients
- Interactive charts
- Recent cars table

### Cars Management
- Advanced search and filtering
- Paginated table
- Action buttons

### Car Form
- Professional form layout
- Real-time validation
- Loading states

### Car Details
- Hero card with car info
- Individual property cards
- Edit and delete actions

---

## 🔒 Security Features

- CORS configuration for frontend
- Input validation on forms
- Confirmation dialogs for deletions
- Error handling and user feedback

---

## 📝 Future Enhancements

- [ ] User authentication & authorization
- [ ] Role-based access control
- [ ] Rental booking system
- [ ] Payment integration
- [ ] Car image uploads
- [ ] Advanced reporting
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Export data (CSV/PDF)

---

## 👥 Suitable For

- ✅ PFE (Projet de Fin d'Études) projects
- ✅ Portfolio demonstrations
- ✅ Academic presentations
- ✅ Real company deployments
- ✅ Learning enterprise architecture

---

## 📄 License

This project is created for educational and demonstration purposes.

---

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

---

## 📧 Contact

For questions or suggestions about DriveHub, please reach out to your development team.

---

**Built with ❤️ using React, Material UI, and Spring Boot**
