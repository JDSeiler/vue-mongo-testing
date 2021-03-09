<template>
  <div class="shortner">
    <h1>The Number-Fact 5000</h1>
    <form v-on:submit.prevent="handleSubmit">
      <input v-model="query" type="text" placeholder="Enter a number!">
      <input type="submit">
    </form>
    <p v-if="isErr">There was a problem!</p>
    <p v-else>{{this.currentFact}}</p>
    <button v-bind:disabled="factInvalid" v-on:click="saveFact">Save Current Fact</button>
    <ul>
      <li v-for="fact of savedFacts" :key="fact.id">
        {{ fact.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MathFacts',
  data: function (){
    return {
      query: null,
      currentFact: '',
      isErr: false,
      savedFacts: []
    };
  },
  methods: {
    handleSubmit: function () {
      this.currentFact = '';
      fetch(`http://numbersapi.com/${this.query}/?default=Number+not+found`)
        .then(res => res.text())
        .then(body => {
          this.currentFact = body;
        });
    },
    saveFact: function () {
      if (this.factInvalid) {
        null;
      } else {
        this.savedFacts.push({ id: this.savedFacts.length, text: this.currentFact });
      }
    }
  },
  computed: {
    factInvalid: function () {
      return (this.currentFact === 'Number not found')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
