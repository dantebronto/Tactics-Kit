/* DO NOT MODIFY. This file was compiled Sat, 21 Jan 2012 19:46:36 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/main.coffee
 */

(function() {

  $.fn.shake = function(intShakes, intDistance, intDuration) {
    this.each(function() {
      var elem, x, _i, _len, _results;
      elem = $(this);
      elem.css({
        position: 'relative'
      });
      _results = [];
      for (_i = 0, _len = intShakes.length; _i < _len; _i++) {
        x = intShakes[_i];
        _results.push(elem.animate({
          left: intDistance * -1
        }, (intDuration / intShakes) / 4).animate({
          left: intDistance
        }, (intDuration / intShakes) / 2).animate({
          left: 0
        }, (intDuration / intShakes) / 4));
      }
      return _results;
    });
    return this;
  };

  (function() {})();

  
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();;

}).call(this);
