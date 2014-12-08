
[![Build Status](https://travis-ci.org/pocketly/sand-extend.svg?branch=master)](https://travis-ci.org/pocketly/sand-extend) [![npm version](https://badge.fury.io/js/sand-extend.svg)](http://badge.fury.io/js/sand-extend)
# sand-extend

_sand-extend_ offers a simple way to have class inheritance in javascript.  It works well with and without the sand framework.

Currently _sand-extend_ offers 2 ways to do inheritance:
1. [Class Based](#class-based) method with construct (Full inheritance)
2. [Extend Based](#extend-based) method with prototype inheritance (has some caveats)

## Class Based
Class based inheritance is a little different then what you are used to but offers full inheritance concept

```javascript
var Animal = Class.extend({
  // This is the constructor method
  construct: function(name) {
    this.name = name || 'No Name';
  },

  speak: function() {
    return 'My name is ' + this.name;
  }
});

var Dog = Animal.extend({
  // Just calling super, could be omitted
  construct: function(name) {
    this.super(name);
  },

  speak: function() {
    return this.super() + ' and ' + 'I Bark';
  }
});

var Collie = Dog.extend({
  // Auto calls parent constructor
  
  speak: function() {
    return this.super() + ' and ' + 'I am a Collie';
  }
});
```
## Extend Based
Extend based uses the typical prototype inheritance but adds the super method so you can call the parent.

### Example
```javascript
require('sand-extend').enableGlobalExtend();

function Animal(name) {
  this.name = name || 'No Name';
}

Animal.prototype.speak = function() {
  return 'My name is ' + this.name;
};

function Dog(name) {
  this.super(name);
}

// Extend the Animal class
Dog.extend(Animal, {
  // Override the speak class and 
  // call the parent method
  speak: function() {
    return this.super() + ' and ' + 'I Bark';
  }
});

function Cat(name) {
  this.super(name);
}

// Extend the Animal class
Cat.extend(Animal, {
  // Override the speak class and 
  // call the parent method
  speak: function() {
    return this.super() + ' and ' + 'I Meow';
  }
});

var dog = new Dog('Terrie');
var cat = new Cat('Hana');

// Prints out `My Name is Terrie and I Bark`
console.log(dog.speak());

// Prints out `My Name is Hana and I Meow`
console.log(cat.speak());

```
### Caveats
Extend supports multiple levels of inheritance but you **can't** call _this.super()_ in all constructors as it has an infinite loop issue. _this.super()_ can still be called in all methods though, an infinite number deep.

### OMG It Extends Function?

Yes, yes it does, with a single getter _extend_, and no it won't break your code, because it does this **properly** with a non-enumerable property.
Also it only does this if you enable it with `enableGlobalExtend`. It is off by default.

## To begin

 1. Install it:

    ```bash
    $ npm install sand-extend -S
    ```

 2. Require it and use:

    ```javascript
    // Either enable Global extend
    require('sand-extend').enableGlobalExtend();
    
    // or Use extend by itself
    var Extend = require('sand-extend').Extend;
    ```

## Tests
To run the tests for _sand-extend_ simply run:
```bash
$ npm test
```

## License
ISC &copy; 2014 Pocketly