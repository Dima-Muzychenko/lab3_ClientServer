//чомусь не працює. Працюють тільки екзамени
const {Examination} = require("../DBModeles/models");


class ExamController{
    //Важливо!!!
    //req.body це в тіло потрібно параметри передавати,
    //req.query - це додаткові параметри запроса: ?id=12&pass==343 і так далі
    //а req.params це якщо ми наприклад в маршруті поставили '/:id/:pass', то
    //замість http://localhost:5000/api/examination у нас буде щось типу
    //http://localhost:5000/api/examination/12/Pdfsdd
    async addExamination(req, res){
        const {passport_id, mia_id, passed_category, is_passed} = req.body
        const query = await Examination.create({passport_id: passport_id,
                     mia_id: mia_id,
                     passed_category: passed_category,
                     is_passed: is_passed});
        return res.json(query)
    }

    async findExamination(req, res){
        const {id} = req.params
        const query = await Examination.findOne({
            where:{
                id:id
            },
        })
        return res.json(query)
    }

    async deleteExamination(req, res){
        const {id} = req.params
        const query = await Examination.destroy({
            where: {
                id: id
            },
        })
        return res.json(query)
    }

    async findAllExaminations(req, res) {
        const query = await Examination.findAll();
        return res.json(query)
    }

}

module.exports = new ExamController()