<template>
    <div style="flex-direction: column; display: flex">
        <div style="flex-direction: row; justify-content: center" v-for="category in categories" :key="category.id">
            <div style="flex-direction: column; text-align: center; width: 100%">
                <h1>
                    {{category.description}}
                </h1>
                <div v-if="category.channels" class="channelsContainer">
                    <div v-for="(channel, index) in category.channels" :key="channel.id"
                         style="width: fit-content;display:flex; justify-content: center;">
                        <div class="card" v-if="index <6"
                             @click="handlePlayerNavigation(channel)"
                             @mouseover="activeChannelId = channel.id"
                             @mouseleave="activeChannelId = null">
                            <div style="display: flex; flex-direction: row; justify-content: center">
                                <h3>
                                    {{channel.label}}
                                    <i class="fab fa-medium" v-show="isActiveChannel(channel.id)"></i>
                                </h3>
                            </div>
                            <img :src="formatImageUrl(channel.cover)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchChannels, fetchSwimlanes} from "../api/music";

    export default {
        name: "Home",
        async mounted() {
            await this.fetchCategories();
            this.fetchChannels(this.categories)
        },
        data() {
            return {
                categories: [],
                activeChannelId: null
            }
        },
        methods: {
            fetchCategories() {
                return fetchSwimlanes()
                    .then((response) => response.json())
                    .then(({swimlanes: categories}) => {
                        this.categories = categories.filter(category => category.type === 'CHANNEL');
                    })
                    .catch(e => console.log(e))
            },
            async fetchChannels(categories) {
                //If categories are known in advance let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()])
                let categoriesWithChannels = JSON.parse(JSON.stringify(this.categories))
                for (const category of categories) {
                    const categoryChannels = (await fetchChannels(category.id)).items;
                    categoriesWithChannels = categoriesWithChannels.map(category => {
                        return {...category, channels: categoryChannels};
                    })
                }
                this.categories = categoriesWithChannels
            },
            formatImageUrl(imageUrl) {
                return imageUrl.replace('%W', '300').replace('%H', '300')
            },
            isActiveChannel(channelId) {
                return channelId === this.activeChannelId
            },
            handlePlayerNavigation(channel) {
                this.$store.dispatch('setChannel', channel).then(() => {
                    this.$router.push({path: 'player', query: {channel: channel.id}})
                })
            }
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

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.5);
    }

    .channelsContainer {
        flex-direction: row;
        width: 100%;
        justify-content: center;
        display: flex;
        flex-wrap: wrap
    }

</style>
