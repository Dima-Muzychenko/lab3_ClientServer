const {Practice} = require("../DBModeles/models");

class PracticeController{
    async addPractice(req, res){
        //можна й всі 4 параметри
        const {examination_id, is_passed, used_attempts, left_attempts}=req.body
        const query = await Practice.create({examination_id: examination_id,
            is_passed: is_passed,
            used_attempts: used_attempts,
            left_attempts: left_attempts
        });
        return res.json(query)
    }


    async findPractice(req, res){
        const {id} = req.params
        const query = await Practice.findOne({
            where:{
                id:id
            },
        })
        return res.json(query)
    }


    async deletePractice(req, res){//не тестував, але повинно працювати
        const {id} = req.params
        const query = await Practice.destroy({
            where: {
                id: id
            },
        })
        return res.json(query)
    }


    async findAllPractices(req, res) {
        const query = await Practice.findAll();
        return res.json(query)
    }
}

module.exports = new PracticeController()