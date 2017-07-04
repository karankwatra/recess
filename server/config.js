module.exports = {
	session: {
		secret: "supersecretsessionpassword",
		saveUninitialized: false,
		resave: false
	},
	postgres: {
		host: '127.0.0.1',
		port: 5432,
		database: 'test',
		user: 'postgres',
		password: 'password'
	}

}
