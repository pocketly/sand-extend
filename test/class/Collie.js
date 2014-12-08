var Dog = require('./Dog');

var Collie = Dog.extend({
  speak: function() {
    return this.super() + ' and ' + 'I am a Collie';
  }
});

exports = module.exports = Collie;