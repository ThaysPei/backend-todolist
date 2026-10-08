const express = require('express');
const { validateFieldTitle } = require('./middlewares/tasksMiddlewares');
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



module.exports = router;
