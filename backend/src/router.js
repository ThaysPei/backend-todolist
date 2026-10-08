const express = require('express');
const { validateFieldTitle, validateFieldStatus } = require('./middlewares/tasksMiddlewares');
const tasksController = require('./controllers/tasksController');

const router = express.Router();

router.get(
  '/tasks',
  tasksController.getAll
);

router.post(
  '/tasks',
  validateFieldTitle,
  tasksController.createTask
);

router.delete(
  '/tasks/:id',
  tasksController.deleteTask
);

router.put(
  '/tasks/:id',
  validateFieldTitle,
  validateFieldStatus,
  tasksController.updateTask
);

module.exports = router;
