//чомусь не працює. Працюють тільки екзамени
const {Test} = require("../DBModeles/models");

class TestController{
    async addTest(req, res){
        //можна й всі 3 параметри
        const {examination_id, is_passed, used_attempts} = req.body
        const query = await Test.create({examination_id: examination_id,
            is_passed: is_passed,
            used_attempts: used_attempts
        })
        return res.json(query)
    }



    async findTest(req, res){
        const {id} = req.params
        const query = await Test.findOne({
            where:{
                id:id
            },
        })
        return res.json(query)
    }



    async deleteTest(req, res){//не тестував, але повинно працювати
        const {id} = req.params
        const query = await Test.destroy({
            where: {
                id: id
            },
        })
        return res.json(query)
    }


    async findAllTests(req, res){
        const query = await Test.findAll();
        return res.json(query)
    }
}

module.exports = new TestController()