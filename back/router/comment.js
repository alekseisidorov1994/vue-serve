import KoaRouter from 'koa-router'
import database from '../database'
import multer from '@koa/multer'

const router = new KoaRouter

router.post('/create', multer().none(), async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            error: 'Не авторизован'
        }
    }

    const data = database.download()
    const comment = {
        id: data.commentIdCounter,
        authorId: ctx.state.user.id,
        postId: parseInt(ctx.request.body.postId),
        content: ctx.request.body.comment
    }

    data.comments.push(comment)
    data.commentIdCounter++
    database.upload(data)
    console.log(ctx.request.body);
    // ctx.body = { comment }
    ctx.body = ctx.request.body
})

export default router