import multer from '@koa/multer'
import path from 'path'

const imageUpload = multer({ dest: path.join(__dirname, '/static/images/') })

export {
    imageUpload
}

export default imageUpload