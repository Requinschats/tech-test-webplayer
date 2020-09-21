<template>
    <div style="display: flex; flex-direction: row; justify-content: center">
        <div style="display: flex; flex-direction: column; justify-content: center">
            <h1 v-if="channel">{{channel.label}}</h1>
            <audio controls>
                <source src="horse.ogg" type="audio/ogg">
                <source src="horse.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Player",
        data() {
            return {}
        },
        computed: {
          channel() {
              return this.$store.getters.channel
          }
        },
        methods: {
          fetchPlaylist () {

          }
        },
        mounted() {
            this.fetchPlaylist()
        }
    }
</script>

<style scoped>

</style>
