const express = require('express');
const {
  validateFieldTitle,
  validateFieldStatus,
  validateParamId,
} = require('./middlewares/tasksMiddlewares');
const tasksController = require('./controllers/tasksController');

const router = express.Router();

router.get('/tasks', tasksController.getAll);

router.post('/tasks', validateFieldTitle, tasksController.createTask);

router.delete('/tasks/:id', validateParamId, tasksController.deleteTask);

router.put(
  '/tasks/:id',
  validateParamId,
  validateFieldTitle,
  validateFieldStatus,
  tasksController.updateTask,
);

module.exports = router;
