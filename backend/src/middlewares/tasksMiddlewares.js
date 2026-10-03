const validateBody = (request, response, next) => {
    const { title } = request.body ?? {};

    if (title === undefined) {                          //validacao para ausencia de campo title
        return response.status(400).json({
            message: 'the field "title" is required',
        });
    }

    if (typeof title !== 'string' || title.trim() === '') {
        return response.status(400).json({
            message: 'title must be a non-empty string',    // validacao numeros, espaços e campos vazios
        });
    }

    const MAX_TITLE_LENGTH = 255;

    if (title.length > MAX_TITLE_LENGTH) {         //validacao para caracteres acima do limite 
        return response.status(400).json({
            message: `title must have at most ${MAX_TITLE_LENGTH} characters`,
        });
    }

    request.body.title = title.trim();  //tratando espaços do title
    next();
};

module.exports = {
    validateBody,
};