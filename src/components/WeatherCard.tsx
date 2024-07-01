import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { convertTemperature, getDayName } from '@/lib/utils';
import { WeatherForecast } from '@/types/Weather';
import { useTemperatureStore } from '@/store/temperatureStore';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface WeatherCardProps {
  data: {
    date: string;
    forecasts: WeatherForecast[];
  };
}

function WeatherCard({ data }: WeatherCardProps) {
  const { unit } = useTemperatureStore();

  const formattedData = data.forecasts.map((forecast) => ({
    time: forecast.dt_txt.split(' ')[1].slice(0, 5),
    temp: convertTemperature(forecast.main.temp, unit),
    feels_like: convertTemperature(forecast.main.feels_like, unit),
    humidity: forecast.main.humidity,
    description: forecast.weather[0].description,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">
          <div className="text-xs font-medium mb-2">{data.date}</div>
          {getDayName(data.date)}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis tickFormatter={(value) => `${value}°${unit}`} />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const { temp, feels_like, humidity, description } = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow">
                    <p>
                      Temp: {temp.toFixed(2)}°{unit}
                    </p>
                    <p>
                      Feels like: {feels_like.toFixed(2)}°{unit}
                    </p>
                    <p>Humidity: {humidity}%</p>
                    <p>{description}</p>
                  </div>
                );
              }}
            />
            <Line type="monotone" dataKey="temp" stroke="#423caf" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
