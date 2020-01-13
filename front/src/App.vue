<template lang="pug">
	#app
		app-header
		router-view
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
    components: {
        AppHeader
    }
}
</script>