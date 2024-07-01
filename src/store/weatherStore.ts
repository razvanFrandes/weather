import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData } from '@/types/Weather';
import { GeoLocation } from '@/types/Location';

interface WeatherState {
  city: string;
  setCityName: (cityName: string) => void;
  temperature: number | null;
  description: string;
  setWeather: (city: string, temperature: number, description: string) => void;
  selectedLocation: GeoLocation | null;
  setSelectedLocation: (location: GeoLocation | null) => void;
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData) => void;
  history: WeatherData[];
  lastAddedCity: string;
  addHistory: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      city: '',
      setCityName: (cityName) => set({ city: cityName }),
      temperature: null,
      description: '',
      setWeather: (city, temperature, description) => set({ city, temperature, description }),
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      weatherData: null,
      setWeatherData: (data) => set({ weatherData: data }),
      history: [],
      lastAddedCity: '',
      addHistory: () => {
        const state = get();
        if (state.weatherData && state.weatherData.city.name !== state.lastAddedCity) {
          set({
            history: [state.weatherData, ...state.history].slice(0, 10),
            lastAddedCity: state.weatherData.city.name,
          });
        }
      },
    }),
    {
      name: 'weather-storage',
      getStorage: () => localStorage,
    },
  ),
);
