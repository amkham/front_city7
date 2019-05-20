<template>
<div>
  <div class="container-fluid" id="mainTabs">
    <div class="row">
      <div class="col-md-8">
        <div id="diagramContent">
          <line-chart v-for="i in chartData" :chart-data="i.value" :chart-labels="i.date"/>
          <a v-if="loaded" v-for="j in chartData">{{j.value}}</a>
          <a>{{loaded}}</a>
      </div>
    </div>
    <div class="col-md-4">
      <div class="row">
        <h5>Фильтры</h5>
      </div>
      <div class="row">
        <h6>Выберите критерии для сравнения</h6>
      </div>
      <div class="container-fluid" id="criterionsContainer">
        <transition-group enter-active-class="animated slideInLeft" mode = "out-in">
          <div v-for="l in criterions" :key="l.id">
            <input type="checkbox" class="checkbox" :value ="l.id" :key ="l.id" v-model="filters.criter">{{l.name}}
          </div>
        </transition-group>
      </div>
      <div class="row">
        <h6>Выберите регион</h6>
      </div>
      <div  class="container-fluid" id="regionsContainer">
        <transition-group
          enter-active-class="animated slideInLeft"
          mode = "out-in">
          <div v-for="s in subjects" :key="s.id">
            <input type="checkbox" class="checkbox"
                   :value="s.id"
                   :key="s.id"
                   v-model="filters.subject"
                   @change="load_Locations"> {{s.name}}
          </div>
        </transition-group>
      </div>
      <div class="row">
        <h6>Укажите город</h6>
      </div>
      <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated fadeOut"
        mode = "out-in">
        <div class="container-fluid" id="localityContainer">
          <transition-group
            enter-active-class="animated slideInLeft"
            leave-active-class="animated fadeOutDown">
            <div v-for="loc in locations" :key="loc.id">
              <input type="checkbox" class="checkbox"
                     :key="loc.id"
                     :value = "loc.id"
                     v-model="filters.location">{{loc.location}}
            </div>
          </transition-group>
        </div>
      </transition>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <button type="button" class = "btn btn-secondary btn-purple btn-block" @click = "DiagramUpdate">Показать</button>
        </div>
        <div class="col-md-6">
          <button type="submit" class = "btn btn-default btn-block" @click = "">Отчет</button>
        </div>
      </div>
      <div class="row  justify-content-center">
        <form action="http://127.0.0.1:5000/get_report" method="post">
          <transition
            enter-active-class="animated slideInUp"
            leave-active-class="animated fadeOutDown"
            mode = "out-in">
            <button type="submit" class="btn btn-primary" v-if="report">Скачать отчет</button>
          </transition>
        </form>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import LineChart from './LineChart'
  export default {
    components: {
      LineChart
    },
    name: "app",
    data() {

      return {
        criterions: [],
        subjects: [],
        locations: [],
        filters: {
          "location": [],
          "criter": [],
          "subject": []
        },

        loaded: false,
        chartData:[], // Оу колличественное значение
       labels: [], // Ох даты


      }
    },

    created() {
      axios.get("api/criterions_get").then(r => {
        this.criterions = r.data
      }),
        axios.get("api/subjects_get").then(r => {
          this.subjects = r.data
        })
    },

    mounted() {
      this.load_Locations()

    },

    methods: {
      load_Locations() {
        axios.post('api/locations_get', this.filters.subject).then(r => {
          this.locations = r.data
        }).catch(e => {
          console.log(e)
        })
      },
      DiagramUpdate() {
        axios.post('api/diagram', this.filters.location).then(r => {
          this.chartData = r.data; this.loaded = true
        }).catch(e => {
          console.log(e)
        })


      }


    }
  }

</script>

<style>

  .small {
    max-width: 600px;
    margin:  10px auto;
  }
  #mainTabs{
    margin-top: 20px;
  }

  h5, h6{
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
    font-weight: bold;
  }
  #criterionsContainer,#regionsContainer,#localityContainer{
    height: 18vh;
    overflow-y: scroll;
  }
  #wantCity + label{
    margin-left: auto;
    margin-right: auto;
    font-weight: bold;
  }
  #wantCity{
    left: 20vh;
    margin-top: 3.5px;
  }
  /*****************************/
  .checkbox {
    position: relative;
    margin: 0 1rem 0 0;
    cursor: pointer;
  }

  .checkbox:before {
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    content: "";
    position: absolute;
    left: 0;
    z-index: 1;
    width: 1rem;
    height: 1rem;
    border: 2px solid purple;
  }

  .checkbox:checked:before {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    height: .5rem;
    border-color: purple;
    border-top-style: none;
    border-right-style: none;
  }

  .checkbox:after {
    content: "";
    position: absolute;
    top: -0.125rem;
    left: 0;
    width: 1.1rem;
    height: 1.1rem;
    background: #fff;
    cursor: pointer;
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
    width: 6px;
    background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: purple;
  }
</style>
