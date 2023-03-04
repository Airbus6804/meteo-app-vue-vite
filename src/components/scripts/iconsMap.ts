import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faThunderstorm,
} from "@fortawesome/free-solid-svg-icons";

console.log(faSun.iconName);

const iconMap = new Map();
iconMap.set("0", { name: "Sunny", icon: faSun });
iconMap.set("1", { name: "Mainly clear", icon: faCloudSun });
iconMap.set("2", { name: "Partly cloudy", icon: faCloudSun });
iconMap.set("3", { name: "Overcast", icon: faCloud });
iconMap.set("45", { name: "Fog", icon: faCloud });
iconMap.set("48", { name: "Rime fog", icon: faCloud });
iconMap.set("51", { name: "Light drizzle", icon: faCloudRain });
iconMap.set("53", { name: "Moderate drizzle", icon: faCloudRain });
iconMap.set("55", { name: "Dense drizzle", icon: faCloudRain });
iconMap.set("56", { name: "Freezing Light drizzle", icon: faCloudRain });
iconMap.set("57", { name: "Freezing Dense drizzle", icon: faCloudRain });
iconMap.set("61", { name: "Slight rain", icon: faCloudRain });
iconMap.set("63", { name: "Moderate rain", icon: faCloudRain });
iconMap.set("65", { name: "Heavy rain", icon: faCloudRain });
iconMap.set("66", { name: "Freezing Light rain", icon: faCloudRain });
iconMap.set("67", { name: "Freezing Dense rain", icon: faCloudRain });
iconMap.set("71", { name: "Slight snow", icon: faSnowflake });
iconMap.set("73", { name: "Moderate snow", icon: faSnowflake });
iconMap.set("75", { name: "Heavy snow", icon: faSnowflake });
iconMap.set("77", { name: "Snow grains", icon: faSnowflake });
iconMap.set("80", { name: "Slight rain shower", icon: faCloudRain });
iconMap.set("81", { name: "Moderate rain shower", icon: faCloudRain });
iconMap.set("82", { name: "Heavy rain shower", icon: faCloudRain });
iconMap.set("85", { name: "Slight snow shower", icon: faSnowflake });
iconMap.set("86", { name: "Heavy snow shower", icon: faSnowflake });
iconMap.set("95", {
  name: "Slight or moderate thunderstorm",
  icon: faThunderstorm,
});
iconMap.set("96", {
  name: "Thunderstorm with slight hail",
  icon: faThunderstorm,
});
iconMap.set("99", {
  name: "Thunderstorm with heavy hail",
  icon: faThunderstorm,
});



export default iconMap;
