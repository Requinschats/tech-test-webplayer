<template>
    <div style="display: flex; flex-direction: row; justify-content: center">
        <div style="display: flex; flex-direction: column; justify-content: center; width: 100%" v-if="activeSong">
            <div style="display: flex; flex-direction: row; width: 100%">
                <button class="button" @click="$router.go(-1)">
                    <i class="fa fa-arrow-left"></i>
                    Back to Categories
                </button>
            </div>
            <div style="display: flex; flex-direction: row; width: 100%; justify-content: center">
                <h1 v-if="channel">{{channel.label}}</h1>
            </div>
            <div style="display: flex; flex-direction: row; width: 100%; justify-content: center">
                <div class="card">
                    <h3>{{activeSong.title}}</h3>
                    <p>{{activeSong.artists[0].name}}</p>
                    <img :src="formatImageUrl(activeSong.album.cover)">
                </div>
            </div>
            <div style="display: flex; flex-direction: row; width: 100%; justify-content: center">
                <audio controls autoplay style="margin-top: 50px" v-if="activeSongUrl"
                       @ended="handleSongEnd()"
                      @timeupdate="updateSongTime"
                       id="audioController">
                    <source :src="activeSongUrl" type="audio/mp4">
                </audio>
                <h5 v-else>
                    Loading next song...
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchPlaylist, fetchTrack} from "../api/music";

    const getTrackUrlfromErrorResponse = (error) => {
        const START_TOKEN = 'body at ';
        const END_TOKEN = ' reason';
        return error.substring(error.indexOf(START_TOKEN) + START_TOKEN.length, error.indexOf(END_TOKEN))
    };

    export default {
        name: "Player",
        data() {
            return {
                tracks: [],
                activeSong: null,
                activeSongUrl: null,
                songTime: null,
                songBufferUrl: null
            }
        },
        watch: {
            songTime(time) {
                const isPassedTimeBuffer = time.timeStamp/400 > 30
                if(isPassedTimeBuffer && this.songBufferUrl === this.activeSongUrl) {
                    fetchTrack(this.tracks[0].song_url)
                        .then(response => this.songBufferUrl = getTrackUrlfromErrorResponse(response.error))
                }
            }
        },
        computed: {
            channel() {
                return this.$store.getters.channel ? this.$store.getters.channel : this.$route.query.channel
            }
        },
        methods: {
            fetchPlaylist(channelId) {
                fetchPlaylist(channelId).then(({tracks}) => {
                    this.tracks = tracks;
                    this.activeSong = tracks[0]
                    this.fetchTrack(this.activeSong)
                    .then(() => this.songBufferUrl = this.activeSongUrl)
                })
            },
            updateSongTime (newTime) {
              this.songTime = newTime
            },
            formatImageUrl(imageUrl) {
                return imageUrl.replace('%W', '300').replace('%H', '300')
            },
            fetchTrack(activeSong) {
                return fetchTrack(activeSong.song_url)
                    .then(response => this.activeSongUrl = getTrackUrlfromErrorResponse(response.error))
            },
            handleSongEnd() {
                this.tracks.shift();
                this.activeSong = this.tracks[0];
                if(this.songBufferUrl && this.songBufferUrl !== this.activeSongUrl) {
                    this.activeSongUrl = this.songBufferUrl
                } else {
                    this.activeSongUrl = null;
                    this.fetchTrack(this.activeSong)
                }
            }
        },
        mounted() {
            this.fetchPlaylist(this.channel.id)
        }
    }
</script>

<style scoped>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: fit-content;
        margin-left: 20px;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    #audioController {
        width: 400px;
    }

    .button {
        background-color: blue; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
    }

    .button:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
</style>
