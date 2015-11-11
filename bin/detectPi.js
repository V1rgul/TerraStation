

var fs = require('fs');

function detectPi(){
	try {
		fs.statSync("/sys/class/gpio/gpiochip0");
		return true;
	} catch (e) {}	
	return false;
}

module.exports = detectPi();