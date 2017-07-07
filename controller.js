let mongoose = require('mongoose');
let User = mongoose.model('Usuario');
let jwt = require('jsonwebtoken');
let config = require('./config');

// función para ser invocada por POST
exports.registrarse = function(req, res) {

	let user = new User({
		email: req.body.correo,
		password: req.body.contrasena
	});

	user.save().then((data) => {
		res.json({
			error: false
		});
	}).catch((error) => {
		return res.json({
			error: true
		});
	});
};


exports.logear = function(req, res) {

	let data = {
		email: req.body.correo,
		password: req.body.contrasena
	};

	User.findOne(data).lean().exec(function(err, user) {

		if (err) {
			return res.json({
				error: true
			});
		}

		if (!user) {
			return res.status(404).json({
				'mensaje': 'Usuario no encontrado!'
			});
		}

		console.log(user);

		let token = jwt.sign(user, config.jwt_secreto, {
			expiresIn: '1m' // expires in 1 hour
		});

		res.json({
			error: false,
			token: token
		});
	});
}
