const validateBody = (request, response, next) => {
const { title } = request.body ?? {};

if(title === undefined){
    return response.status(400).json({message: 'the field "title" is required'})
} // se não for enviado titulo

if(title === ''){
    return response.status(400).json({message: 'title cannot be empty'})
} // se o campo do titulo está vazio

next(); // cai aqui se não cair nas condições acima, ou seja, o campo title foi preenchido

}


module.exports = {
    validateBody,

}