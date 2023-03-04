export interface meteoInformations {
  temperature: Number;
  weathercode: Number;
  time: String;
};

export interface meteoInformationsHourly {
  time: Array<String>;
  temperature: Array<Number>;
  apparent_temperature: Array<Number>;
  weather_code: Array<Number>;
  precipitation_probability: Array<Number>;
  relative_humidity: Array<Number>
};

export interface meteoInformationsDaily {
  time: Array<String>;
  weather_code: Array<Number>;
  sunset: Array<Number>;
  sunrise: Array<Number>;
  max_temperature: Array<Number>;
  min_temperature: Array<Number>;
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

