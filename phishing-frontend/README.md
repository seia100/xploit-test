# Phishing Frontend Setup

This frontend application is part of a phishing lab simulation for educational purposes. It simulates the interface of Banco de la Nación for security testing and awareness training.

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- Backend server running at http://localhost:8000

## Installation

1. Clone the repository (if you haven't already):

```bash
git clone https://your-repository-url/phishing-frontend.git
cd phishing-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create the necessary asset files:
   - Create `/src/assets` directory and add the following:
     - `logoBN.svg` - Logo for Banco de la Nación
     - `banner-banco.jpg` - Banner image for homepage
     - `success-icon.svg` - Success icon for the confirmation page

## Configuration

The application is configured to connect to the backend API running at http://localhost:8000. If your backend runs on a different port or host, modify the `proxy` setting in `package.json`:

```json
"proxy": "http://your-backend-host:port"
```

## Running the Application

Start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000

## Building for Production

To create a production build:

```bash
npm run build
```

The production files will be available in the `build` directory. You can serve these files using any static file server.

## Project Structure

- `public/` - Static assets and HTML template
- `src/` - Source code
  - `assets/` - Images and SVG files
  - `components/` - Reusable React components
  - `pages/` - Page components for different routes
  - `services/` - API service files
  - `App.js` - Main application component
  - `index.js` - Application entry point

## Connecting to the Backend

This frontend communicates with the Laravel backend through API endpoints:

- `/api/phishing/login` - For submitting login credentials
- `/api/phishing/verification` - For submitting card verification data

## Security Notice

This application is for educational purposes only and should only be used in a controlled environment with proper authorization for security testing and awareness training.

## Legal Disclaimer

This simulation should never be used to deceive or defraud real users. Always ensure you have proper authorization before conducting any security testing or simulations.