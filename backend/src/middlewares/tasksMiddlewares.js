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

  if (typeof status !== 'string' || status.trim() === '') {
    return response.status(400).json({
      message: 'status must be a non-empty string',
    });
  }

  next();
};

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
};
