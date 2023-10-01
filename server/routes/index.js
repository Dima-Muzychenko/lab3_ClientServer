//кореневий роутер, що зв'язує решту роутерів
const Router = require('express')
const router = new Router()
const examinationRouter = require('./ExaminationRouter')
const practiceRouter = require('./PracticeRouter')
const testRouter = require('./TestRouter')
//так як Postman та інші є підроутерами, ми повинні це вказати
router.use('/examination', examinationRouter)//відповідний URL відповідає за відповідний маршрут
router.use('/practice', practiceRouter)
router.use('/test', testRouter)


module.exports = router

