<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faGear, faX, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { ref } from "vue";

import { onMounted } from "vue";

import Switches from "vue-switches";

library.add(faGear, faSun, faMoon);

defineEmits(["changeSettings"]);

const gear = "fa-solid fa-" + faGear.iconName;

const bgColor = ref("light");

function log(...data: any) {
  console.log(...data);
}

type bg = {
  name: string;
  url: URL;
  checked: any;
};

const backgroundsArray: Array<bg> = [
  {
    name: "Default",
    url: new URL("./../backgrounds/default.jpg", document.baseURI),
    checked: ref(true),
  },
  {
    name: "Big Ben",
    url: new URL("./../backgrounds/Big Ben.jpg", document.baseURI),
    checked: ref(false),
  },
  {
    name: "Colusseum",
    url: new URL("../../backgrounds/Colusseum.jpg", document.baseURI),
    checked: ref(false),
  },
  {
    name: "Pyramid",
    url: new URL("../../backgrounds/pyramid.jpg", document.baseURI),
    checked: ref(false),
  },
  {
    name: "Ocean",
    url: new URL("../../backgrounds/ocean.jpg", document.baseURI),
    checked: ref(false),
  },
];

const backgrounds = new Set(backgroundsArray);
const settings = JSON.parse(localStorage.getItem("meteoSettings") ?? "{}")

function uncheckAll() {
  backgrounds.forEach((el) => {
    el.checked.value = false;
  });
}

function changeBackground(b: bg) {
  settings.background = b;
  settings.background.url = new URL(b.url);
  const bgEl: any = document.getElementById("bg");
  bgEl.style.backgroundImage = `url(${b.url.href})`;
  
  localStorage.setItem("meteoSettings", JSON.stringify(settings))
}

changeBackground(settings.background ?? backgroundsArray[0]);

console.log(settings.background, backgroundsArray[0])


console.log(settings)

let lightMode = settings.lightMode ?? true;
const lightModeRef = ref(lightMode);
const openedMenu = ref(false);
let meteoCardOpacity = settings.opacity ?? 0.35;

bgColor.value = lightMode ? "light" : "dark";



const elements: Array<any> = [];

function switchLightMode() {
  lightMode = !lightMode;
  lightModeRef.value;
  updateValues();
}

let settingsMenu:any = {style: ""};


function updateValues() {

  settings.lightMode = lightMode;
  settings.opacity = meteoCardOpacity;

  localStorage.setItem("meteoSettings", JSON.stringify(settings))

  elements.forEach((el: any) => {
    el.style.backgroundColor = `rgba(${
      lightMode ? "255, 255, 255" : "30, 30, 30"
    },${meteoCardOpacity})`;

    el.style.color = lightMode ? "black" : "white";
  });
 
  settingsMenu.style.color = lightMode ? "black" : "white";
}

onMounted(() => {

  elements.push(
    document.querySelector(".averagesCard"),
    document.querySelector(".meteoCard")
  );

  
  settingsMenu = document.querySelector(".settingsMenu");
  updateValues();
});


//:style="openedMenu ? '' : 'transform: translateX(100%)'"
</script>



<script lang="ts"></script>

<template>
  <FontAwesomeIcon
    :icon="gear"
    id="settings-icon"
    @click="() => (openedMenu = true)"></FontAwesomeIcon>
  <div
    class="settingsMenu"
    :mode="bgColor"
    :style="openedMenu ? '' : 'transform: translateX(100%)'">
    <FontAwesomeIcon
      class="settingsMenu__close"
      :icon="faX"
      :color="lightModeRef ? 'black' : 'white'"
      @click="() => (openedMenu = false)"></FontAwesomeIcon>
    <div class="settingsMenu__theme">
      <div class="settingsMenu__theme__toggle">
        <div class="settingsMenu__theme__header">Theme</div>
        <FontAwesomeIcon
          :icon="lightModeRef ? faSun : faMoon"></FontAwesomeIcon>
        <Switches
          theme="bulma"
          color="blue"
          :value="lightModeRef"
          @click="
            () => {
              bgColor = bgColor == 'light' ? 'dark' : 'light';
              switchLightMode();
              $emit('changeSettings', {
                lightMode: bgColor == 'light' ? true : false,
              });
              log('lightMode: ', lightMode);
              lightModeRef = lightMode;
            }
          "></Switches>
      </div>
      <div class="settingsMenu__theme__sliders">
        <div class="settingsMenu__theme__sliders__header">Opacity</div>
        <div class="settingsMenu__theme__sliders__slider">
          <input
            :value="meteoCardOpacity * 100"
            type="range"
            v-on:input="(e:any) =>{ 
            //$emit('changeSettings', {averageOpacity: parseInt(e.target.value)})
            meteoCardOpacity = parseInt(e.target.value) / 100
            updateValues();
          }" />
        </div>
      </div>
    </div>
    <div class="settingsMenu__backgrounds">
      <div>
        <div class="settingsMenu__backgrounds__header">Background Images</div>
        <div class="settingsMenu__backgrounds__selection">
          <div
            class="settingsMenu__backgrounds__selection__item"
            v-for="background in backgrounds"
            @click="
              () => {
                changeBackground(background);
                uncheckAll();
                background.checked.value = true;
              }
            "
            :checked="background.checked.value">
            <img
              :src="background.url.href"
              class="settingsMenu__backgrounds__selection__item__image" />
            <div class="settingsMenu__backgrounds__selection__item__name">
              <input type="radio" :checked="background.checked.value" />
              {{ background.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#settings-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  height: 1.5rem;
  cursor: pointer;
}
.settingsMenu {
  overflow: hidden;
  overflow-y: auto;
  resize: horizontal;
  height: 100%;
  position: absolute;
  background-color: white;
  transition: background-color 0.5s ease;
  direction: rtl;
  min-width: 20%;
  top: 0;
  right: 0;
  z-index: 1;
  transition: 0.5s ease transform;

  &__close {
    position: absolute;
    left: 5%;
    top: 1rem;
    cursor: pointer;
  }

  &__theme {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 3rem !important;
  }

  &[mode="dark"] {
    background: rgb(51, 51, 51);

    color: white;
    & .settingsMenu__backgrounds, & .settingsMenu__theme {
      background-color: rgb(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);

      &__selection__item[checked="true"] {
        background-color: rgb(255, 255, 255, 0.05);
        outline: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

  }
  & > div {
    direction: ltr;
  }

  &__backgrounds, &__theme {
    margin-top: 1rem;
    width: 90%;
    margin-inline: auto;
    border-radius: 1rem;
    padding: 1rem;
    box-sizing: border-box;

    background-color: rgba(0, 0, 0, 0.01);
    outline: 1px solid rgba(0, 0, 0, 0.1);

    &__selection {
      margin-top: 1rem;
      
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      column-gap: 2rem;


      &__item {

        box-sizing: border-box;
        padding: 1rem;

        border-radius: 10px;

        cursor: pointer;

        width: max-content;

        &[checked="true"] {
          background-color: rgba(0, 0, 0, 0.05);
          outline: 1px solid rgba(0, 0, 0, 0.1);
        }

        &__image {
          display: block;
          height: 150px;
          width: 100%;
        }

        &__name {
          margin-top: 1rem;
        }
      }
    }
  }

  &__theme{


    &__toggle{
      & > svg{
        height: 20px;
        margin-right: 1rem;
      }
    }
  }
}
</style>


