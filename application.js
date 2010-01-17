function copy_prototype(descendant, parent) {
  var sConstructor = parent.toString();
  var aMatch = sConstructor.match( /\s*function (.*)\(/ );
  if ( aMatch != null ) { descendant.prototype[aMatch[1]] = parent; }
  for (var m in parent.prototype) {
    descendant.prototype[m] = parent.prototype[m];
  }
};

$(document).ready(function(){
  window['level'] = new Level();
});