const validateBody = (request, response, next) => {
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

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

// Valida ?limit e ?offset do GET /tasks. Guarda os valores já convertidos em
// response.locals.pagination (request.query é somente leitura no Express 5).
const validatePagination = (request, response, next) => {
    const { limit = DEFAULT_LIMIT, offset = 0 } = request.query;

    const isNonNegativeInteger = (value) => /^\d+$/.test(String(value));

    if (!isNonNegativeInteger(limit) || Number(limit) < 1 || Number(limit) > MAX_LIMIT) {
        return response.status(400).json({
            message: `limit must be an integer between 1 and ${MAX_LIMIT}`,
        });
    }

    if (!isNonNegativeInteger(offset)) {
        return response.status(400).json({
            message: 'offset must be an integer greater than or equal to 0',
        });
    }

    response.locals.pagination = { limit: Number(limit), offset: Number(offset) };
    next();
};

module.exports = {
    validateBody,
    validatePagination,
};