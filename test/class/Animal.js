var Class = require('../../').Class;
var EventEmitter = require('events').EventEmitter;

var Animal = Class.extend(EventEmitter, {
  construct: function(name) {
    this.name = name || 'No Name';
  },

  speak: function() {
    return 'My name is ' + this.name;
  }
});

exports = module.exports = Animal;
