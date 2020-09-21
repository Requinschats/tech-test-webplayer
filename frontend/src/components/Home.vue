<template>
    <div style="flex-direction: row">

    </div>
</template>

<script>
    import {fetchSwimlanes} from "../api/music";

    export default {
        name: "Home",
        mounted() {
            this.fetchCategories()
        },
        data() {
            return {
                categories: []
            }
        },
        methods: {
            fetchCategories() {
                fetchSwimlanes()
                    .then((response) => response.json())
                    .then(({swimlanes: categories}) => {
                        this.categories = categories.filter(category => category.type === 'CHANNEL');
                    })
                    .catch(e => console.log(e))
            }
        }
    }
</script>

<style scoped>

</style>
