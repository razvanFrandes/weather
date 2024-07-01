import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { GeoLocation } from '@/types/Location';
import { WeatherData } from '@/types/Weather';

export function useGeoLocation(cityName: string) {
  const { data, error, isLoading } = useSWR<GeoLocation[], Error>(
    cityName ? `/geo/1.0/direct?q=${cityName}&limit=5` : null,
    fetcher,
  );

  return {
    geoLocations: data,
    isLoading,
    isError: error,
  };
}

export function useWeatherData(lat: number, lon: number) {
  const { data, error, isLoading } = useSWR<WeatherData, Error>(
    lat && lon ? `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric` : null,
    fetcher
  );

  return {
    weatherData: data,
    isLoading,
    isError: error,
  };
}
