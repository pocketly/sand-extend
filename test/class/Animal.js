var Class = require('../../').Class;

var Animal = Class.extend({
  construct: function(name) {
    this.name = name || 'No Name';
  },

  speak: function() {
    return 'My name is ' + this.name;
  }
});

exports = module.exports = Animal;
