
var isPi = require('./detectPi');

function getWiring(){
	if(isPi){
		var wpi = require("wiring-pi");
		return wpi;
	}
	return null;
}

function construct(){
	var wpi = getWiring();
	wpi.wiringPiSetupGpio();
	return {
		onOff : function ONOFFgpio(pin, reversed){

			if(wpi) wpi.pinMode(pin, wpi.OUTPUT);
			console.log("GPIO ONOFF on pin "+pin);
			var inv = !!reversed;

			function set(val){
				var v = !!val;
				v = ( val != inv ) ? 1 : 0;
				console.log("GPIO ONOFF pin "+pin+" to "+v+((inv?" (inv)":"")));
				if(wpi) wpi.digitalWrite(pin, v);
			}
			set(0);

			return set;

		},
		dht : function(devId){
			var handle = wpi.wiringPiI2CSetup(0x11);

			return function read(){
				return {};
			};
		}

	};
}

module.exports = construct;