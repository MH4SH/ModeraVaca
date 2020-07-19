const smslegal = require('smslegal');

smslegal.config({user: process.env.SMS_LEGAL_USER, pass: process.env.SMS_LEGAL_PASS});

//module.exports = smslegal;
/**
 * @TODO
 * 
 * Change on production
 */
module.exports = {
	send: (object) => {
		console.log(object);
	}
}