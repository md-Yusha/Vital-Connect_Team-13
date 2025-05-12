# Vital Connect

A comprehensive healthcare platform that connects patients with healthcare facilities, streamlines medical inventory management, and facilitates clinic registration and administration.

![Vital Connect](public/logo.png)

## Features

- **Hospital/Clinic Registration**: Interactive map-based registration system
- **Nearby Hospitals Finder**: Location-based healthcare facility search
- **Inventory Management**: Track and manage medical supplies efficiently
- **Transaction Tracking**: Monitor supply movement between facilities
- **Connected Facilities Network**: Collaborate with other healthcare providers
- **Statistics and Reporting**: Data-driven insights for better decision making

## Tech Stack

- **Frontend**:
  - React 18.3.1
  - TypeScript
  - Tailwind CSS
  - Leaflet for interactive maps
  - React Router 6.30.0
  - Lucide React for icons
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)

## Project Structure

- `/src` - React frontend code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/services` - API and service functions
- `/backend` - Django backend code
- `/venv` - Python virtual environment

## Key Components

### Custom Map Components

We've implemented custom map components using Leaflet to ensure optimal performance and compatibility:

- **CustomMap**: A simple map component for location selection
- **CustomMapWithMarkers**: An enhanced map component for displaying multiple locations

These components provide a seamless mapping experience for both clinic registration and hospital finding features.

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Backend Setup

1. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install backend dependencies:

   ```bash
   pip install django djangorestframework django-cors-headers
   ```

3. Navigate to the backend directory and run migrations:

   ```bash
   cd backend
   python manage.py migrate
   ```

4. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

You can run both the frontend and backend servers using the provided script:

```bash
./start-dev.sh
```

Or run them separately:

1. Start the backend server:

   ```bash
   cd backend
   python manage.py runserver
   ```

2. Start the frontend development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Admin interface: http://localhost:8000/admin/

## API Endpoints

- `GET /api/hospitals/` - List all hospitals
- `POST /api/hospitals/` - Register a new hospital
- `GET /api/hospitals/{id}/` - Get hospital details
- `GET /api/hospitals/{id}/inventory/` - Get hospital inventory
- `GET /api/hospitals/{id}/stats/` - Get hospital statistics
- `GET /api/inventory/` - List all inventory items
- `POST /api/inventory/` - Add a new inventory item
- `GET /api/transactions/` - List all transactions
- `POST /api/transactions/` - Create a new transaction

## License

This project is licensed under the MIT License - see the LICENSE file for details.
