<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Oscillator v-for="voice in voices" :key="voice.id"
    :frequency="voice.frequency" :waveform="voice.waveform"
    :ref="addOscillator"/>
  <br>
  <button @click="startAllOscillators">Start all</button>
</template>

<script>
import Oscillator from './components/Oscillator.vue'

export default {
  name: 'App',
  components: {
    Oscillator
  },
  data() {
    return {
      voices: [
        {frequency: 70, waveform: "sawtooth"},
        {frequency: 69, waveform: "sawtooth"},
        {frequency: 71, waveform: "sawtooth"},
        {frequency: 35, waveform: "sine"},
      ],
      oscillators: []
    }
  },
  beforeUpdate() {
    this.oscillators = [];
  },
  methods: {
    addOscillator(osc) {
      this.oscillators.push(osc);
    },
    startAllOscillators() {
      this.oscillators.forEach(osc => {
        osc.startTone();
      });
    }
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
