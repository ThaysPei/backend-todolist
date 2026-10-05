
const express = require('express');
const tasksMiddlewares = require('./middlewares/tasksMiddlewares')
const tasksController = require('./controllers/tasksController')


const router = express.Router()


router.get('/tasks', tasksController.getAll);
router.post('/tasks',tasksMiddlewares.validateBody, tasksController.createTask);



module.exports = router;

