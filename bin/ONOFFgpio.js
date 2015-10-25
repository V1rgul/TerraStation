
function ONOFFgpio(wiringpi, pin){
	if(wiringpi) wiringpi.pinMode(pin, wiringpi.OUTPUT);
	console.log("ONOFFgpio on pin "+pin);
	return function set(val){
		val = val?1:0;
		console.log("ONOFFgpio pin "+pin+" to "+val);
		if(wiringpi) wiringpi.digitalWrite(pin, val);
	};
}

module.exports = ONOFFgpio;