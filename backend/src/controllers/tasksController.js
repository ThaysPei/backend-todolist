const tasksModel = require("../models/tasksModel");

const getAll = async (request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const createTasks = async (request, response) => {
  const createdTask = await tasksModel.createTasks(request.body);
  return response.status(201).json(createdTask);
};

module.exports = {
  getAll,
  createTasks,
};
