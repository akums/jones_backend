
const express = require('express');
const app = express();
const port = process.env.PORT || 6040;
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const multer = require('multer');
const mongoose = require('mongoose');
const userModel = require('./model/acct');
const MONGO_URI = process.env.NONGO_URI;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));

// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.baseUrl}`)
//     next()
// });


app.get('/v/api', async (req,res)=>{
    try{
        let allUsers = await userModel.find();
        await res.status(200).json({
            err: false,
            data: allUsers,
            dat: Date.now()
        })
        // res.json({msg:'GET REQUEST'})

    }catch(e){
        res.status(400).json({
            err: true,
            dat: Date.now(),
            msg: e
        })
    }
});



app.post('/v/api/create', async (req,res)=>{
    try {
        const eachAcct = await new userModel({
            username: req.body.username,
            password: req.body.password
        })

        const saveUser = await eachAcct.save();
        res.status(201).json({
            err: false,
            dat: new Date(),
            data: saveUser
        })

    } catch (e) {
        res.status(400).json({
            err: true,
            dat: Date.now(),
            msg: e
        })
    }
});



app.delete('/v/api/del/:userId', async (req,res)=>{
    try {
        let id = req.params.userId;
        const findUserById = await userModel.findById(id);
        if(!findUserById){
            return res.status(404).json({
                err: true,
                data: null,
                msg: 'no user found'
            })
        }

        const deleteUserById = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            dat: Date.now(),
            data: deleteUserById,
            err: false
        })
    } catch (e) {
        res.status(400).json({
            err: true,
            dat: Date.now(),
            msg: e
        })
    }
});


mongoose.connect(MONGO_URI)
.then(()=>{
    // const {PORT = 6040} = process.env;
    app.listen(port, ()=> console.log(`${port} has started`));
    console.log('database connected succesfuly')
    
})
.catch((e)=> console.log('Error connecting to DB',e))
