var _ = require('lodash');

// The base Class implementation (does nothing)
function Class(){

}

exports = module.exports = Class;

// Create a new Class that inherits from this class
Class.extend = function(constructor, newPrototype) {

  if (_.isPlainObject(constructor)) {
    newPrototype = constructor;
    constructor = null;
  }

  var _super = constructor ? constructor.prototype : this.prototype;

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
          // Save old super
          var oldSuper = this.super;

          // set new super
          this.super = _super[name];

          // call function
          var res = fn.apply(this, arguments);

          // set old super back
          this.super = oldSuper;

          return res;
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