# AutoHub Frontend - Vehicle Rental Management System

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-Latest-ff4154?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9-764abc?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38b2ac?logo=tailwind-css&logoColor=white)

Welcome to AutoHub - A modern React application built with TypeScript and TanStack Router, providing an intuitive interface for vehicle rental management.

## 📋 Table of Contents

- [System Overview](#-system-overview)
- [System Flow](#-system-flow)
- [Architecture](#-architecture)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Routing](#-routing-with-tanstack-router)
- [State Management](#-state-management)
- [UI Components](#-ui-components)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Styling](#-styling)
- [Linting & Formatting](#-linting--formatting)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## 🏢 System Overview

AutoHub Frontend is a modern React application providing an intuitive interface for vehicle rental management. The application offers seamless user experiences for browsing vehicles, making bookings, and managing rentals.

### Key Technologies:

- **Framework:** React 18.x with TypeScript
- **Routing:** TanStack Router for type-safe routing
- **Build Tool:** Vite for fast development and building
- **State Management:** Redux Toolkit with RTK Query
- **UI Components:** Custom components with Lucide Icons
- **Forms:** React Hook Form with Zod validation
- **Styling:** Tailwind CSS with modern CSS features
- **API Client:** Axios for HTTP requests

## 🧩 System Flow

High-level flow diagrams for core user roles in AutoHub.

### Customer Flow

The customer journey covers browsing vehicles, account/authentication, booking, payment, and post-booking management.

![Customer Flow](./customerflow.png "Customer System Flow")

### Admin Flow

Administrators handle inventory, bookings, users, and reporting via the admin dashboard.

![Admin Flow](./Adminflow.png "Admin System Flow")

## 🏗️ Architecture

### Project Structure

```text
src/
├── main.tsx                     # Application entry point
├── App.tsx                      # Root application component
├── router.tsx                   # Router configuration
├── styles.css                   # Global styles
├── routes/                      # TanStack Router route definitions
│   ├── __root.tsx               # Root route with layout
│   ├── index.tsx                # Home page route
│   ├── auth/                    # Authentication routes
│   ├── dashboard/               # User dashboard routes
│   ├── admin/                   # Admin panel routes
│   ├── vehicles/                # Vehicle browsing routes
│   └── bookings/                # Booking management routes
├── components/                  # Reusable UI components
│   ├── ui/                      # Basic UI components (Button, Input, etc.)
│   ├── layout/                  # Layout components (Header, Footer, etc.)
│   ├── vehicles/                # Vehicle-related components
│   ├── booking/                 # Booking-related components
│   └── admin/                   # Admin-specific components
├── store/                       # Redux store configuration
│   ├── slices/                  # Redux slices
│   ├── api/                     # RTK Query API definitions
│   └── hooks.ts                 # Redux hooks
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── types/                       # TypeScript type definitions
├── constants/                   # Application constants
└── assets/                      # Static assets (images, icons, etc.)
```

### TanStack Router Configuration

The application uses TanStack Router for type-safe routing:

```typescript
// routes/__root.tsx
export const Route = createRootRoute({
  component: RootComponent,
});

// Route definition with type-safe params
const vehiclesRoute = createRoute({
  getParentRoute: () => Route,
  path: 'vehicles',
  component: VehiclesPage,
});

const vehicleDetailRoute = createRoute({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  parseParams: (params) => ({
    vehicleId: z.string().parse(params.vehicleId),
  }),
  component: VehicleDetailPage,
});
```
## ✨ Features

### User-Facing Features
- **Vehicle Browsing:** Filterable vehicle catalog with search functionality
- **Booking System:** Intuitive booking process with date selection
- **User Authentication:** Secure login/registration with JWT tokens
- **Dashboard:** Personal dashboard for managing bookings and profile
- **Payment Processing:** Integrated Stripe payment flow
- **Responsive Design:** Mobile-first responsive design

### Admin Features
- **Dashboard Analytics:** Charts and metrics for business insights
- **Vehicle Management:** CRUD operations for vehicle inventory
- **User Management:** Admin controls for user accounts
- **Booking Management:** View and manage all bookings
- **Reporting System:** Financial and operational reports
- **Support Management:** Customer ticket handling system

### Technical Features
- **Type-Safe Routing:** Full TypeScript integration with TanStack Router
- **State Management:** Centralized state with Redux Toolkit
- **API Integration:** RTK Query for efficient data fetching
- **Form Handling:** React Hook Form with Zod validation
- **Error Boundaries:** Graceful error handling
- **Loading States:** Skeleton loaders and loading indicators
- **PWA Ready:** Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm package manager

### Step-by-Step Setup
1. **Clone the repository**
```bash
git clone https://github.com/tmothykhalayi/AutoHub.git
cd AutoHub/Client
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment configuration**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
VITE_API_URL="http://localhost:3001/api"
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
VITE_APP_NAME="AutoHub"
```

4. **Start the development server**
```bash
pnpm start
```

The application will be available at http://localhost:5173

### Building For Production
To build this application for production:
```bash
pnpm build
```

## 🧭 Routing with TanStack Router

### Route Definitions
TanStack Router uses file-based routing with type safety:

```typescript
// routes/vehicles/$vehicleId.tsx
import { createRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createRoute({
  getParentRoute: () => vehiclesRoute,
  path: '$vehicleId',
  parseParams: (params) => ({
    vehicleId: z.string().uuid().parse(params.vehicleId),
  }),
  component: VehicleDetailPage,
});

// Using the route in components
function VehicleDetailPage() {
  const { vehicleId } = Route.useParams();
  // vehicleId is type-safe string
}
```

### Navigation
```typescript
import { useNavigate } from '@tanstack/react-router';

function Component() {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate({
      to: '/vehicles/$vehicleId',
      params: { vehicleId: '123e4567-e89b-12d3-a456-426614174000' },
    });
  };
  
  return <button onClick={handleNavigate}>View Vehicle</button>;
}
```

### Adding Links
To use SPA (Single Page Application) navigation:

```tsx
import { Link } from "@tanstack/react-router";

// In your JSX
<Link to="/about">About</Link>
```

### Using A Layout
In the File Based Routing setup, the layout is located in `src/routes/__root.tsx`. Example:

```tsx
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
```
## 🗃️ State Management

### Redux Store Structure
```typescript
// store/slices/authSlice.ts
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
```

### TanStack Store (Alternative)
```typescript
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";

const countStore = new Store(0);

const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

function App() {
  const count = useStore(countStore);
  const doubledCount = useStore(doubledStore);

  return (
    <div>
      <button onClick={() => countStore.setState((n) => n + 1)}>
        Increment - {count}
      </button>
      <div>Doubled - {doubledCount}</div>
    </div>
  );
}
```
## 🎨 UI Components

### Component Structure
```tsx
// components/vehicles/VehicleCard.tsx
interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  return (
    <div className="rounded-lg border shadow-sm p-4 hover:shadow-md transition-all">
      <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-48 object-cover rounded" />
      <h3 className="font-bold mt-2">{vehicle.manufacturer} {vehicle.model}</h3>
      <p className="text-primary">${vehicle.rentalRate}/day</p>
      <button 
        onClick={() => onSelect(vehicle)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
};
```
## 🔌 API Integration

### RTK Query Setup
```typescript
// store/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
```

### Data Fetching with Route Loaders
```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```
## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for testing:

```bash
pnpm test
```
### Testing Components
```tsx
// __tests__/VehicleCard.test.tsx
import { render, screen } from '@testing-library/react';
import { VehicleCard } from '../components/VehicleCard';

const mockVehicle = {
  vehicleId: '1',
  manufacturer: 'Toyota',
  model: 'Camry',
  rentalRate: 45,
};

describe('VehicleCard', () => {
  it('renders vehicle information', () => {
    render(<VehicleCard vehicle={mockVehicle} onSelect={jest.fn()} />);
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('$45/day')).toBeInTheDocument();
  });
});
```
## 🚀 Deployment

### Build for Production
```bash
# Build the application
pnpm build

# Preview the build
pnpm preview
```

### Environment Variables for Production
```env
VITE_API_URL="https://api.autohub.example.com"
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_your-stripe-publishable-key"
VITE_APP_NAME="AutoHub"
```

### Deployment Platforms

#### Vercel
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

#### Netlify
```toml
# netlify.toml
[build]
  publish = "dist"
  command = "pnpm build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
## 🤝 Contributing

### Development Guidelines
- Follow TypeScript best practices
- Use TanStack Router for all navigation
- Write tests for new components and features
- Follow the established component structure
- Use Tailwind CSS for styling
- Update documentation for new features

### Commit Message Convention
```
feat: add new vehicle filter component
fix: resolve booking date validation issue
docs: update routing documentation
style: improve responsive design for mobile
refactor: simplify authentication logic
test: add tests for payment component
```

## 📞 Support

For support regarding the AutoHub Frontend:
- Check the documentation first
- Review existing GitHub Issues
- Create a new issue with detailed description
- Email: support@autohub.example.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

AutoHub Frontend - Modern, type-safe vehicle rental management interface built with React and TanStack Router.




# Demo Files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
