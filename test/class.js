var Animal = require('./class/Animal');
var Dog = require('./class/Dog');
var Cat = require('./class/Cat');
var Collie = require('./class/Collie');

describe('Class Inheritance', function() {
  var dog = new Dog('Terrie');
  var cat = new Cat('Hana');
  var collie = new Collie('Ollie');

  it('Should be Animal', function() {
    dog.should.be.instanceOf(Animal);
    cat.should.be.instanceOf(Animal);
    collie.should.be.instanceOf(Animal);
  });

  it('should call parent methods', function() {
    dog.speak().should.match(/name is.*bark/i);
    cat.speak().should.match(/name is.*meow/i);
    collie.speak().should.match(/name is.*bark.*collie/i);
  });

  it('should call the parent constructor if you don\'t supply one', function() {
    collie.name.should.be.equal('Ollie');
  })
});