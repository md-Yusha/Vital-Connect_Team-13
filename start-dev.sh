#!/bin/bash

# Start Django backend server
echo "Starting Django backend server..."
cd "$(dirname "$0")"
source venv/bin/activate
cd backend
python manage.py runserver &
BACKEND_PID=$!

# Start React frontend server
echo "Starting React frontend server..."
cd "$(dirname "$0")"
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
  echo "Stopping servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup INT

echo "Both servers are running. Press Ctrl+C to stop."
wait