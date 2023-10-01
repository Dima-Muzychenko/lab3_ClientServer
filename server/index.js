//головний файл
//Початкові дії
//cd server
//npm init -y
//npm install express (вiдповiдає за ство-рення серверної частини нашого застосунка)
//npm install sequelize (ORM)
//npm install pg pg-hstore
const express = require("express");
const PORT = 5000;
const app = express();
const sequelize = require('./db')
const models = require('./DBModeles/models')
const cors = require('cors')
const router = require('./routes/index')//кореневий роутер, що зв'язує решту роутерів
//const res = require("express/lib/response");


app.use(cors())
app.use(express.json())
app.use('/api',router)


app.get('/', (req,res)=>{//get запит
    res.status(200).json({message: 'Working!'})
})
const start = async () =>{
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    await sequelize.sync()
    app.listen(PORT,()=>console.log(`Server started on port ${PORT} `));//прикол в кавичках. Якщо вони такі, то ${PORT} читається не як текст
}
start()

