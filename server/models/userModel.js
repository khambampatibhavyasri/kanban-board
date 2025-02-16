const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name :{
        type :String,
        required:[true, 'name required !']
    },
    email :{
        type :String,
        required: [true, 'email requried !'],
        unique: true,
    }, 
    password:{
        type: String,
        required :[true, 'Password required !']
    }, 
},{
    timestapms:true
})

module.exports =  mongoose.models.User || mongoose.model('User', userSchema);