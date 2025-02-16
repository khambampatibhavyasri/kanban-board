const express = require('express')
const verifyUser = require('../middleware')

const user_routes = express()

const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');

user_routes.post('/register', userController.registerUser);
user_routes.post('/login', userController.loginUser)

user_routes.get('/getProjects', verifyUser, projectController.getProjects);
user_routes.post('/addproject', verifyUser, projectController.addProject);
user_routes.put('/updateProject/:id', verifyUser, projectController.updateProject);
user_routes.delete('/deleteProject/:id', verifyUser, projectController.deleteProject);

user_routes.get('/getTasks/:id', verifyUser, taskController.getTasks);
user_routes.post('/addTask', verifyUser, taskController.addTask);
user_routes.put('/updateTask/:id', verifyUser, taskController.updateTask);
user_routes.delete('/deleteTask/:id', verifyUser, taskController.deleteTask);





module.exports = user_routes