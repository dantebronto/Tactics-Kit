/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/templates.coffee
 */

(function() {
  var Templates;

  Templates = (function() {

    function Templates() {
      var _this = this;
      $(function() {
        return _this.characterInfo = _.template($('#character-info-template').html());
      });
    }

    return Templates;

  })();

  window.TMPL = new Templates();

}).call(this);
