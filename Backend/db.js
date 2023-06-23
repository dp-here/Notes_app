const mongoose=require('mongoose');
const mongoURI ="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
var assert=require('assert')
const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("CONNECTED To Mongo Successfully");
    })
} 
module.exports =connectToMongo;