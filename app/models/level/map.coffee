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
      .css('height', "#{@height}px")
      .css('width', "#{@width}px")
      .css('background-image', "url(#{@backgroundImage})")
      .show()
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
      if type == @cellTypes[0] then mapCell = cell else cell.appendTo lastCell
      lastCell = cell
    mapCell
  
  cellFromTemplate: (x, y, type) ->
    clone = $(@cellTemplate[0].cloneNode(true))
    clone
     .addClass(type)
     .attr 'id', "#{type}-cell-#{x}-#{y}"
  
  add: (obj) ->
    if obj.constructor == Player
      obj.show()
      obj.addedToLevel()
  
  remove: (obj) ->
    if obj.constructor == Player
      obj.hide()
  
  getElem: (obj) ->
    if obj.constructor == Player
      @playerMatrix.get(obj.x, obj.y)
  
  occupiedAt: (x, y) ->
    @playerMatrix.get(x, y).hasClass('occupied') or
    @enemyMatrix.get(x, y).hasClass('occupied')
  
  canMoveTo: (x, y) -> @canWalkOn(x, y) and not @occupiedAt(x, y)
  canWalkOn: (x, y) -> @terrainMatrix.get(x, y) <= 10
  
  showCellAs: (type, x, y) ->
    if type == 'moveable'
      @playerMatrix.get(x,y).addClass type
    if type == 'passable' or type == 'impassable'
      @underlayMatrix.get(x, y).addClass type
  
  hideCellAs: (type, x, y) ->
    if type == 'moveable'
      @playerMatrix.get(x,y).removeClass type
    if type == 'passable' or type == 'impassable'
      @underlayMatrix.get(x, y).removeClass type
  
  clear: ->
    @underlayMatrix.each -> @removeClass 'passable impassable'
    @playerMatrix.each -> @removeClass 'moveable'
  
  bindClicked: -> @elem.bind 'click', (e) => @handleMapClicked(e)
  
  getCellClasses: (x, y) ->
    classes = []
    classes.push 'passable' if @underlayMatrix.get(x, y).hasClass('passable')
    classes.push 'impassable' if @underlayMatrix.get(x, y).hasClass('impassable')
    classes.push 'moveable' if @playerMatrix.get(x, y).hasClass('moveable')
    classes
  
  handleMapClicked: (e) ->
    overlayInfo = e.target.id.split("-")
    x = Number(overlayInfo[2])
    y = Number(overlayInfo[3])
    
    classes = @getCellClasses(x, y)
    if _(classes).include('impassable') or _(classes).include('passable')
      @clear()
      return
    if _(classes).include('moveable')
      level.activePlayer?.moveTo(x, y)
    