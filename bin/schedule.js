
var schedule = (function(){

	var log 	= require('log4js').getLogger('Schedule');
	var Time 	= require('./time');
	var TimeBlock = require('./time-block');

	function Job(timeBlock, fnStart, fnEnd){
		var self = this;
		var timeout;

		fnEnd = fnEnd || function(){};

		function _fnStart(){
			fnStart();
			var now = Date.now();
			var end = timeBlock.end.todayOccurence();
			var t = end - now;
			timeout = setTimeout(_fnEnd, t);
		}
		function _fnEnd(){
			fnEnd();
			reschedule();
		}

		function reschedule(){
			//log.debug("self", self);
			var now = Date.now();			
			var next = self.next();
			var t = next - now;
			timeout = setTimeout(_fnStart, t);
		}

		this.destroy = function(){
			clearTimeout(timeout);
		};
		this.next = function(){
			//log.debug("nextOccurence", time.nextOccurence());
			var now = Date.now();
			var next = timeBlock.start.todayOccurence();
			if(next < now){ 
				//next is before now
				var end = timeBlock.end.todayOccurence();
				if(end < now){
					//and end is before now
					//check only usefull if Job registered during its hypothetical execution
					next += Time.D;
				}
			}
			return next;
		};

		//actually launch it
		reschedule();
	}

	return function(timeBlock, fnStart, fnEnd){
		return new Job(new TimeBlock(timeBlock), fnStart, fnEnd);
	};
})();

module.exports = schedule;



// var log = require('log4js').getLogger("TESTS");
// var Time = require('./time');


// var almostAllDay = schedule(
// 	{
// 		start:{m:1},
// 		end:{h:23,m:59}
// 	},
// 	function(){	log.info("all-day:start", new Date()); },
// 	function(){	log.info("all-day: end", new Date()); }
// );

// var nowToday = Time.nowOccurence().value;
// var in10s = schedule(
// 	{
// 		start: nowToday+(new Time({s:10}).value),
// 		end: nowToday+(new Time({s:20}).value)
// 	},
// 	function(){	log.info("in10s  :start", new Date()); },
// 	function(){	log.info("in10s  : end", new Date()); }
// );
