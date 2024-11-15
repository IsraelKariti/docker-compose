import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Get the file URL of the current module 
import mongoose from "mongoose";
import redis from 'redis';
import mysql from 'mysql2/promise';
import fs from 'fs';
//=======================MYSQL========================       
// (async ()=>{
//     const connection = await mysql.createConnection({
//         host: 'mysql',
//         user: 'root',
//         password: 'my-pw',
//         database: 'mydb'   
//     }); 
//     console.log('successfully connected to mysql');
//     const createTableQuery = `CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) `;
//     const insertUserQuery = "INSERT INTO users (name, email) VALUES ('udik', 'udi8@gmail.com')";
//     const selectUserQuery = "SELECT * FROM users";
//     try { 
//         await connection.execute(createTableQuery); 
//         console.log('Table "users" created or already exists.'); 
//         await connection.execute(insertUserQuery);
//         const [rows, fields] = await connection.execute(selectUserQuery);
//         console.log('rows: ', rows);
//         console.log('fields:', fields);
//     } 
//     catch (err) { 
//         console.error('Error:', err); 
//     } 
//     finally { 
//         await connection.end();  
//     } 

// })();
//====================================================       

    
//===========================REDIS=========================
const redisClient = redis.createClient({
    // host: 'redis-server',
    // port: 6379
    url: 'redis://redis-server:6379'
}); 

redisClient.on('connect', ()=>{console.log('rediss iss connecteddd!!')});
redisClient.on('error', (err)=>{console.log('redis error!', err)});
redisClient.on('ready', () => { console.log('Redis client is ready'); });

redisClient.connect();
//=========================================================

// (async ()=>{
//     try{
//         await redisClient.connect();
//         console.log('successfully connected to redis');
//     }
//     catch(err){
//         console.log('BIG ERROR: ', err);
//     }
// })();

// mongoose.connect('mongodb://localhost:27017/awesomeusers')
// .then(()=>console.log('mongo is connected to awesome users'))
// .catch((err)=>console.log(err));

// const User = mongoose.model('User', mongoose.Schema({
//     name: String,
//     age: Number
// }));

// setTimeout(()=>{
//     console.log('load data to db');
//     new User({
//         name: 'udii',
//         age: 333
//     }).save();
// }, 3000);

// setTimeout(()=>{
//     (async ()=>{
//         console.log('get data from db');
//         const user = await User.find({name: 'udii'});
//         console.log(user);
//     })();
// }, 3000);


const __filename = fileURLToPath(import.meta.url); // Get the directory name of the current module 
const __dirname = path.dirname(__filename);
  
const app = express();
app.use(cors());
app.use(express.json());
app.post('/', async (req, res)=>{
    console.log('post request was made');
    const name = req.query.name;
    await redisClient.set('name', name); 
    res.send('post successfull');
});
app.get('/', async (req, res)=>{
    const val = await redisClient.get('name');
    res.send('get successfull: '+val);
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('app listening on port: '+port));

// const readFileAndLog = ()=>{

//     fs.readFile('./file.txt', 'utf8', (err,data)=>{
//         if(err)
//             console.log('err:',err);
//         else
//         console.log('file content: ', data);    
//     });
// }
// setInterval(readFileAndLog, 10000);
// console.log('version 3334');