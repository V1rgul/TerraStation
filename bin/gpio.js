
var fs = require('fs');

function detectPi(){
	try {
		fs.statSync("/sys/class/gpio/gpiochip0");
		return true;
	} catch (e) {}	
	return false;
}

function getWiring(){
	if(detectPi()){
		var wpi = require("wiring-pi");
		wpi.wiringPiSetupGpio();
		return wpi;
	}
	return null;
}

module.exports = getWiring();