import KoaRouter from 'koa-router'
import database from '../database'
import { imageUpload } from '../upload'
import { exec } from 'child_process'
import path from 'path'
import multer from '@koa/multer'

const router = new KoaRouter

router.get('/:postId', async (ctx, next) => {
    const users = database.get('users')
    const posts = database.get('posts')
    const comments = database.get('comments')
  
    const postId = parseInt(ctx.params.postId)
    const post = posts.find(x => x.id === postId)

    const { login, password, ...author } = users.find(x => x.id === post.authorId)
    post.user = author
    
    const ownComments = comments.filter(x => x.postId === post.id)
    ownComments.forEach(x => {
        const { login, password, ...author } = users.find(y => y.id === x.authorId)
        x.user = author
    })
    post.comments = ownComments

    ctx.body = post
})

router.post('/create', imageUpload.single('image'), async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        return ctx.body = {
            error: 'Не авторизованы'
        }
    }

    const mimeType = path.extname(ctx.file.originalname)
    await exec(`mv ${ctx.file.path} ${ctx.file.destination}${ctx.file.filename}${mimeType}`)
// MOVE
    const data = database.download()
    const post = {
        id: data.postIdCounter,
        authorId: ctx.state.user.id,
        tags: [],
        description: ctx.request.body.description,
        image: `/images/${ctx.file.filename}${mimeType}`
    }

    data.posts.push(post)
    data.postIdCounter++
    database.upload(data)

    ctx.body = { post }
})

router.post('/delete',multer().none(), async (ctx, next) => {
    
    const postId = parseInt(ctx.request.body.postId)
    const data = database.download()
    
    data.posts  = data.posts.filter(x=>x.id !== postId)
    if(data.comments.length){
        data.comments = data.comments.filter(x=> x.postId !== postId)
    }
    database.upload(data)

    ctx.body = ctx.request.body
   

})




router.post('/change',multer().none(), async (ctx, next) => {
    
    const postId = parseInt(ctx.request.body.postId)
    const tags = ctx.request.body.tags.split(',')
    const description = ctx.request.body.description
    const data = database.download()
    await data.posts.map(x=>{
       if(x.id === postId){
           x.description = description
           x.tags = tags
       }
    }) 

    database.upload(data)

    ctx.body = data.posts 
    

})
export default router