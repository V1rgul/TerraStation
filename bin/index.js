
var gpio = require('./gpio');
var ONOFFgpio = require('./ONOFFgpio');

var rain = ONOFFgpio(gpio, 20);

var value = 1;

setInterval(function() {
  rain(value);
  value = +!value;
}, 500);