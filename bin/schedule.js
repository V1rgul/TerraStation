
var schedule = (function(){

	var log 	= require('log4js').getLogger('Schedule');
	var Time 	= require('./time');

	function Job(fn){
		var self = this;
		var timeout, last, next;

		function fnStart(){
			last = next;
			fn();
			reschedule();
		}

		function reschedule(){
			//log.debug("self", self);
			var now = Date.now();			
			next = self.next();
			var t = next - now;
			timeout = setTimeout(fnStart, t);
		}

		this.destroy = function(){
			clearTimeout(timeout);
		};
		this.last = function(){
			return last;
		};
		this.next = function(){
			//log.debug("next()", last, next, self.calcNext());
			if(!last || last == next){
				next = self.calcNext();
				log.debug("job next", next);
			}
			return next;
		};

		//actually launch it
		reschedule();
	}



	function JobInterval(interval, fn){
		var self = this;

		this.calcNext = function(){
			var last = self.last();

			if(!last) return Date.now();
			return last + interval;
		};
		Job.call(this, fn);
	}

	function JobTime(time, fn){

		this.calcNext = function(){
			//log.debug("nextOccurence", time.nextOccurence());
			return time.nextOccurence();
		};
		Job.call(this, fn);
	}


	function createInterval(interval, fn){
		return new JobInterval( new Time(interval).value, fn );
	}
	function createTime(time, fn){
		return new JobTime    ( new Time(time)  , fn );
	}

	function create(type, timeSetting, fn){
		if     (type === "interval") return createInterval(timeSetting, fn);
		else if(type === "time"    ) return createTime    (timeSetting, fn);
	}

	create.interval = createInterval;
	create.time     = createTime;

	return create;
})();

module.exports = schedule;



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


//var interval = new Time({s: 1}).value;
//schedule.interval(          interval, logFactory("interval", interval) );

// schedule.time    ( Time.nowOccurence().value+Time.S, logFactory(    "time",   Time.D) );

