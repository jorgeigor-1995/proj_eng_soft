// novo usuario
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario');
const { check, validationResult } = require('express-validator'); // aaaaa

module.exports = function (app) {
    //var Usuario = app.models.usuario;

    var UsuarioController = { // não utilizavel
       login: function (req, res) {
            res.render('usuario/login', { message: ''});
    
        }, 

        sing_up: function(req, res){
            res.render('usuario/create', { message: ''});
        },
        create: function (req, res) {
            const errors = validationResult(req); /// aaaaaa
            var resultado = { errors: errors.array(), usuario: req.body.usuario }; // aaaaaa
            if(req.body.email && req.body.senha){
                Usuario.findOne({'email': req.body.email })
                    .then(user => {
                        if(user) {
                            //res.json({ success: false, message:"Esse email já esta em uso"});
                            res.render('usuario/create', { message: "Esse email já esta em uso!"});
                        }else{
                            bcrypt.hash(req.body.senha, 8)
                                .then(hash => {
                                    var encryptedSenha = hash;

                                    var newUser = new app.models.usuario({
                                        nome: req.body.nome,
                                        email: req.body.email,
                                        senha: encryptedSenha
                                    });

                                    newUser.save()
                                        .then(() => {
                                            res.render('usuario/create', { message: "Usuario criado com sucesso"});
                                            //res.render('usuario/login');
                                        })
                                        .catch(err => res.json({success: false, message: err, statusCode:500}));
                                })
                                .catch(err => res.json({success: false, message: err, statusCode:500}));
                        }
                    })
            }else{
                //res.json({ success: false, message: "Campos nome, email e senha são requeridos", statusCode: 400});
                res.render('usuario/create', { message: "Campos vazios requeridos!"});
            }
              
        }, // teste 
        
        logar: function (req, res) {
           if (req.body.email && req.body.senha) {
                Usuario.findOne({'email': req.body.email}).then(function(user) {
                    return bcrypt.compare(req.body.senha, user.senha);
                })
                .then(function(samePassword) {
                    console.log(String(samePassword));
                    if(!samePassword) {
                        res.render('usuario/login', { message: "Senha incorreta!"});
                        console.log("Senha incorreta");
                        
                    }else{
                        Usuario.findOne({'email': req.body.email}).then(function(user) {
                            req.session.usuario = user.nome;
                            res.render('usuario/logado', { usuario: user });
                            console.log("A combinação email e senha são corretos!" );
                            res.send();
                        })
                    
                    }
                    
                })
                .catch(function(error){
                    //res.json({ success: false, message:"Esse email não está cadastrado"});
                    res.render('usuario/login', { message: "Esse email não está cadastrado!"});
                    console.log("Error authenticating user: ");
                    console.log(error);
                });
            }else {
                    res.render('usuario/login', { message: "Email ou senha incorreto!"});
            }
        }, 

        logado: function (req, res) {
            res.render('usuario/logado')
        },

        logout: function (req, res) {
            req.session.destroy();
            res.redirect('/usuario/login');
        },

        validate: [ // aaaaaaa
            check('usuario[email]', 'O email deve ser válido').isEmail(),
            check('usuario[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('usuario[senha]', 'Campo sobrenome é obrigatório').not().isEmpty()
        ]
       
    }
    
    return UsuarioController;
}