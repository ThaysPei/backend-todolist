const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.deleteTask(id);
  return response.status(204).end();
};

const updateTask = async (request, response) => {
  const { id } = request.params;

  const result = await tasksModel.updateTask(id, request.body);

  if (result.affectedRows === 0) {
    return response.status(404).json({
      message: 'task not found',
    });
  }

  return response.status(204).end();
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
