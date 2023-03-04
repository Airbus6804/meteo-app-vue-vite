import * as types from './dataTypes';

export default class Meteo {
  #baseUrl: string;
  #lat: Number;
  #lon: Number;

  #settings = {
    current_weather: "true",
    timezone: "auto",
  };

  static parameters = {
    hourly: {
      temperature: "temperature_2m",
      apparent_temperature: "apparent_temperature",
      precipitation_probability: "precipitation_probability",
      weathercode: "weathercode",
      relative_humidity: "relativehumidity_2m",
    },

    daily: {
      weathercode: "weathercode",
      min_temperature: "temperature_2m_min",
      max_temperature: "temperature_2m_max",
      sunrise: "sunrise",
      sunset: "sunset",
    },
  };

  constructor(lat: Number, lon: Number) {
    this.#baseUrl = ``;
    this.#lat = lat;
    this.#lon = lon;
    this.#updateBaseUrl();
  }

  #updateBaseUrl() {
    this.#baseUrl = `https://api.open-meteo.com/v1/forecast?latitude=${
      this.#lat
    }&longitude=${this.#lon}`;

    Object.entries(this.#settings).forEach((entrie) => {
      this.#baseUrl += `&${entrie[0]}=${entrie[1]}`;
    });

    //console.log(this.#baseUrl)
  }

  async getData(options: {
    
    hourly?: Array<string>;
    daily?: Array<string>;
    now?: Boolean;
  }): Promise<types.meteoInformationsArray> {
    const { hourly, daily, now } = options;
    if (now) {
      this.#settings.current_weather = "false";
    } else {
      this.#settings.current_weather = "true";
    }

    this.#updateBaseUrl;

    let url: string = this.#baseUrl;

    if (hourly) {
      url += "&hourly=";

      Object.entries(hourly).forEach((entrie) => {
        url += `${entrie[1]},`;
      });

      url = url.substring(0, url.length - 1);
    }

    if (daily) {
      url += "&daily=";
      Object.entries(daily).forEach((entrie) => {
        url += `${entrie[1]},`;
      });
      url = url.substring(0, url.length - 1);
    }

    let data: any = await fetch(new URL(url));

    data = await data.json();

    const ret: types.meteoInformationsArray = {
      current_weather: undefined,
      daily: undefined,
      hourly: undefined,
    };

    const { current_weather, hourly: hourlyInfo, daily: dailyInfo } = data;
    if (now) {
      ret.current_weather = {
        temperature: current_weather.temperature,
        time: current_weather.time,
        weathercode: current_weather.weathercode,
      };
    }

    if (hourly) {
      ret.hourly = {
        time: hourlyInfo.time,
        temperature: hourlyInfo.temperature_2m,
        apparent_temperature: hourlyInfo.apparent_temperature,
        weather_code: hourlyInfo.weathercode,
        precipitation_probability: hourlyInfo.precipitation_probability,
        relative_humidity: hourlyInfo.relativehumidity_2m,
      };
    }

    if (daily) {
      ret.daily = {
        max_temperature: dailyInfo.temperature_2m_max,
        min_temperature: dailyInfo.temperature_2m_min,
        weather_code: dailyInfo.weathercode,
        time: dailyInfo.time,
        sunrise: dailyInfo.sunrise,
        sunset: dailyInfo.sunset,
      };
    }

    return ret;
  }

  async getNow() {
    const { current_weather: ret } = await this.getData({
      now: true,
    });
    return ret;
  }

  async getDaily() {
    const { daily } = Meteo.parameters;
    const { daily: ret } = await this.getData({
      daily: [
        daily.sunset,
        daily.sunrise,
        daily.weathercode,
        daily.min_temperature,
        daily.max_temperature,
      ],
    });
    return ret;
  }

  async getHourly() {
    const { hourly } = Meteo.parameters;
    const { hourly: ret } = await this.getData({
      hourly: [
        hourly.temperature,
        hourly.weathercode,
        hourly.apparent_temperature,
        hourly.precipitation_probability,
        hourly.relative_humidity,
      ],
    });
    return ret;
  }

  async getAll() {
    const { hourly, daily } = Meteo.parameters;

    return await this.getData({
      hourly: [
        hourly.temperature,
        hourly.weathercode,
        hourly.apparent_temperature,
        hourly.precipitation_probability,
      ],
      daily: [
        daily.sunset,
        daily.sunrise,
        daily.weathercode,
        daily.min_temperature,
        daily.max_temperature,
      ],
      now: true,
    });
  }

  async getLocationInfo(): Promise<types.location>{
    let data:any = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.#lat}&longitude=${this.#lon}`
    );

    data = await data.json();

    console.log(data)

    return {
      city: data.locality,
      countryName: data.countryName,
      region: data.principalSubdivision
    }


  
  }
}
