<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-if="toneReady == false">
    <button @click="startTone">Start!</button>
  </div>
  <div v-else>
    <Oscillator v-for="voice in voices" :key="voice.id" :initialWaveform="voice.waveform"
        :ref="addOscillator"/>
    <br>
    <button v-for="note in notes" :key="note.id"
      @mousedown="startAllOscillators(note.toFrequency())"
      @mouseup="stopAllOscillators()">
      {{note.toNote()}}
    </button>
    <Sequencer @stop-note="stopAllOscillators()" @play-note="startAllOscillators($event.frequency)"/>
  </div>
</template>

<script>
import Oscillator from './components/Oscillator.vue'
import Sequencer from './components/Sequencer.vue'
import * as Tone from 'tone'

export default {
  name: 'App',
  components: {
    Oscillator,
    Sequencer
  },
  data() {
    let harmonizations = Array.from({length:25},(v,k)=>k);

    return {
      toneReady: false,
      voices: [
        {waveform: "sawtooth"},
        {waveform: "sine"},
      ],
      oscillators: [],
      notes: Tone.Frequency("C2").harmonize(harmonizations)
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
    startAllOscillators(note) {
      this.oscillators.forEach(osc => {
        osc.attack(note);
      });
    },
    stopAllOscillators() {
      this.oscillators.forEach(osc => {
        osc.release();
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
