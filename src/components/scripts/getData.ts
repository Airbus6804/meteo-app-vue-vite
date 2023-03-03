type meteoInformations = {
  temperature: Number;
  weathercode: Number;
  time: String;
};

type meteoInformationsHourly = {
  time: Array<String>;
  temperature: Array<Number>;
  apparent_temperature: Array<Number>;
  weather_code: Array<Number>;
  precipitation_probability: Array<Number>;
};

type meteoInformationsDaily = {
  time: Array<String>;
  weather_code: Array<Number>;
  sunset: Array<Number>;
  sunrise: Array<Number>;
  max_temperature: Array<Number>;
  min_temperature: Array<Number>;
};

type meteoInformationsArray = {
  current_weather: meteoInformations | undefined;
  hourly: meteoInformationsHourly | undefined;
  daily: meteoInformationsDaily | undefined;
};

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

  async getData(
    hourly: Array<String>,
    daily: Array<String>,
    now: Boolean
  ): Promise<meteoInformationsArray> {
    if (now) {
      this.#settings.current_weather = "false";
    } else {
      this.#settings.current_weather = "true";
    }

    this.#updateBaseUrl;

    let url: string = this.#baseUrl;

    if (hourly.length) {
      url += "&hourly=";

      Object.entries(hourly).forEach((entrie) => {
        url += `${entrie[1]},`;
      });

      url = url.substring(0, url.length - 1);
    }

    if (daily.length) {
      url += "&daily=";
      Object.entries(daily).forEach((entrie) => {
        url += `${entrie[1]},`;
      });
      url = url.substring(0, url.length - 1);
    }

    let data: any = await fetch(new URL(url));

    data = await data.json();

    const ret: meteoInformationsArray = {
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

    if (hourly.length) {
      ret.hourly = {
        time: hourlyInfo.time,
        temperature: hourlyInfo.temperature_2m,
        apparent_temperature: hourlyInfo.apparent_temperature,
        weather_code: hourlyInfo.weathercode,
        precipitation_probability: hourlyInfo.precipitation_probability,
      };
    }

    if (daily.length) {
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
}
