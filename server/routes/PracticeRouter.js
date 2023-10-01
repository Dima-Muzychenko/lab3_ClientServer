//об'єднує всі маршрути
const Router = require('express')
const router = new Router()
const practiceController = require('../controllers/practiceController')

router.get('/', practiceController.findAllPractices)
router.get('/:id', practiceController.findPractice)
router.post('/add/', practiceController.addPractice)
router.post('/:id', practiceController.deletePractice)


module.exports = router