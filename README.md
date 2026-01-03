# Scandiweb eCommerce Frontend

A modern React Single Page Application (SPA) built with Vite, implementing a complete eCommerce interface with product listing, cart functionality, and order management.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Components](#components)
- [State Management](#state-management)
- [GraphQL Integration](#graphql-integration)
- [Styling](#styling)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🎯 Overview

This frontend is a fully functional eCommerce SPA built with:

- **React 19.2** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **Apollo Client** - GraphQL client for data fetching
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling
- **No Component Libraries** - Custom-built components following design specifications

---

## ✨ Features

### Core Functionality
- ✅ Product listing by category
- ✅ Product detail pages with attribute selection
- ✅ Shopping cart with overlay
- ✅ Order creation
- ✅ Responsive design
- ✅ Out-of-stock product handling

### User Experience
- ✅ Quick shop functionality
- ✅ Image gallery with carousel
- ✅ Real-time cart updates
- ✅ Persistent cart (localStorage)
- ✅ Loading and error states
- ✅ Smooth transitions and animations

### Technical Features
- ✅ Functional components with hooks
- ✅ Context API for state management
- ✅ Custom hooks for data fetching
- ✅ GraphQL queries and mutations
- ✅ Test attributes for automation
- ✅ SEO-friendly routing

---

## 📦 Requirements

- **Node.js:** 18.0+ (recommended: 20.0+)
- **npm:** 9.0+ or **yarn:** 1.22+
- **Modern Browser:**
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone [repository-url]
cd frontend-me
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3. Configure Environment

Create `.env` file in the root directory:

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:8000/graphql
```

For production, update with your backend URL:

```env
VITE_GRAPHQL_ENDPOINT=https://your-backend-domain.com/graphql
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in terminal).

### 5. Build for Production

```bash
npm run build
```

Production build will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Configuration

### GraphQL Endpoint

Update the GraphQL endpoint in `src/graphql/apolloClient.js`:

```javascript
const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_GRAPHQL_ENDPOINT` | Backend GraphQL API URL | `http://localhost:8000/graphql` |

---

## 📁 Project Structure

```
frontend-me/
├── public/              # Static assets
│   └── .htaccess        # Deployment configuration
├── src/
│   ├── components/      # Reusable components
│   │   ├── Cart.jsx
│   │   ├── CartOverlay.jsx
│   │   ├── Categories.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Logo.jsx
│   │   ├── MainContent.jsx
│   │   ├── Product.jsx
│   │   ├── ProductAttributeOptions.jsx
│   │   ├── ProductGallery.jsx
│   │   ├── ProductList.jsx
│   │   └── ProductPrice.jsx
│   ├── context/         # React Context providers
│   │   ├── CartContext.jsx
│   │   └── CategoriesContext.jsx
│   ├── graphql/         # GraphQL configuration
│   │   ├── apolloClient.js
│   │   ├── mutations.js
│   │   └── queries.js
│   ├── hooks/           # Custom React hooks
│   │   ├── useCategories.js
│   │   ├── useOrder.js
│   │   └── useProducts.js
│   ├── pages/          # Page components
│   │   ├── CategoryPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── ProductPage.jsx
│   ├── utils/          # Utility functions
│   │   ├── graphqlHelpers.js
│   │   └── testHelpers.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── README.md          # This file
```

---

## 🏗️ Architecture

### Component Hierarchy

```
App
├── ApolloProvider (GraphQL)
├── BrowserRouter (Routing)
├── CategoriesProvider (Context)
├── CartProvider (Context)
└── Layout
    ├── Header
    │   ├── Categories
    │   ├── Logo
    │   └── Cart
    └── MainContent
        ├── CartOverlay
        └── Routes
            ├── CategoryPage
            ├── ProductPage
            └── NotFoundPage
```

See `REACT_COMPONENT_TREE.md` for detailed component tree documentation.

### State Management

**Context API:**
- `CartContext` - Cart state and operations
- `CategoriesContext` - Categories data

**Local State:**
- Component-specific state using `useState` and `useReducer`
- Form state for attribute selection

**Data Fetching:**
- Custom hooks (`useProducts`, `useCategories`)
- Apollo Client for GraphQL queries

---

## 🧩 Components

### Layout Components

#### `Layout.jsx`
Main layout wrapper for the application.

#### `Header.jsx`
Application header containing navigation and cart button.

#### `MainContent.jsx`
Main content area wrapper.

### Navigation Components

#### `Categories.jsx`
- Displays category navigation links
- Highlights active category
- **Test Attributes:** `data-testid="category-link"`, `data-testid="active-category-link"`

#### `Logo.jsx`
Application logo component.

### Cart Components

#### `Cart.jsx`
- Cart button with item count badge
- Opens cart overlay on click
- **Test Attributes:** `data-testid="cart-btn"`

#### `CartOverlay.jsx`
- Full cart sidebar with items
- Quantity controls
- Order placement
- **Test Attributes:**
  - `data-testid="cart-item-attribute-{name}"`
  - `data-testid="cart-item-amount-increase"`
  - `data-testid="cart-item-amount-decrease"`
  - `data-testid="cart-item-amount"`
  - `data-testid="cart-total"`

### Product Components

#### `Product.jsx`
- Product card for listings
- Quick shop button
- Out-of-stock handling
- **Test Attributes:** `data-testid="product-{kebab-case-name}"`

#### `ProductList.jsx`
Grid container for product cards.

#### `ProductGallery.jsx`
- Image carousel with thumbnails
- Navigation arrows
- **Test Attributes:** `data-testid="product-gallery"`

#### `ProductAttributeOptions.jsx`
- Attribute selection interface
- Swatch buttons for colors
- Text buttons for sizes
- **Test Attributes:**
  - `data-testid="product-attribute-{name}"`
  - `data-testid="product-attribute-{name}-{value}"`

#### `ProductPrice.jsx`
Formatted price display with currency symbol.

### Page Components

#### `CategoryPage.jsx`
Product listing page for a category.

#### `ProductPage.jsx`
- Product detail page
- Attribute selection
- Add to cart functionality
- **Test Attributes:**
  - `data-testid="add-to-cart"`
  - `data-testid="product-description"`

#### `NotFoundPage.jsx`
404 error page.

---

## 🔄 State Management

### Cart Context

```javascript
const {
  cartOpened,
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getCartCount,
  getCartTotal,
  getCurrencySymbol,
} = useCart();
```

**Features:**
- Persistent storage (localStorage)
- Automatic cart item key generation
- Quantity management
- Total calculation

### Categories Context

```javascript
const { categories } = useCategories();
```

**Features:**
- Fetches categories on mount
- Provides categories to all components

---

## 🔌 GraphQL Integration

### Apollo Client Setup

```javascript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
```

### Queries

Located in `src/graphql/queries.js`:

- `GET_ALL_CATEGORIES` - Fetch all categories
- `GET_PRODUCTS_BY_CATEGORY` - Fetch products by category
- `GET_PRODUCT_BY_ID` - Fetch single product

### Mutations

Located in `src/graphql/mutations.js`:

- `CREATE_ORDER` - Create new order from cart

### Custom Hooks

**useProducts:**
```javascript
const { products, loading, error } = useProductsByCategory('all');
const { product, loading, error } = useProduct(productId);
```

**useCategories:**
```javascript
const { categories, loading, error } = useCategories();
```

**useOrder:**
```javascript
const { createOrder, loading } = useCreateOrder();
```

---

## 🎨 Styling

### CSS Modules

Each component has its own `.module.css` file for scoped styling.

**Example:**
```javascript
import styles from './Product.module.css';

<div className={styles["product-card"]}>
```

### Naming Convention

- BEM-like naming (kebab-case)
- Component-specific classes
- No global style conflicts

### Global Styles

`src/index.css` contains:
- CSS reset
- Base typography
- Global variables (if needed)

---

## 🧪 Testing

### Test Attributes

All interactive elements have `data-testid` attributes for automated testing:

- Product cards: `data-testid="product-{name}"`
- Category links: `data-testid="category-link"`
- Cart elements: Various cart-related test IDs
- Product attributes: `data-testid="product-attribute-{name}"`

### Auto QA Tool

Test your deployment with the official Auto QA tool:
http://165.227.98.170/

Ensure all tests pass before submission.

### Manual Testing Checklist

- [ ] Product listing displays correctly
- [ ] Category navigation works
- [ ] Product detail page loads
- [ ] Attribute selection works
- [ ] Add to cart functionality
- [ ] Cart overlay opens/closes
- [ ] Quantity controls work
- [ ] Order creation works
- [ ] Cart persists on page refresh
- [ ] Out-of-stock products handled correctly

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

#### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

The `vercel.json` configuration is included.

#### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`

#### Static Hosting

Upload the `dist/` directory to any static hosting service:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Any web server

### Environment Variables

Set `VITE_GRAPHQL_ENDPOINT` in your hosting platform's environment variables.

### Production Checklist

- [ ] Update GraphQL endpoint to production URL
- [ ] Test all functionality in production
- [ ] Verify Auto QA tests pass
- [ ] Check CORS configuration on backend
- [ ] Test cart persistence
- [ ] Verify images load correctly
- [ ] Test on multiple browsers
- [ ] Check mobile responsiveness

---

## 📚 Dependencies

### Production

- **react** (^19.2.0) - React library
- **react-dom** (^19.2.0) - React DOM renderer
- **react-router-dom** (^7.11.0) - Routing
- **@apollo/client** (^4.0.11) - GraphQL client
- **graphql** (^16.12.0) - GraphQL library
- **html-react-parser** (^5.2.11) - HTML parsing
- **react-icons** (^5.5.0) - Icon library

### Development

- **vite** (^7.2.4) - Build tool
- **@vitejs/plugin-react** (^5.1.1) - React plugin
- **eslint** (^9.39.1) - Linting
- **autoprefixer** (^10.4.23) - CSS autoprefixing
- **postcss** (^8.5.6) - CSS processing

---

## 🔧 Troubleshooting

### Common Issues

**1. GraphQL Connection Error**
- Verify backend is running
- Check `VITE_GRAPHQL_ENDPOINT` environment variable
- Check CORS configuration on backend

**2. Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+ required)

**3. Routing Issues**
- Ensure server is configured for SPA (all routes → index.html)
- Check `vercel.json` or server configuration

**4. Cart Not Persisting**
- Check browser localStorage is enabled
- Verify CartContext is properly implemented

---

## 📖 Additional Documentation

- **Component Tree:** See `REACT_COMPONENT_TREE.md` in project root
- **Database ERD:** See `DATABASE_ERD.md` for backend schema
- **Backend README:** See `../backend-me/README.md`

---

## 🎓 Learning Resources

This project was built while learning:
- React fundamentals and hooks
- GraphQL and Apollo Client
- Modern JavaScript (ES6+)
- CSS Modules
- State management patterns

---

## 📝 License

This project is part of a test task submission for Scandiweb.

---

## 🙏 Acknowledgments

- Scandiweb for providing the test task and design
- React team for the excellent framework
- Apollo GraphQL for the powerful client library
- Vite team for the fast build tool

---

**Built with ❤️ for Scandiweb**
