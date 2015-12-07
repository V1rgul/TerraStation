

var TimeBlock = (function(){

	var log = require('log4js').getLogger('TimeBlock');
	var Time = require('./time');



	function TimeBlock(o){
		if(!o) {
			log.fatal("no object given to Constructor", o);
		}
		else if(!o.start){
			log.fatal("no start in object given to Construstor", o);
		}
		this.start = new Time(o.start);
		if(o.end){
			this.end = new Time(o.end);
			this.duration = new Time(this.end.value - this.start.value);
		}else{
			if(!o.duration) log.warn("no end nor duration, using duration=0");
			this.duration = new Time(o.duration || 0);
			this.end = new Time(this.start.value + this.duration.value);
		}
	}

	TimeBlock.prototype.in = function(time){
		if(!time || !time.value){
			logger.fatal("not a Time object", time);
		}
		return ( this.start.value <= time.value ) && ( time.value < this.end.value );
	};

	TimeBlock.prototype.intersect = function(timeBlock){
		if(!timeBlock || !timeBlock.start || !timeBlock.end){
			logger.fatal("not a Time object", timeBlock);
		}
		// this:(), timeBlock:[]
		//  [ ) && ( ]
		return ( timeBlock.start.value < this.end.value ) && ( timeBlock.end.value >= this.start.value );
	};

	return TimeBlock;
})();

module.exports = TimeBlock;


// function Tests(){
// 	var log = require('log4js').getLogger('TESTS');

// 	var td = new TimeBlock({ start:{h:2}, end:{h:4} });
// 	var ts = [
// 		// this:(), timeBlock:[]
// 		{ start:{h:0}, end:{h:1} }, // ()[] false
// 		{ start:{h:1}, end:{h:3} }, // ([)] true
// 		{ start:{h:1}, end:{h:5} }, // ([]) true
// 		{ start:{h:3}, end:{h:5} }, // [(]) true
// 		{ start:{h:5}, end:{h:6} }, // []() false
// 	];

// 	ts.forEach(function(t, i){
// 		var _t = new TimeBlock(t);
// 		log.debug("ts"+i, _t);
// 		log.debug(_t.intersect(td), td.intersect(_t));
// 	});
// }
// Tests();