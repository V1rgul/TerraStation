

var fs = require('fs');

function detectPi(){
	var log = require('log4js').getLogger('detectPi');
	try {
		fs.statSync("/sys/class/gpio/gpiochip0");
		log.info("found Pi!");
		return true;
	} catch (e) {}
	log.warn("not found Pi files !");
	return false;
}

module.exports = detectPi();