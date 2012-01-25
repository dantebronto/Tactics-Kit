class Level.Map
  constructor: (opts={}) ->
    @width = opts.width or 410
    @height = opts.height or 816
    @terrainMatrix = new Level.Matrix opts.terrain
    
    throw "Error: You must provide a terrain matrix" unless @terrainMatrix
    
    @rowCount = @terrainMatrix.rowCount
    @colCount = @terrainMatrix.colCount
    
    @backgroundImage = opts.backgroundImage or '/images/test-map.jpg'
    @cellTemplate = opts.cellTemplate or $ '<span class="cell"></span>'
    @cellTypes = opts.cellTypes or ['map', 'underlay', 'item', 'enemy', 'player', 'stat', 'overlay']
    
    $ =>
      @elem = $ opts.selector or '#map'
      @setStyles()
      @createCells()
  
  setStyles: ->
    @elem
      .css('height', "#{@height}px")
      .css('width', "#{@width}px")
      .css('background-image', "url(#{@backgroundImage})")
  
  createCells: ->
    for cellType in @cellTypes
      @["#{cellType}Matrix"] = Level.Matrix.newFilledMatrix(@rowCount, @colCount)
    
    mapCells = []
    @terrainMatrix.each (x, y) => mapCells.push @addCells(x, y)
    elemDiv = $ '<div></div>'
    cell.appendTo elemDiv for cell in mapCells
    $(elemDiv.html()).appendTo @elem
    
  
  addCells: (x, y) ->
    terrainType = @terrainMatrix.get(x, y)
    mapCell = null
    lastCell = null
    
    for type in @cellTypes
      cell = @cellFromTemplate(x, y, type)
      mapCell = cell if type == @cellTypes[0]
      cell.appendTo lastCell if lastCell
      lastCell = cell
    
    mapCell
  
  cellFromTemplate: (x, y, type) ->
    cell = @cellTemplate.clone()
    cell.addClass(type)
    cell.attr('id', "#{type}-cell-#{x}-#{y}")
    @["#{type}Matrix"].set(x, y, cell)
    cell
    
# `var Map = Class.extend({

#   cell: function(x, y){
#     return this.map_matrix.e(x, y);
#   },
#   player_cell: function(x, y){
#     return this.player_matrix.e(x, y);
#   },
#   underlay_cell: function(x, y){
#     return this.underlay_matrix.e(x, y);
#   },
#   overlay_cell: function(x, y){
#     return this.overlay_matrix.e(x, y);
#   },
#   item_cell: function(x, y){
#     return this.item_matrix.e(x, y);
#   },
#   enemy_cell: function(x, y){
#     return this.enemy_matrix.e(x, y);
#   },
#   stat_cell: function(x, y){
#     return this.stat_matrix.e(x, y);
#   },
#   remove_clickables: function( types ){ // array of types to remove
#     if ( !types )
#       types = ['attackable pointer moveable healable passable impassable'];
#     
#     this.div
#       .find('.underlay.attackable, .underlay.moveable, .underlay.healable, .underlay.passable, .underlay.impassable')
#       .removeClass(types.join(' '))
#       .unbind('click');
#   },
#   find_by_position: function(type, x, y){
#     var chars = []; 
#     
#     if( type == 'player' )
#       chars = level.players;
#     else
#       chars = level.enemies;
#     
#     for (var i = chars.length - 1; i >= 0; i--)
#       if( chars[i].x == x && chars[i].y == y )
#         return chars[i];
#   }  
# });
# `