<template>
  <div class="content-container">
    <div class="box">
      <input v-model="limitPost" type="number" class="number number-input">
    </div>
    <div v-for="info in news.splice(0, limitPost)" :key="info.id">
      <a :href="info.url"><div class="box">
        <h1 class="title">{{ info.title }} - {{ info.id }}</h1>
        <p class="subtitle">{{ info.newsSite }}, {{ info.publishedAt }}</p>
        <img :src="info.imageUrl">
      </div></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
let limitPost = ref(8);

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
    console.log(response.data.splice(0, 8))
  })
}
</script>

<style scoped>
.content-container{
  width: 50%;
}
.number-input{
  width: 30%;
}

.box{
  margin-bottom: 25pt;
}

</style>