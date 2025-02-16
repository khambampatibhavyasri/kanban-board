const mongoose = require('mongoose')
const taskSchema = mongoose.Schema({
    title :{
        type :String,
        required:[true, 'name required !']
    },
    description :{
        type :String,
        required: [true, 'Enter description'],
    }, 
    project:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    status :{
        type: String,
        default : 'to do',
        enum : ['to do', 'in-progress', 'done']
    }
},{
    timestamps:true
})

module.exports =  mongoose.models.Task || mongoose.model('Task', taskSchema);