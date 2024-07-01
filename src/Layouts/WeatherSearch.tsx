import React, { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { useGeoLocation, useWeatherData } from '@/hooks/useWeather';
import { useWeatherStore } from '@/store/weatherStore';
import WeatherCard from '@/components/WeatherCard';
import { WeatherForecast } from '@/types/Weather';

export function WeatherSearch() {
  const {
    city,
    setCityName,
    selectedLocation,
    setSelectedLocation,
    weatherData,
    setWeatherData,
    addHistory,
  } = useWeatherStore();

  const { geoLocations, isLoading: isLoadingGeo, isError: geoError } = useGeoLocation(city);
  const {
    weatherData: fetchedWeatherData,
    isLoading: isLoadingWeather,
    isError: weatherError,
  } = useWeatherData(selectedLocation?.lat ?? 0, selectedLocation?.lon ?? 0);

  const [filteredWeatherData, setFilteredWeatherData] = useState<
    { date: string; forecasts: WeatherForecast[] }[]
  >([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fetchedWeatherData) {
      setWeatherData(fetchedWeatherData);
    }
  }, [fetchedWeatherData, setWeatherData]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (weatherData && weatherData.list) {
      const groupedByDay: { [key: string]: any[] } = {};

      for (const forecast of weatherData.list) {
        const date = forecast.dt_txt.split(' ')[0];
        if (!groupedByDay[date]) {
          groupedByDay[date] = [];
        }
        groupedByDay[date].push(forecast);
      }

      const groupedData = Object.entries(groupedByDay)
        .map(([date, forecasts]) => ({ date, forecasts }))
        .slice(0, 5);

      setFilteredWeatherData(groupedData);
    }
  }, [weatherData]);

  useEffect(() => {
    if (weatherData) {
      addHistory();
    }
  }, [weatherData, addHistory]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 relative mb-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          value={city}
          onChange={(e) => {
            setOpen(true);
            setCityName(e.target.value);
          }}
          placeholder="Enter city name"
        />
      </form>

      {isLoadingGeo && <p className="absolute">Loading locations...</p>}
      {geoError && <p className="text-red-500">Error: {geoError.message}</p>}

      {geoLocations && geoLocations.length > 0 && open && (
        <div className="relative" ref={dropdownRef}>
          <div className="absolute top-0 bg-white w-full rounded-md shadow-sm overflow-auto">
            {geoLocations.map((location) => (
              <div
                key={`${location.name}-${location.lat}-${location.lon}`}
                className="p-2 cursor-pointer hover:bg-primary/20"
                onClick={() => {
                  setOpen(false);
                  setCityName(location.name);
                  setSelectedLocation({
                    lat: location.lat,
                    lon: location.lon,
                    name: location.name,
                    country: location.country,
                  });
                }}
              >
                {location.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoadingWeather && <p className="absolute">Loading weather data...</p>}
      {weatherError && <p className="text-red-500">Error: {weatherError.message}</p>}

      {weatherData && (
        <div className="p-4 rounded border border-primary/20 !mt-14">
          <div className="mb-3">
            <h1 className="text-3xl font-bold ">
              5-Day Weather Forecast for {weatherData.city.name}, {weatherData.city.country}
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            {filteredWeatherData &&
              filteredWeatherData.map((data) => {
                return <WeatherCard data={data} key={data.date} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}
