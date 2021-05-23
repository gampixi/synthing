<template>
    <h1>Hello, I am sequencer [{{activeStep}}].</h1>
    <button v-for="(step, index) in sixteenths" :key="index" @click="cycleStep(index)">{{step}}</button>
</template>

<script>
import * as Tone from 'tone'

export default {
    name: 'Sequencer',
    data() {
        let defaults = Array.from({length:16},()=>0);
        return {
            sixteenths: defaults,
            activeStep: 0
        }
    },
    emits: ['playNote', 'stopNote'],
    mounted() {
        Tone.Transport.loopStart = "0:0:0"
        Tone.Transport.loopEnd = "0:4:0"
        Tone.Transport.loop = true;
        Tone.Transport.bpm.value = 170;
        this.sixteenths.forEach((x,i) => {
            let position = `0:${Math.floor(i/4)}:${i%4}`;
            // console.log(`Scheduling to ${position}`)
            Tone.Transport.schedule(() => {
                // console.log(`${time}`)
                if(this.sixteenths[i] == 0) {
                    this.$emit('stopNote');
                } else {
                    let frequency = this.sixteenths[i] * 100
                    this.$emit('playNote', {frequency});
                }
                this.activeStep = i;
            }, position);
        });
        Tone.Transport.start();
    },
    watch: {
        /*sixteenths: function(val) {
            console.log(val);
        }*/
    },
    methods: {
        cycleStep(step) {
            let current_step = this.sixteenths[step];
            this.sixteenths[step] = (current_step += 1) % 3;
        },
    }
}
</script>