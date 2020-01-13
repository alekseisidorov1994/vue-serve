const copy = x => JSON.parse(JSON.stringify(x))
const fGet = x => fetch(x, { method: 'GET' }).then(x => x.json())

export default {
    namespaced: true,

    state: {
        posts: []
    },

    mutations: {
        reinit (state) {
            state.posts = []
        },

        addPost (state, newPost) {
            for (const post of state.posts) {
                if (post.id === newPost.id) {
                    return Object.assign(post, newPost)
                }
            }

            state.posts = [
                ...state.posts,
                copy(newPost)
            ].sort((a, b) => b.id - a.id)
        }
    },

    actions: {
        async loadWall ({ commit }) {
            const postIds = await fGet('/api/wall')
            const posts = await Promise.all(postIds.map(x => fGet(`/api/post/${x}`)))
            
            commit('reinit')
            
            for (const post of posts) {
                commit('addPost', post)
               
            }
        },

        async loadPost ({ commit }, postId) {
            const post = await fGet(`/api/post/${postId}`)

            commit('addPost', post)

            return post
        },

        async getPostById ({ state, dispatch }, postId) {
            const hasStatePost = state.posts.map(x => x.id).includes(postId)

            if (!hasStatePost) {
                await dispatch('loadPost', postId)
            }

            return state.posts.find(x => x.id === postId)
        },

        async sendPost ({ rootState }, { file, description }) {
            if (!rootState.account || !rootState.account.isAuthenticated) {
                return false
            }

            const formData = new FormData
            formData.append('image', file)
            formData.append('description', description)

            const loader = await fetch('/api/post/create', {
                method: 'POST',
                body: formData
            }).then(x => x.json())

            return loader
        },

        async addComment ({ rootState }, data) {
            if (!rootState.account || !rootState.account.isAuthenticated) {
                return false
            }

            const formData = new FormData
            formData.append('postId', data.postId)
            formData.append('comment', data.comment)

            const sender = await fetch('/api/comment/create', {
                method: "POST",
                body: formData
            })

            console.log(sender)
        },


// done
        async changePost(context, post){
            const formData = new FormData
            formData.append('postId', post.id)
            formData.append('tags', post.tags)
            formData.append('description', post.description)
            await fetch('/api/post/change',{
                
                method:"POST",
                body: formData
            })

        },

// done
        async deletePost(context, postId){
            const formData = new FormData
            formData.append('postId',postId)
            await fetch('/api/post/delete', {
                method: "POST",
                body: formData
            })
            context.dispatch('loadWall')
            
            
        }
    }
}