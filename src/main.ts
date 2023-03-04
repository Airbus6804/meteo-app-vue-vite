import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

function getLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      localStorage.setItem("latitude", latitude.toString());
      localStorage.setItem("longitude", longitude.toString());
    });
  }
}

if (!localStorage.getItem("latitude")) {
  getLoc();
}

createApp(App).mount("#app");

let latitude = 1,
  longitude = 1;

/*console.log(localStorage.getItem("latitude"));
console.log(localStorage.getItem("longitude"));*/
