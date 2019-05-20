<template>
    <div>
  <div id="top">
    <h3 v v-for="i in Page">{{i.title}}</h3>
  </div>
    <div id= "left">

    <input id="image" type="image" src="/src/static/icons/vlg.png">


    <div class="locations_atribute">

      <h6>Год основания: </h6>
     <h6> Население: </h6>
      <h6>Площадь: </h6>
      <h6>Сайт админстрации: </h6>
         </div>
    </div>
  <div id="middle">
    <a v-for="i in Page">{{i.text}}</a>
    <div>
   <input type="text" v-model="locations_name" placeholder="Искать здесь...">
<input type="button" @click="location_search" value="Найти"></div>
  </div>
      </div>

</template>

<script>
  import axios from 'axios'
    export default {

    data(){
      return{
        name: "Home",
        locations_name:[],
        Page:[],
        CheckLoadStatus: false,
      }},


      methods: {
          location_search(){
            axios.post('api/pageSearche',this.locations_name).then(r => {this.Page = r.data; this.CheckLoadStatus = true})
          },


      }
    }
</script>

<style>
  #image{
    min-width: 200px;
    min-height: 300px;
  }
#top {
	margin: 20px 20px 0px 20px;
	padding: 10px;


	}
html>body #top {
	height: 70px; /* ie5win fudge ends */
	}
#left {
	position: absolute;
  width: auto;
  min-width: auto;
	top: 120px;
	left: 0px;
	margin: 20px;
	padding: 10px;
	}
html>body #left {
	width: 120px; /* ie5win fudge ends */
	}
#middle {
	margin: 20px 190px 500px 400px;
	padding: 10px;
  max-width: 800px;

	}
#right {
	position: absolute;
	top: 120px;
	right: 0px; /* Opera5.02 will show a space
	at right when there is no scroll bar */
	margin: 20px;
	padding: 10px;

	}
html>body #right {
	width: 120px; /* ie5win fudge ends */
	}

</style>
