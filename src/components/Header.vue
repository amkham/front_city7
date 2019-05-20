<template>
  <div>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark elegant-color-dark">
      <!-- Navbar brand -->
      <a class="navbar-brand" href="#">CityStats</a>
      <!-- Collapse button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="basicExampleNav">
        <!-- Links -->
        <ul class="navbar-nav mr-auto">
          <ul class="nav md-pills pills-secondary">
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab"><router-link to="/home" tag = "li">Главная</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab"><router-link to="/diagrams" tag = "li">Диаграммы</router-link></a>
            </li>
          </ul>
        </ul>

        <!-- Links -->

        <form class="form-inline" style="margin-top: auto; margin-bottom: auto">
          <div class="md-form mt-0">
            <input class="form-control mr-sm-2" href="/" type="text" placeholder="Поиск" aria-label="Search">
          </div>
        </form>
      </div>
      <!-- Collapsible content -->
    </nav>
    <transition enter-class="animated slideInLeft">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Home from './Home'
  export default {

    appSearch: Home
  }
</script>

<style scoped>
div {
  height: 50px;
}
</style>
