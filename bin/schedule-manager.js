

var scheduleManager = (function(){

	var schedule = require('./schedule');
	var log = require('log4js').getLogger("ScheduleManager");

	var jobs = {};

	function set(name, time, fn){
		if(jobs[name]){
			jobs[name].forEach(function(j){
				j.destroy();
			});
			delete jobs[name];
		}

		if(!time) return;

		if(!Array.isArray(time)) time = [time];

		jobs[name] = time.map(function(t){
			if(t.interval && t.time){
				log.error("interval & occurence", t);
			}

			if(t.interval){
				return schedule.interval(t.interval, fn);
			}else if(t.time){
				return schedule.time(t.time, fn);
			}else{
				log.fatal("invalid time", t);
			}
		});
	}

	
	function list(){
		return jobs;
	}

	return {
		set: set,
		unset: function(name){ set(name, null); },
		list: list //only use for debugging
	};

})();

module.exports = scheduleManager;



// var log = require('log4js').getLogger("TESTS");
// var Time = require('./time');

// function logFactory(name, interval){
// 	var s, n = 0;
// 	return function(){
// 		if(!s) s = Date.now();
// 		else n++;
// 		var diff = Date.now() - s;
// 		log.info(name, n, "drift=", diff-interval*n);
// 	};
// }


// var interval = new Time({s: 1}).value;
// scheduleManager.set(
// 	"interval",
// 	{interval:interval},
// 	logFactory("interval", interval)
// );

// scheduleManager.set(
// 	"time",
// 	{ time: Time.nowOccurence().value+Time.S },
// 	logFactory(    "time",   Time.D)
// );

