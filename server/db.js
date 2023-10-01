//конектимся до БД
const {Sequelize} = require("sequelize");
//const res = require("express/lib/response");
module.exports =  new  Sequelize('postgres://postgres:12345@localhost:5432/driver_examination');