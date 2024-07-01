# Weather App

## Overview

This Weather App is a responsive and dynamic application that provides weather forecasts. The app allows users to search for weather information by city and view a detailed 5-day weather forecast. Additionally, it maintains a search history and allows toggling between Celsius and Fahrenheit units for temperature display.

## Features

- Search for weather information by city.
- Display detailed 5-day weather forecast.
- Toggle temperature units between Celsius and Fahrenheit.
- Maintain and display a search history.
- Responsive design for optimal viewing on all devices.

## Built With

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A small, fast, and scalable bearbones state management solution using simplified flux principles.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **TanStack Router**: A powerful, type-safe router for building applications with complex routing requirements.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **ShadCN**: A design system implementation using Tailwind CSS for consistent and cohesive styling.

## Project Structure

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── TemperatureSwitch.tsx
│   │   ├── WeatherCard.tsx
│   │   ├── WeatherSearch.tsx
│   │   ├── HistoryList.tsx
│   │   └── ...
│   ├── hooks
│   │   ├── useGeoLocation.ts
│   │   ├── useWeatherData.ts
│   │   └── ...
│   ├── store
│   │   ├── temperatureStore.ts
│   │   ├── weatherStore.ts
│   │   └── ...
│   ├── styles
│   │   └── ...
│   ├── types
│   │   └── Weather.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── ...
```

## Usage

### Searching for Weather Information

1. Enter the name of a city in the search input.
2. The app will fetch and display the weather forecast for the specified city.
3. The forecast includes temperature, feels-like temperature, humidity, and weather description.