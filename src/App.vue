<template>
  <div id="app">
    <h1>{{ heading }}</h1>
    <!-- Adding a component to the DOM -->
    <math-facts/>
  </div>
</template>

<script>
import MathFacts from './components/MathFacts.vue'

export default {
  name: 'App',
  components: {
    // Components must be registered
    MathFacts 
  },
  data: function () {
    return {
      heading: "Hello Vue!",
    };
  },
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
</style>
