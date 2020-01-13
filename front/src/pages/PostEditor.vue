<template lang="pug">
	.container(v-if='post')
		.post
			.post__header
				.post__user
					.user
						a.user__avatar(href='#')
							img(:src='post.user.ava', alt='')
						a.user__name(href='#')
							| {{ post.user.name }} {{ post.user.surname }}
				.post__links
			.post__img
				img(:src='post.image', alt='Photo')
			.post__edit
				.post__edit-name Описание:
				.post__edit-textarea-wrapper
					textarea.post__edit-textarea(v-model="post.description")
			.post__edit
				.post__edit-name Хэштеги:
				.post__edit-textarea-wrapper
					textarea.post__edit-textarea(v-model="post.tags" @change="changeTags(post.tags)")
			.post__buttons
				button.btn.btn--save(@click="changePost()") Сохранить
				button.btn.btn--cancel(@click="$router.go(-1)") Отмена
</template>

<script>
export default {
	async created () {
		this.post = await this.$store.dispatch('content/getPostById', this.postId)
	},
	
	data () {
		return {
			post: null,
			
			
		}
	},

	computed: {
		postId () {
			return parseInt(this.$route.params.id)
		},
		
	},
	methods:{
		async changePost(){
           await this.$store.dispatch('content/changePost',this.post)
           this.$router.go(-1)
        },
        changeTags(tags){
			this.post.tags = tags.trim().replace(/,+/g,' ').replace(/#\s+/g,'#').replace(/#+/g,'').split(" ").filter(x=>x!=='')
			
		}
		
		
	}
}
</script>