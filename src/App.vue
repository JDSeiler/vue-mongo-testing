<template>
  <div id="app">
    <h1>{{ heading }}</h1>
    <math-facts/>
  </div>
</template>

<script>
import MathFacts from './components/MathFacts.vue'

export default {
  name: 'App',
  components: {
    MathFacts 
  },
  data: function () {
    return {
      heading: "Hello Vue!",
    };
  },
  methods: {
  }
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
