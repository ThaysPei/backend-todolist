const express = require('express');
const { validateBody, validatePagination } = require('./middlewares/tasksMiddlewares');
const tasksController = require('./controllers/tasksController');

const router = express.Router();

router.get(
  '/tasks',
  validatePagination,
  tasksController.getAll
);

router.post(
  '/tasks',
  validateBody,
  tasksController.createTask
);

module.exports = router;
