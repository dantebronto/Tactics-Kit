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
  // res = astar.search(level.map.terrain_matrix, { x:0, y:0 }, { x:6, y:7 });
  // $.each(res, function(){
  //   $('#map_cell_' + this.x + '_' + this.y).addClass('moveable');
  // })
});