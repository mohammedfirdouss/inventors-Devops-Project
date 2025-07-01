
# Inventors Community Todo App - Deployment Guide

## Overview
This project has two parts:
- **Backend**: Node.js Express API (port 3000)
- **Frontend**: React app built with Vite (port 5173 for dev, 80 in container)

You can run both parts together using Docker Compose. Images can be built and pushed to Docker Hub using GitHub Actions.

---

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/) installed
- (Optional) [MongoDB](https://www.mongodb.com/try/download/community) running locally for development
- Docker Hub account for pushing images

---

## Local Development (without Docker)

### Backend
1. Go to the backend folder:
   ```sh
   cd backend
   ```
2. Copy the example environment file:
   ```sh
   cp env.example .env
   # Edit .env if needed
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm run dev
   ```
   The API will be at [http://localhost:3000](http://localhost:3000)

### Frontend
1. Go to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be at [http://localhost:5173](http://localhost:5173)

---

## Running with Docker Compose

1. Make sure MongoDB is running locally on your machine at `mongodb://localhost:27017/inventors_todo`.
2. From the project root, run:
   ```sh
   docker-compose up --build
   ```
3. The backend will be at [http://localhost:3000](http://localhost:3000)
4. The frontend will be at [http://localhost:5173](http://localhost:5173)

- The backend connects to MongoDB using the connection string in the `docker-compose.yml` file.
- Health checks are set up for both services. The backend health endpoint is `/api/health`. The frontend health endpoint is `/`.

---

## Building and Pushing Images to Docker Hub

1. Set up two secrets in your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: A Docker Hub access token (not your password)
2. On every push to the `main` branch, GitHub Actions will:
   - Build Docker images for both frontend and backend
   - Push them to Docker Hub as `inventors-frontend:latest` and `inventors-backend:latest` under your account

You can find the workflow file at `.github/workflows/docker-publish.yml`.

---

## Health Checks
- **Backend**: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Frontend**: [http://localhost:5173/](http://localhost:5173/)

---

## Notes
- If you want to run MongoDB as a container, you can add a `mongo` service to `docker-compose.yml`.
- The backend expects the `MONGODB_URI` environment variable to be set.
- The frontend is served by nginx in production (containerized build).

---

For any issues, check the logs of each service:
```sh
docker-compose logs backend
docker-compose logs frontend
```


## Images
![Screenshot Capture - 2025-07-01 - 10-47-51](https://github.com/user-attachments/assets/0ed5899c-c517-4217-9d5e-c76964775371)
![Screenshot Capture - 2025-07-01 - 10-48-18](https://github.com/user-attachments/assets/45148adf-3bbf-438e-a8b9-86cfa2f11f78)
![Screenshot Capture - 2025-07-01 - 10-48-43](https://github.com/user-attachments/assets/7b23ce5d-c7a4-4ecf-957e-29f500a357bf)
![Screenshot Capture - 2025-07-01 - 10-49-03](https://github.com/user-attachments/assets/eb75c95b-7224-4e7d-a4a0-657718fcd82c)
![Screenshot Capture - 2025-07-01 - 10-51-49](https://github.com/user-attachments/assets/2cf034a5-7ee0-414d-adf0-1a43a05150e1)
![Screenshot Capture - 2025-07-01 - 10-53-09](https://github.com/user-attachments/assets/4057f6de-ebbf-4fba-9bf9-278f0bc0b411)
![Screenshot Capture - 2025-07-01 - 10-53-48](https://github.com/user-attachments/assets/414046fc-8a69-4fe5-83cf-4e272f3dd37e)
![Screenshot Capture - 2025-07-01 - 10-53-55](https://github.com/user-attachments/assets/5c389245-9d91-4517-9cbd-712e9be12920)



