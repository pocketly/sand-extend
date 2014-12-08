var _ = require('lodash');

// The base Class implementation (does nothing)
function Class(){

}

exports = module.exports = Class;

// Create a new Class that inherits from this class
Class.extend = function(newPrototype) {
  var _super = this.prototype;

  // Instantiate a base class (but only create the instance,
  // don't run the constructor)
  var initializing = true;
  var prototype = new this();
  initializing = false;

  // Copy the properties over onto the new prototype
  for (var name in newPrototype) {
    // Check if we're overwriting an existing function
    if (_.isFunction(newPrototype[name])) {
      prototype[name] = (function(name, fn){
        return function() {
          // Add a new ._super() method that is the same method
          // but on the super-class
          this.super = _super[name];

          return fn.apply(this, arguments);
        };
      })(name, newPrototype[name])
    } else {
      prototype[name] = newPrototype[name];
    }
  }

  // The dummy class constructor
  function Class() {
    // All construction is actually done in the init method
    if (!initializing && this.construct)
      this.construct.apply(this, arguments);
  }

  // Populate our constructed prototype object
  Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  Class.prototype.constructor = Class;

  // And make this class extendable
  Class.extend = arguments.callee;

  return Class;
};