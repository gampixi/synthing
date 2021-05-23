<template>
    <h1>Hello, I am {{waveform}} {{frequency}}Hz oscillator.</h1>
    <button @click="startTone">Start</button>
    <button @click="stopTone">Stop</button>
</template>

<script>
import * as Tone from 'tone'

export default {
    name: 'Oscillator',
    data() {
        return {
            waveform: "sine",
            frequency: 440
        }
    },
    mounted() {
        console.log(`Creating Tone.js synth`);
        this.synth = new Tone.MonoSynth({
            oscillator: {
                type: this.waveform
            },
            envelope: {
                attack: 0.1
            }
        }).toDestination();
        this.synth.volume.value = -6;
    },
    methods: {
        startTone() {
            if(this.synth) {
                //this.synth.triggerAttackRelease("C4", "8n");
                this.synth.triggerAttack(this.frequency);
            }
        },
        stopTone() {
            if(this.synth) {
                this.synth.triggerRelease();
            }
        }
    }
}
</script>