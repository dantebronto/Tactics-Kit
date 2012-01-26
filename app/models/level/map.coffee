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
      .hide()
      .css('height', "#{@height}px")
      .css('width', "#{@width}px")
      .css('background-image', "url(#{@backgroundImage})")
      .fadeIn('slow')
  
  createCells: ->
    for cellType in @cellTypes
      @["#{cellType}Matrix"] = Level.Matrix.newFilledMatrix(@rowCount, @colCount)
    
    mapCells = []
    @terrainMatrix.each (x, y) => mapCells.push @calculateCells(x, y)
    cell.appendTo @elem for cell in mapCells
  
  calculateCells: (x, y) ->
    terrainType = @terrainMatrix.get(x, y)
    mapCell = null
    lastCell = null
    
    for type in @cellTypes
      cell = @cellFromTemplate(x, y, type)
      @["#{type}Matrix"].set x, y, cell
      if type == @cellTypes[0] then mapCell = cell else cell.appendTo lastCell
      lastCell = cell
    mapCell
  
  cellFromTemplate: (x, y, type) ->
    @cellTemplate
     .clone()
     .addClass(type)
     .attr 'id', "#{type}-cell-#{x}-#{y}"
  
  add: (obj) ->
    @getElem(obj)
      .addClass('pointer occupied')
      .css('background', "url(#{obj.sprite}) no-repeat center")
  
  getElem: (obj) ->
    if obj.constructor == Player 
      @playerMatrix.get(obj.x, obj.y)
        
# `var Map = Class.extend({
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