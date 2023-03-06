export interface meteoInformations {
  temperature: number;
  weathercode: number;
  time: String;
}

export interface meteoInformationsHourly {
  time: Array<String>;
  temperature: Array<number>;
  apparent_temperature: Array<number>;
  weather_code: Array<number>;
  precipitation_probability: Array<number>;
  relative_humidity: Array<number>;
}

export interface meteoInformationsDaily {
  time: Array<String>;
  weather_code: Array<number>;
  sunset: Array<number>;
  sunrise: Array<number>;
  max_temperature: Array<number>;
  min_temperature: Array<number>;
}

export interface meteoInformationsArray {
  current_weather: meteoInformations | undefined;
  hourly: meteoInformationsHourly | undefined;
  daily: meteoInformationsDaily | undefined;
}

export interface location {
  countryName: String;
  city: String;
  region: String;
}

export const emptyInformationsArray: meteoInformationsArray = {
  current_weather: {
    temperature: 0,
    time: "0",
    weathercode: 0,
  },
  daily: {
    max_temperature: new Array(7).fill(0),
    min_temperature: new Array(7).fill(0),
    sunrise: new Array(7).fill(0),
    sunset: new Array(7).fill(0),
    time: new Array(7).fill("0"),
    weather_code: new Array(7).fill(0),
  },
  hourly: {
    apparent_temperature: new Array(168).fill(0),
    precipitation_probability: new Array(168).fill(0),
    relative_humidity: new Array(168).fill(0),
    temperature: new Array(168).fill(0),
    time: new Array(168).fill("0"),
    weather_code: new Array(168).fill(0),
  },
};

export const emptyLocation: location = {
  city: "0",
  countryName: "0",
  region: "0"
}
