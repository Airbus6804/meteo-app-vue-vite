type meteoInformations = {
  temperature: Number;
  weathercode: Number;
  time: String;
  apparent_temperature: Number | undefined;
};

export default class Meteo {
  #baseUrl: String;
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
}
