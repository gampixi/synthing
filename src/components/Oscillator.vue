<template>
    <h1>Hello, I am {{waveform}} {{currentNote}} oscillator.</h1>
    <button @click="attack('C3')">Start</button>
    <button @click="release">Stop</button>
</template>

<script>
import * as Tone from 'tone'

export default {
    name: 'Oscillator',
    props: {
        initialWaveform: String,
    },
    data() {
        return {
            waveform: this.initialWaveform,
            currentNote: ""
        }
    },
    mounted() {
        console.log(`Creating Tone.js synth`);
        this.synth = new Tone.MonoSynth({
            oscillator: {
                type: this.waveform
            },
            envelope: {
                attack: 0.03,
                decay: 0,
                sustain: 1.0,
                release: 0.03
            },
            filter: {
                type: "highpass",
            },
            filterEnvelope: {
                baseFrequency: 1000,
                octaves: -3,
                attack: 0.1,
                decay: 0,
                sustain: 1.0,
                release: 0.1
            },
        }).toDestination();
        this.synth.volume.value = -6;
    },
    watch: {
        waveform: function(val) {
            if(this.synth) {
                this.synth.oscillator.type = val;
            }
        }
    },
    methods: {
        attack(note) {
            if(this.synth) {
                this.synth.triggerAttack(note);
                this.currentNote = note;
            }
        },
        release() {
            if(this.synth) {
                this.synth.triggerRelease();
                this.currentNote = "";
            }
        },
    }
}
</script>