# Timray Concept - Premium E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, featuring a sleek dark UI and comprehensive product management system.

## 🚀 Features

- **Modern UI/UX**: Clean, minimalist dark theme with premium aesthetics
- **Full-Stack Architecture**: Next.js frontend with API routes and MySQL database
- **Authentication**: Secure user authentication with NextAuth.js
- **Product Management**: Complete CRUD operations for products
- **Shopping Cart**: Persistent cart with local storage
- **User Dashboard**: Account management, order history, and wishlist
- **Admin Panel**: Product management and order tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database**: MySQL with Prisma ORM
- **Image Management**: Local image storage and optimization

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **NextAuth.js** - Authentication solution

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern database toolkit
- **MySQL** - Relational database
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Austin-G-95/Timray-Concept.git
   cd Timray-Concept
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/timray_db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # Seed the database with sample data
   node prisma/seed-local-images.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

### Prerequisites
- **XAMPP** or **MySQL Server** running on localhost:3306
- Create a database named `timray_db`

### Schema
The application uses the following main entities:
- **Users** - Customer accounts and authentication
- **Products** - Product catalog with categories
- **Orders** - Purchase history and tracking
- **Wishlist** - User saved items

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: Gray shades (#1F2937, #374151, #6B7280)
- **Accent**: White (#FFFFFF)
- **Text**: Light gray (#E5E7EB, #9CA3AF)

### Typography
- **Font**: Inter (system font stack)
- **Weights**: 400 (regular), 700 (bold), 800 (black)

## 📱 Pages & Features

### Public Pages
- **Homepage** - Hero section, featured products, categories
- **Products** - Product catalog with filtering
- **Product Details** - Individual product pages
- **About** - Company information and team
- **Contact** - Contact form and information
- **FAQ** - Frequently asked questions

### User Pages
- **Login/Signup** - Authentication pages
- **Account Dashboard** - User profile management
- **Order History** - Past purchases and tracking
- **Wishlist** - Saved products
- **Cart** - Shopping cart and checkout

### Admin Pages
- **Admin Dashboard** - Product and order management
- **Product Management** - Add, edit, delete products

## 🔧 Configuration

### Admin Access
- **Secret Key**: `009911tca`
- Access admin panel at `/admin` with the secret key

### Image Management
- Product images stored in `/frontend/public/img/`
- Optimized with Next.js Image component
- Support for various formats (JPG, PNG, WebP)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 👥 Team

- **Timothy Akubo** - CEO & Founder
- **Adaora Okafor** - Product Sync Manager
- **Chinedu Okwu** - Tech Director
- **Austin-Great Akubo** - Web Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and inquiries:
- **Email**: support@timrayconcept.com
- **WhatsApp**: Join our Inner Circle group
- **Website**: [timrayconcept.com](https://timrayconcept.com)

---

**Built with ❤️ by the Timray Concept Team**