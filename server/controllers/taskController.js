const Task = require('../models/taskModel')

const getTasks = async (req, res) => {
    const id = req.params.id;
    const tasks = await Task.find({project:id});
    return res.send({ status: "success", data: tasks });
}


const addTask = async (req, res)=>{
    const {title, description, id} = req.body;
    if(!title || !description || !id){
        return res.send({status:"failed", message:"please add all fields"});
    }else{
        const usr = await Task.find({title:title});
        if(usr.length > 0){
           return res.send({status:"failed", message:"Task already exist"});
        }else{
            try{
                const newTask = new Task({
                    title:title,
                    description:description,
                    project:id
                })
                if(newTask.save()){
                    return res.send({status:"success", message:"Task Saved Successfuly"});
                }
            }catch(err){
                return res.send({status:"failed", message:err});
            }
            
        }
    }
}


const updateTask = async (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.send({ status: "failed", message: "please add all fields" });
    } else {
        try {
            const project = await Task.findOneAndUpdate({ _id: id }, {
                title: title,
                description: description,
                status: status
            })
            if (project.save()) {
                return res.send({ status: "success", message: "Task Saved Successfuly" });
            }
        } catch (err) {
            return res.send({ status: "failed", message: err });
        }
    }
}

const deleteTask = async (req,res)=>{
    const id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: id });
        if (task) {
            return res.send({ status: "success", message: "Task Deleted Successfuly" });
        }
    } catch (err) {
        return res.send({ status: "failed", message: err });
    }
}




module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}