import { useWeatherStore } from '@/store/weatherStore';
import { useTemperatureStore } from '@/store/temperatureStore';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { convertTemperature } from '@/lib/utils';

const HistoryList = () => {
  const { history } = useWeatherStore();
  const { unit } = useTemperatureStore();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      {history.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {history.map((item, index) => {
            const main = item.list[0].main;
            const weather = item.list[0].weather[0];
            return (
              <div key={index} className="col-span-1 h-full">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {item.city.name} <br />
                      {item.city.country}
                    </CardTitle>
                    <CardDescription>
                      <p>
                        Temp: {convertTemperature(main.temp, unit).toFixed(2)}°{unit}
                      </p>
                      <p>
                        Feels like: {convertTemperature(main.feels_like, unit).toFixed(2)}°{unit}
                      </p>
                      <p>Humidity: {main.humidity}%</p>
                      <p>Description: {weather.description}</p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No search history available.</p>
      )}
    </div>
  );
};

export default HistoryList;
