import { createApp } from 'vue'
import App from './App.vue'

var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new AudioContext({
  latencyHint: 'interactive',
  sampleRate: 44100,
});

const app = createApp(App)
app.provide('audioContext', audioCtx)
app.mount('#app')