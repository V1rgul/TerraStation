
var Factory = (function(){
	var log = require('log4js').getLogger("Task");
	var Time = require('./time');

	return function(fn, duration, fnStop){

		var running = false;

		var _fnStop;
		if( typeof fnStop === 'function' ){
			_fnStop = function(){
				fnStop(false);
				running = false;
			};
		}else{
			_fnStop = function(){
				running = false;
			};
		}

		var _fnDuration;
		if(duration){
			duration = new Time(duration).value;
			_fnDuration = function(){
				var start = Date.now();
				fn(true);
				var ramaining = start + duration - Date.now();
				if(remaining < 0){
					log.warn("fn execution was longuer than duration", duration, fn);
					remaining = 0;
				}
				setTimeout(_fnStop, remaining);
			};
		}else{
			_fnDuration = function(){
				fn(true);
				_fnStop();
			};
		}

		function _fn(){
			if(running){
				log.error("re-entrence detected, skipping");
				return;
			}
			running = true;
			_fnDuration();
		}
	};

})();

module.exports = Factory;
