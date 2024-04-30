# Weather App

## Description

The Weather App is a modern web application that provides real-time weather forecasts and climate information. Built with React and TypeScript, it utilizes data from WeatherAPI.com to deliver accurate and up-to-date weather data. This app is designed to help users plan their daily activities based on current and forecasted weather conditions.

## Features

- **Live Weather Data**: Displays current weather conditions including temperature, humidity, wind speed, and more.
- **Search Functionality**: Allows users to search for weather information by city name.
- **Responsive Design**: Ensures a seamless experience on both desktop and mobile devices.

## Technologies

- **React**: Utilizes functional components with hooks for efficient state management.
- **TypeScript**: Enhances code quality and maintainability with strong typing.
- **weatherapi.com**: Supplies the weather data needed for the application.
- **Vite**: As the build tool for a fast development experience.

## Project Setup

### Prerequisites

Ensure you have Node.js installed on your machine. This project was built using Node.js v20.10.0

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/huanamigo/weather-app.git
   cd weather-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Obtain an API key from WeatherAPI.com and add it to your environment variables:

   ```bash
   echo "VITE_KEY=\"your_api_key\"" > .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

### Building for production

To build the application for production, run:

```bash
npm run build
```

This command generates static assets in the `dist` directory that can be served over any static file server.

## Usage

After starting the app, you can:

- Use the search bar to find real-time weather and forecasts for different locations.

## Contributing

Contributions to the Weather App are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` file for more information.
