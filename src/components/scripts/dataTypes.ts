export interface meteoInformations {
  temperature: number;
  weathercode: number;
  time: String;
};

export interface meteoInformationsHourly {
  time: Array<String>;
  temperature: Array<number>;
  apparent_temperature: Array<number>;
  weather_code: Array<number>;
  precipitation_probability: Array<number>;
  relative_humidity: Array<number>
};

export interface meteoInformationsDaily {
  time: Array<String>;
  weather_code: Array<number>;
  sunset: Array<number>;
  sunrise: Array<number>;
  max_temperature: Array<number>;
  min_temperature: Array<number>;
};

export interface meteoInformationsArray {
  current_weather: meteoInformations | undefined;
  hourly: meteoInformationsHourly | undefined;
  daily: meteoInformationsDaily | undefined;
};

export interface location{
  countryName: String;
  city: String;
  region: String;
}

