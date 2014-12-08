var Animal = require('./Animal');

var Dog = Animal.extend({
  construct: function(name) {
    this.super(name);
  },

  speak: function() {
    return this.super() + ' and ' + 'I Bark';
  }
});

exports = module.exports = Dog;