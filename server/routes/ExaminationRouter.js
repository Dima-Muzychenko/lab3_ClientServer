//об'єднує всі маршрути
const Router = require('express')
const router = new Router()
const examController = require('../controllers/examController')
//для тестування використовував postman
router.get('/', examController.findAllExaminations)//відповідний URL відповідає за виклик відповідної функції
//якщо багато параметрів, то буде виглядити так: '/:id/:pass/:exam'
router.get('/:id', examController.findExamination)
router.post('/add/', examController.addExamination)
router.post('/:id', examController.deleteExamination)
// router.get('/auth', (req, res)=>{//http://localhost:5000/api/examination/auth
//     res.json({message: 'Hello'})
// })

module.exports = router