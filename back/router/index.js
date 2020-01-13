import KoaRouter from 'koa-router'

import account from './account'
import comment from './comment'
import post from './post'
import wall from './wall'

const router = new KoaRouter

router.use('/api/account', account.routes(), account.allowedMethods())
router.use('/api/comment', comment.routes(), comment.allowedMethods())
router.use('/api/post', post.routes(), post.allowedMethods())
router.use('/api/wall', wall.routes(), wall.allowedMethods())

export default router