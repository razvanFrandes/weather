export interface WeatherForeacastDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherForecast {
  dt: number;
  dt_txt: string;
  main: {
    feels_like: string;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  rain: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  visibility: number;
  weather: WeatherForeacastDescription[];
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
}

export interface WeatherData {
  list: WeatherForecast[];
  city: {
    name: string;
    country: string;
  };
}
