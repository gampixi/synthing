<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-if="toneReady == false">
    <button @click="startTone">Start!</button>
  </div>
  <div v-else>
    <Oscillator v-for="voice in voices" :key="voice.id"
        :ref="addOscillator"/>
    <br>
    <button @click="startAllOscillators">Start all</button>
  </div>
</template>

<script>
import Oscillator from './components/Oscillator.vue'
import * as Tone from 'tone'

export default {
  name: 'App',
  components: {
    Oscillator
  },
  data() {
    return {
      toneReady: false,
      voices: [
        {frequency: 70, waveform: "sawtooth"}
      ],
      oscillators: []
    }
  },
  beforeUpdate() {
    this.oscillators = [];
  },
  methods: {
    startTone() {
      Tone.start().then(() => {
        console.log("Tone.js ready");
        this.toneReady = true;
      })
    },
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
