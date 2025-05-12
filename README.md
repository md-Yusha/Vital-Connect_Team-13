# Vital Connect

A healthcare inventory management system that allows hospitals and clinics to manage their inventory and connect with other healthcare facilities.

## Features

- Hospital/Clinic registration
- Inventory management
- Transaction tracking
- Connected facilities network
- Statistics and reporting

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)

## Project Structure

- `/src` - React frontend code
- `/backend` - Django backend code
- `/venv` - Python virtual environment

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
