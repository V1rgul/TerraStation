/*
{s:1} -> 1000
1000 -> {s:1} ?

{s:1} -> 00:00:01

*/

var Time = (function(){
	var log = require('log4js').getLogger('Time');
	log.setLevel('WARN');

	var values = {};
	values.ms = 1;
	values.s  = values.ms * 1000;
	values.m  = values.s  * 60;
	values.h  = values.m  * 60;
	values.d  = values.h  * 24;

	var sortedFields = Object.keys(values).sort(function(a,b){
		return values[a] < values[b];
	});

	function Time(o){
		log.debug("----- IN", o);

		//convert to ms
		if(typeof o === 'number'){
			log.debug("type:number");
			this.value = o;
		}else if(typeof o === 'object'){
			if( o.value ){
				log.debug("type:time");
				this.value = o.value;
			}else{
				log.debug("type:object");
				this.value = Object.keys(values).reduce(function(acc, field){
					var v = o[field] || 0;
					return acc + v * values[field];
				}, 0);
			}		
		}else{
			log.fatal("invalid Time", o);
			return null;
		}

		log.debug("value:", this.value);

		if(this.value < 0){
			log.fatal("negative Time", this.value);
			return null;
		}else if(this.value === 0){
			log.warn("0 Time");
		}

		//convert back to h,m,s
		{
			//scope _value
			var _value = this.value;
			var self = this;
			sortedFields.forEach(function(f){
				self[f] = Math.floor(_value/values[f]);
				_value -= self[f]*values[f];
			});		
		}
		
	}


	var inDayFields = sortedFields.slice(sortedFields.indexOf("h"));

	var dateFn = {
		get : {
			ms: Date.prototype.getMilliseconds,
			s : Date.prototype.getSeconds,
			m : Date.prototype.getMinutes,
			h : Date.prototype.getHours
		},
		set : {
			ms: Date.prototype.setMilliseconds,
			s : Date.prototype.setSeconds,
			m : Date.prototype.setMinutes,
			h : Date.prototype.setHours
		},
	};
	Time.prototype.todayOccurence = function(){
		if(this.value >= values.d){
			log.error("cant calc nextOccurence, time > 1 day");
			return null;
		}
		var d = new Date();
		inDayFields.forEach(function(f){
			dateFn.set[f].call(d, this[f]);
		}.bind(this));
		d = d.getTime();

		return d;
	};
	Time.nowOccurence = function(){
		var d = new Date();
		var r = {};
		inDayFields.forEach(function(f){
			r[f] = dateFn.get[f].apply(d);
		});
		log.debug(r);
		return new Time(r);
	};

	sortedFields.forEach(function(f){
		Time[f.toUpperCase()] = values[f];
	});

	return Time;
})();

module.exports = Time;



// var log = require('log4js').getLogger('TESTS');

// var ts = [
// 	0,
// 	1000+1,
// 	60*1000+1,
// 	{},
// 	{s:1, ms:1},
// 	{m:1, ms:1},
// ];
// ts.forEach(function(t, i){
// 	var _t = new Time(t);
// 	log.debug("ts"+i, _t);
// });

// var tt = new Time(new Time({s:1, ms:1}));
// log.debug("tt", tt);

// var tn = Time.nowOccurence();
// log.debug("tn", tn);