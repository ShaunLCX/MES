<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/production-tracking">Production Tracking</router-link></li>
        <li><router-link to="/quality-control">Quality Control</router-link></li>
      </ul>
    </nav>
    <!-- Router View to display components based on the route -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin-right: 10px;
}

nav a {
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>
