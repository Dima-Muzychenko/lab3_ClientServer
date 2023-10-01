//об'єднує всі маршрути
const Router = require('express')
const router = new Router()
const testController = require('../controllers/testController')

router.get('/', testController.findAllTests)
router.get('/:id', testController.findTest)
router.post('/add/', testController.addTest)
router.post('/:id', testController.deleteTest)


module.exports = router