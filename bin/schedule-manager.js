

var scheduleManager = (function(){

	var schedule = require('./schedule');
	var log = require('log4js').getLogger("ScheduleManager");

	var jobs = {};

	function set(name, time, fn, fnStop){
		if(jobs[name]){
			jobs[name].forEach(function(j){
				j.destroy();
			});
			delete jobs[name];
		}

		if(!time){
			log.debug("no time:", time);
			return;
		}
		if(!Array.isArray(time)) time = [time];

		jobs[name] = time.map(function(t){
			return schedule(t, fn, fnStop);
		});
	}

	return {
		set: set,
		unset: function(name){ set(name, null); },
		list: function list(){ return jobs; } //only use for debugging
	};

})();

module.exports = scheduleManager;



// var log = require('log4js').getLogger("TESTS");
// var Time = require('./time');

// log.info("start of tests");

// scheduleManager.set(
// 	"A",
// 	{ start: Time.nowOccurence().value+Time.S, duration: {s:1} },
// 	function(){ log.info("start") },
// 	function(){ log.info("end")   }
// );

