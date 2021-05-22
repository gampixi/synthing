<template>
    <h1>Hello, I am {{waveform}} {{frequency}}Hz oscillator.</h1>
    <button @click="startTone">Start</button>
    <button @click="stopTone">Stop</button>
</template>

<script>
export default {
    name: 'Oscillator',
    inject: ['audioContext'],
    props: {
        waveform: {
            type: String,
            required: true
        },
        frequency: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            oscillator: null,
        }
    },
    created() {
        console.log(`Creating oscillator node from context: ${this.audioContext}`);
    },
    methods: {
        startTone() {
            if(!this.oscillator) {
                this.audioContext.resume().then(() => {
                    this.oscillator = this.audioContext.createOscillator();
                    this.oscillator.connect(this.audioContext.destination);
                    this.oscillator.type = this.waveform;
                    this.oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);
                    this.oscillator.start();
                })
            }
        },
        stopTone() {
            if(this.oscillator) {
                this.oscillator.stop();
                this.oscillator.disconnect();
                this.oscillator = null;
            }
        }
    }
}
</script>