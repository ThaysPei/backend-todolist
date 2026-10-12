const DEFAULT_TASK_STATUS = 'pendente';

const TASK_STATUSES = [DEFAULT_TASK_STATUS, 'em andamento', 'concluída'];

const validateFieldTitle = (request, response, next) => {
  const { title } = request.body ?? {};

  if (title === undefined) {
    return response.status(400).json({
      message: 'the field "title" is required',
    });
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return response.status(400).json({
      message: 'title must be a non-empty string',
    });
  }

  const MAX_TITLE_LENGTH = 255;

  if (title.length > MAX_TITLE_LENGTH) {
    return response.status(400).json({
      message: `title must have at most ${MAX_TITLE_LENGTH} characters`,
    });
  }

  request.body.title = title.trim();
  next();
};

const validateFieldStatus = (request, response, next) => {
  const { status } = request.body ?? {};

  if (status === undefined) {
    return response.status(400).json({
      message: 'the field "status" is required',
    });
  }

  if (typeof status !== 'string') {
    return response.status(400).json({
      message: 'status must be a string',
    });
  }

  const normalizedStatus = status.trim();

  if (!TASK_STATUSES.includes(normalizedStatus)) {
    return response.status(400).json({
      message: `status must be one of: ${TASK_STATUSES.join(', ')}`,
    });
  }

  request.body.status = normalizedStatus;
  next();
};


const TASK_ID_PATTERN = /^[1-9]\d*$/;

const validateParamId = (request, response, next) => {
  const { id } = request.params;

  if (!TASK_ID_PATTERN.test(id)) {
    return response.status(400).json({
      message: 'id must be a positive integer',
    });
  }

  return next();
};


module.exports = {
  validateFieldTitle,
  validateFieldStatus,
  validateParamId,
};
