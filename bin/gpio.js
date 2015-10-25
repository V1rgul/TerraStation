
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

function construct(){
	var wpi = getWiring();
	return {
		onOff : function ONOFFgpio(pin, reversed){

			if(wpi) wpi.pinMode(pin, wpi.OUTPUT);
			console.log("GPIO ONOFF on pin "+pin);
			var inv = !!reversed;

			function set(val){
				var v = ( (!!val) != inv ) ? 1 : 0;
				console.log("GPIO ONOFF pin "+pin+" to "+v);
				if(wpi) wpi.digitalWrite(pin, v);
			}
			set(0);

			return set;

		}
	};
}

module.exports = construct;