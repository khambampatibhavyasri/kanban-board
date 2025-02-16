const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    name :{
        type :String,
        required:[true, 'name required !']
    },
    description :{
        type :String,
        required: [true, 'Enter description'],
    },  
    status :{
        type: String,
        default : 'to do',
        enum : ['to do', 'in-progress', 'done']
    }
},{
    timestamps:true
})

module.exports =  mongoose.models.Project || mongoose.model('Project', projectSchema);