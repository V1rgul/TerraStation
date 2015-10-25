
var gpio = require('./gpio')();

var rain = gpio.onOff(20, true);

var value = 1;

setInterval(function() {
  rain(value);
  value = +!value;
}, 500);