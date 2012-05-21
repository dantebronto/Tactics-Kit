class Level.Map
  constructor: (opts={}) ->
    @width = opts.width or 410
    @height = opts.height or 816
    @terrainMatrix = new Level.Matrix opts.terrain
    
    throw "Error: You must provide a terrain matrix" unless @terrainMatrix
    
    @rowCount = @terrainMatrix.rowCount
    @colCount = @terrainMatrix.colCount
    
    @backgroundImage = opts.backgroundImage or '/images/test-map.jpg'
    @cellTemplate = $(opts.cellTemplate or '<span class="cell"></span>')
    @cellTypes = opts.cellTypes or ['map', 'underlay', 'item', 'enemy', 'player', 'stat', 'overlay']
    
    $ =>
      @info = $ opts.infoSelector or '#info'
      @elem = $ opts.selector or '#map'
      @setStyles()
      @createCells()
      @bindClicked()
  
  setStyles: ->
    @elem
      .hide()
      .css(
        height: "#{@height}px"
        width: "#{@width}px"
        backgroundImage: "url(#{@backgroundImage})"
      ).fadeIn('slow')
    @info.css('height', "#{@height}px")
  
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
      if type == @cellTypes[0]
        mapCell = cell
      else 
        cell.appendTo lastCell
      
      lastCell = cell
    mapCell
  
  cellFromTemplate: (x, y, type) ->
    clone = @cellTemplate.clone()
    clone
     .addClass(type)
     .attr 'id', "#{type}-cell-#{x}-#{y}"
  
  add: (obj) ->
    obj.show() if obj.show
    obj.addedToLevel() if obj.addedToLevel
  
  getElem: (obj) ->
    if obj.isTypeOf 'Player'
      return @playerMatrix.get(obj.x, obj.y)
    else if obj.isTypeOf 'Enemy'
      return @enemyMatrix.get(obj.x, obj.y)
  
  occupiedAt: (x, y) ->
    @playerMatrix.get(x, y)?.hasClass('occupied') or
    @enemyMatrix.get(x, y)?.hasClass('occupied')
  
  canMoveTo: (x, y) -> @canWalkOn(x, y) and not @occupiedAt(x, y)
  canWalkOn: (x, y) -> @terrainMatrix.get(x, y) <= 10
  canAttack: (x, y) -> @occupiedAt(x, y)
  
  showCellAs: (type, x, y) -> @underlayMatrix.get(x, y).addClass type
  hideCellAs: (type, x, y) -> @underlayMatrix.get(x, y).removeClass type
  hideCellAs: (type, x, y) -> @underlayMatrix.get(x, y).removeClass type
  
  clear: (x, y) -> 
    classes = 'passable impassable movable attackable healable'
    if x and y
      @underlayMatrix.get(x, y).removeClass classes
    else
      @underlayMatrix.each (x, y, elem) -> elem?.removeClass classes
  
  bindClicked: -> @elem.bind 'click', (e) => @handleMapClicked(e)
  
  handleMapClicked: (e) ->
    return if level.anim.length > 0
    [x, y] = $(e.target).getMatrixCoords()
    
    underlayCell = @underlayMatrix.get(x, y)
    classes = _(underlayCell.attr('class').split(' '))
    
    if classes.include('impassable') or classes.include('passable') and !classes.include('attackable') 
      @clear()
      if char = Character.findByPosition(x, y)
        if char.isTypeOf 'Enemy'
          char.centerMapOnMe()
        else
          char.characterSelected(true)
      return
    
    if classes.include('attackable') and @canAttack(x, y)
      console.log level.activeCharacter
      level.activeCharacter?.attack(x, y)
    
    if @playerMatrix.get(x, y).hasClass('occupied') and not classes.include('attackable')
      Character.findByPosition(x, y)?.characterSelected()
    
    level.activeCharacter?.moveTo(x, y) if classes.include('movable')
    