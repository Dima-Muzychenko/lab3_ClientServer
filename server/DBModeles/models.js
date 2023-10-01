//моделі БД
const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const Examination = sequelize.define('examinations', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    passport_id: {type: DataTypes.STRING, allowNull: false},
    mia_id: {type: DataTypes.STRING, allowNull: false},
    passed_category: {type: DataTypes.STRING, allowNull: false},
    is_passed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
});

// // будуємо таблиці БД, якщо такої нема
// let examination1 = Examination.build();
// Examination.sync().then(r => console.log(r)).catch(err => console.error(err)); // Without this we will have problems
// examination1.save().catch(error => {// mhhh,  wth!
// })


const Practice = sequelize.define('practices', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    examination_id: {type: DataTypes.INTEGER, allowNull: false, unique: true, onDelete: "CASCADE"}, //ставимо onDelete: "CASCADE", бо це pk, а воно тут як-то кончено работає
    is_passed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    used_attempts: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    left_attempts: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 3}
})
// //створення таблиць БД
// let practice1 = Practice.build();
// //alter - зміна створениї таблиці, force - руйнування старої та створення нової
// Practice.sync({alter:true}).then(r => console.log(r)).catch(err => console.error(err)); //{force:true}
// // Practice.sync().then(r => console.log(r)).catch(err => console.error(err)); // Without this we will have problems
// practice1.save().catch(error => {
// })

const Test = sequelize.define('tests', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    examination_id: {type: DataTypes.INTEGER, allowNull: false, unique: true, onDelete: "CASCADE"},
    is_passed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    used_attempts: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})

// let test1 = Test.build();
// Test.sync({alter:true}).then(r => console.log(r)).catch(err => console.error(err)); // Without this we will have problems
// test1.save().catch(error => {// mhhh,  wth!
// })

//Налаштовуємо зв'язки між таблицями
Examination.hasOne(Practice, {onDelete: "CASCADE"});
Practice.belongsTo(Examination, {
        foreignKey:{type: DataTypes.INTEGER,
            name: "examination_id"
        }
    })
Examination.hasOne(Test, {onDelete: "CASCADE"});
Test.belongsTo(Examination, {
    foreignKey:{type: DataTypes.INTEGER,
        name: "examination_id",
    }
})

module.exports = {Examination, Test, Practice}