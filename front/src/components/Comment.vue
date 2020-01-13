<template lang="pug">
	.post-comment
		a.post-comment__avatar(href='#')
			img(:src='data.user.ava', alt='')
		.post-comment__text
			a.post-comment__name(href='#') {{ data.user.name }} {{ data.user.surname }}
			|  {{ data.content }}

</template>

<script>
export default {
	props: ['data']
}
</script>