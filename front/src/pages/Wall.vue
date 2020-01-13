<template lang="pug">
    .container
        post(
            v-for="post of posts"
            :postData="post"
            v-bind:key="post.id"
        )
</template>

<script>
import Post from '@/components/Post'

export default {
    components: {
        Post
    },

    created () {
        this.$store.dispatch('content/loadWall')
    },

    computed: {
        posts () {
            return this.$store.state.content.posts
        }
    }
}
</script>