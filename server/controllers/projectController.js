const Project = require('../models/projectModel');
const jwt = require('jsonwebtoken');

const getProjects = async (req, res) => {
    const projects = await Project.find();
    return res.send({ status: "success", data: projects });
}


const addProject = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.send({ status: "failed", message: "please add all fields" });
    } else {
        const prj = await Project.find({ name });

        if (prj.length > 0) {
            return res.send({ status: "failed", message: "Project already exist" });
        } else {
            try {
                const newPrj = new Project({
                    name: name,
                    description: description
                })
                if (newPrj.save()) {
                    return res.send({ status: "success", message: "Project Saved Successfuly" });
                }
            } catch (err) {
                return res.send({ status: "failed", message: err });
            }
        }
    }
}


const updateProject = async (req, res) => {
    const id = req.params.id;
    const { name, description, status } = req.body;
    if (!name || !description || !status) {
        return res.send({ status: "failed", message: "please add all fields" });
    } else {
        try {
            const project = await Project.findOneAndUpdate({ _id: id }, {
                name: name,
                description: description,
                status: status
            })
            if (project.save()) {
                return res.send({ status: "success", message: "Project Saved Successfuly" });
            }
        } catch (err) {
            return res.send({ status: "failed", message: err });
        }
    }
}

const deleteProject = async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    try {
        const project = await Project.findOneAndDelete({ _id: id });
        if (project) {
            return res.send({ status: "success", message: "Project Saved Successfuly" });
        }
    } catch (err) {
        return res.send({ status: "failed", message: err });
    }
}

module.exports = {
    getProjects,
    addProject,
    updateProject,
    deleteProject
}