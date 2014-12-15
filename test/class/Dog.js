var Animal = require('./Animal');

var Dog = Animal.extend({
  construct: function(name) {
    this.super(name);
  },

  speak: function() {
    return this.super() + ' and ' + 'I Bark';
  },

  eat: function() {
    return 'I am eating';
  },

  doAction: function() {
    this.speak();
  }
});

exports = module.exports = Dog;