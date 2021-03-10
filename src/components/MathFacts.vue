<template>
  <!-- The template is the markup portion of the Vue component! -->
  <div class="number-fact">
    <h1>The Number-Fact 5000</h1>
    <!-- v-on is for event handling -->
    <form v-on:submit.prevent="handleSubmit">
      <!-- v-model is for data binding -->
      <input v-model="query" type="text" placeholder="Enter a number!">
      <input type="submit">
    </form>
    <!-- v-if, v-else, and v-if-else are for conditional rendering -->
    <p v-if="isErr">There was a problem!</p>
    <p v-else>{{this.currentFact}}</p>
    <!--
    The name after the colon is a parameter, it's the property to bind.
    The thing in quotes is an expression which dictates if the bind should occur
     -->
    <button v-bind:disabled="factInvalid" v-on:click="saveFact">Save Current Fact</button>
    <button v-on:click="deleteFacts">Delete All Facts</button>
    <ul>
      <!-- v-for is for list rendering. Needs a unique key for fancy DOM update reasons (like React) -->
      <li v-for="fact of savedFacts" :key="fact.id">
        {{ fact.text }}
      </li>
    </ul>
  </div>
</template>

<script>
// The script is the JS portion
export default {
  name: 'MathFacts',
  // data must be a function when in a component like this (as opposed to a new instance of Vue)
  data: function (){
    return {
      query: null,
      currentFact: '',
      isErr: false,
      // Ideally this would be a computed property, but it's asynchronous so that's a no go without a plugin
      savedFacts: []
    };
  },
  // These are what they say on the tin.
  methods: {
    handleSubmit: async function () {
      this.currentFact = '';
      this.currentFact = await (await fetch(`http://numbersapi.com/${this.query}/?default=Number+not+found`)).text()
    },
    saveFact: async function () {
      await fetch(`http://localhost:3000/save?fact=${encodeURIComponent(this.currentFact)}`, {method: 'POST'});
      this.savedFacts = await this.fetchFacts();
    },
    fetchFacts: async function () {
      const storedFacts = await (await fetch('http://localhost:3000/facts')).json();
      return storedFacts.facts;
    },
    deleteFacts: async function () {
      await fetch('http://localhost:3000/facts', {method: 'DELETE'});
      this.savedFacts = await this.fetchFacts();
    }
  },

  // Computed fields are like methods, but they can do fancy caching things
  computed: {
    factInvalid: function () {
      return (this.currentFact === 'Number not found')
    },
  },
  // This is an example of a lifecycle hook. This one fetches all the saved facts on startup.
  mounted: async function() {
    this.savedFacts = await this.fetchFacts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* This is CSS, what can I say */
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5 10px;
}
a {
  color: #42b983;
}
</style>
