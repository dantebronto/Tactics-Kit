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
    # @elem.css('height', '100px')
  
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
    clone = $(@cellTemplate[0].cloneNode(true))
    clone
     .addClass(type)
     .attr 'id', "#{type}-cell-#{x}-#{y}"
  
  add: (obj) ->
    obj.show() if obj.show
    obj.addedToLevel() if obj.addedToLevel
  
  getElem: (obj) ->
    if obj.constructor == Player
      return @playerMatrix.get(obj.x, obj.y)
    if obj.constructor == Enemy
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
    classes = 'passable impassable moveable attackable'
    if x and y
      @underlayMatrix.get(x, y).removeClass classes
    else
      @underlayMatrix.each -> @removeClass classes
  
  bindClicked: -> @elem.bind 'click', (e) => @handleMapClicked(e)
  
  handleMapClicked: (e) ->
    target = $(e.target)
    id = if target.attr('id') then target.attr('id') else target.parent().attr('id')
    overlayInfo = id.split("-")
    x = Number(overlayInfo[2])
    y = Number(overlayInfo[3])
    
    underlayCell = @underlayMatrix.get(x, y)
    classes = _(underlayCell.attr('class').split(' '))
    
    if classes.include('impassable') or classes.include('passable')
      @clear()
      return
    
    level.activePlayer?.attack(x, y) if classes.include('attackable')
    
    if @playerMatrix.get(x, y).hasClass('occupied')
      char = Character.findByPosition(x, y)
      char.characterSelected() unless classes.include('attackable')
    
    level.activePlayer?.moveTo(x, y) if classes.include('moveable')
    