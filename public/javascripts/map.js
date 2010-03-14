var Map = Class.extend({
  init: function(terrain_map){
    var self = this;
    self.div = $('#map');
    self.terrain_matrix = new Matrix(terrain_map);
    self.rows = self.terrain_matrix.rows();
    self.cols = self.terrain_matrix.cols();

    var cell_types = ['map', 'underlay', 'item', 'enemy', 'player', 'stat', 'overlay'];

    self.cell_types = cell_types;

    for(var i=0; i < cell_types.length; i++)
      self[cell_types[i] + '_matrix' ] = Matrix.new_filled_matrix(self.rows, self.cols);

    self.terrain_matrix.each(function(x, y){
      self.add_cell(x, y);
    });    
  },
  add_cell: function(x, y){
    var self = this;
    var terrain_type = self.terrain_matrix.e(x, y);
    
    var map_cell = self.cell_from_template(x, y, 'map');
    
    // underlay (underlay) (filter) e.g. moveable
    var underlay_cell = self.cell_from_template(x, y, 'underlay');
    underlay_cell.appendTo(map_cell);
    
    // item layer
    var item_cell = self.cell_from_template(x, y, 'item');
    item_cell.appendTo(underlay_cell);
    
    // enemy layer
    var enemy_cell = self.cell_from_template(x, y, 'enemy');
    enemy_cell.appendTo(item_cell);
    
    // player layer
    var player_cell = self.cell_from_template(x, y, 'player');
    player_cell.appendTo(enemy_cell);
    
    // overlay filter e.g. attack range, status effects
    var overlay_cell = self.cell_from_template(x, y, 'overlay');
    overlay_cell.appendTo(player_cell);
    
    // stat layer e.g. hit points
    var stat_cell = self.cell_from_template(x, y, 'stat');
    stat_cell.appendTo(overlay_cell);
    
    map_cell.appendTo(self.div);
  },
  cell: function(x, y){
    return this.map_matrix.e(x, y);
  },
  player_cell: function(x, y){
    return this.player_matrix.e(x, y);
  },
  underlay_cell: function(x, y){
    return this.underlay_matrix.e(x, y);
  },
  overlay_cell: function(x, y){
    return this.overlay_matrix.e(x, y);
  },
  item_cell: function(x, y){
    return this.item_matrix.e(x, y);
  },
  enemy_cell: function(x, y){
    return this.enemy_matrix.e(x, y);
  },
  stat_cell: function(x, y){
    return this.stat_matrix.e(x, y);
  },
  cell_from_template: function(x, y, type){
    var cell_id = 'cell_' + x + '_' + y;
    var template = $("<span class='cell'></span>");
    
    var cell = template.clone();
    cell.addClass(type);
    cell.attr('id', type + '_' + cell_id);
    this[type + '_matrix'].set(x, y, cell);
    return cell;
  },
  remove_clickables: function( types ){ // array of types to remove
    if ( !types )
      types = ['attackable pointer moveable healable passable impassable'];
    
    this.div
      .find('.underlay.attackable, .underlay.moveable, .underlay.healable, .underlay.passable, .underlay.impassable')
      .removeClass(types.join(' '))
      .unbind('click');
  },
  find_by_position: function(type, x, y){
    var chars = []; 
    
    if( type == 'player' )
      chars = level.players;
    else
      chars = level.enemies;
    
    for (var i = chars.length - 1; i >= 0; i--)
      if( chars[i].x == x && chars[i].y == y )
        return chars[i];
  }  
});
