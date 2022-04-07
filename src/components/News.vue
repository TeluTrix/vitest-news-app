<template>
  <div class="content-container">
    <div class="box">
      <input v-model="limitPost" type="text" class="input number-input">
      <button class="button" @click="limitPost--">-</button>
      <button class="button" @click="limitPost++">+</button>
      <input v-model="searchValue" class="input" type="text" placeholder="Search" id="search">
      <button class="button is-dark is-pulled-right" @click="applySearchFilters">Apply</button>
      <button class="button is-light is-pulled-right" @click="clearSearchFilters">Clear</button>

      <div :class="dropdown" id="dropdown" @click="dropDownListener">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu5">
            <span>{{ dropDownMsg }}</span>
            <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu5" role="menu">
          <div class="dropdown-content">
            <div v-for="publisher in publishers">
              <a class="dropdown-item" @click="figureClicked(publisher.name)">
                {{ publisher.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="info in news" :key="info.id">
      <a :href="info.url"><div class="box">
        <h1 class="title">{{ info.title }}</h1>
        <p class="subtitle">{{ info.newsSite }}, {{ info.publishedAt }}</p>
        <img :src="filterImg(info.imageUrl)">
      </div></a>
    </div>
    <div v-if="nothingFound === true">
      <div class="box nothing-found">
        <p>Your Search returned no result</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {computed, onBeforeMount, onBeforeUpdate, onMounted, reactive, ref, WritableComputedRef} from "vue";
import {publisher} from "./publisher";

let counter = ref(0);
let limitPost = ref(10);
let dropDownMsg = ref("Filter Publisher");
let dropdown = ref("dropdown");
//let publishers: typeof publisher[];
let publishers = publisher;
let lastClicked = "";
let nothingFound = false;
let searchValue = ref("");


type News = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  summary: string;
  newsSite: string;
  featured: boolean;
  publishedAt: string;
};


let news: News[] = reactive([] as News[]);

onBeforeMount(getNews);

function getNews(){
  axios.get(("https://api.spaceflightnewsapi.net/v3/articles?_limit=" + 100)).then((response) => {
    news.push(...response.data);
  })
}
function dropDownListener(){
  if(dropdown.value.includes("is-active")){
      dropdown.value = "dropdown";
    }
  else if(!dropdown.value.includes("is-active")){
      dropdown.value = "dropdown is-active";
    }
};
function filterImg(imgUrl: string){
  if(imgUrl.includes("png") || imgUrl.includes("jpeg") || imgUrl.includes("jpg") || imgUrl.includes("svg") || imgUrl.includes("gif")){
    return imgUrl;
  }else{
    return "https://via.placeholder.com/750";
  }
}

function figureClicked(origin: string){
  dropDownMsg.value = origin;
  lastClicked = origin;
}

function applySearchFilters(){
  let newsNew = [];
  if(lastClicked !== ""){
    for(let i = 0; i < news.length; i++){
      if(news[i].newsSite === lastClicked){
        newsNew.push(news[i]);
      }
    }
    news.splice(0)
    Object.assign(news, newsNew);
  }
  else{
    nothingFound = true;
  }
}
function clearSearchFilters(){
  dropDownMsg.value = "Filter Publisher";
  limitPost.value = 10;
  searchValue.value = "";
}
</script>

<style scoped>
.content-container{
  width: 60%;
}
.number-input{
  width: 8%;
}

.box{
  margin-bottom: 25pt;
}
.button{
  margin-left: 5pt;
}
img{
  width: 100%;
}
#search{
  width: 50%;
  margin-left: 10pt;
}
.nothing-found{
  color: darkred;
  width: 35%;
}
</style>