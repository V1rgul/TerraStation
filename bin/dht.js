
var EXECUTABLE_PATH="~/Github/Adafruit_Python_DHT/examples";
var MODEL="2302";

var log = require('log4js').getLogger('dht');
log.setLevel('DEBUG');
var Promise = require('bluebird');
var _  = require('lodash');

var exec = Promise.promisify(require('child_process').exec);

var isPi = require('./detectPi');

var regex = {
	temp		: /Temp=([0-9.]+)*/,
	humidity	: /Humidity=([0-9.]+)%/
};

function parse(s){
	return _.mapValues(regex, function(r){
		var res = r.exec(s);
		var val = parseFloat(res[1]);
		return val;
	});
}

function construct(pin){
	return function read(){
		var p;
		if(isPi){
			p = exec(EXECUTABLE_PATH);
		} else {
			p = Promise.resolve("Temp=28.1*  Humidity=30.9%\n");
		}

		return p.then(function(d){
			return parse(d);
		});	
		
	};
}

module.exports = construct;

construct(4)().then(function(d){ console.log(d); });