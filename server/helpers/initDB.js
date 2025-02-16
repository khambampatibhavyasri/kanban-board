const mongoose = require('mongoose');
const initDB = async ()=>{
    if(mongoose.ConnectionStates[0].readyState){
        console.log("Already Connected");
    }
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on('connected', ()=>{
        console.log('Connected');
    })

    mongoose.connection.on('err', ()=>{
        console.log(err);
    })
}

module.exports = initDB