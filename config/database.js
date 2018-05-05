if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://Ryan:ohaider1@ds263759.mlab.com:63759/memo-prod'
	}
}
else {
	module.exports = {
		mongoURI: 'mongodb://localhost/expressSocial-dev'
	}
}