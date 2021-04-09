const bcrypt = require('bcrypt-nodejs')

//Função para criptografar a senha digitada no banco de dados
module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    //Função para inserir os dados no banco de dados
    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
            .insert({ name: req.body.name, email: req.body.email, password })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err))
        })
    }
    return { save }
}