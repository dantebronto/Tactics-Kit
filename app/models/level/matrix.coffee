class Level.Matrix
  
  $.fn.getMatrixCoords = ->
    id = if @attr('id') then @attr('id') else @parent().attr('id')
    [z,z,x,y] = id.split("-")
    [Number(x), Number(y)]
  
  @distance: (p1, p2, q1, q2) -> 
    t1 = Math.pow((p1-q1), 2)
    t2 = Math.pow((p2-q2), 2)
    console.log t1,t2
    Math.sqrt(t1 + t2)
  
  @newFilledMatrix: (rowCount=0, colCount=0, value=0) ->
    ara = []
    for x in [0..rowCount-1]
      row = new Array(colCount)
      for y in [0..colCount-1]
        row[y] = value
      ara.push(row)
    new Level.Matrix(ara)
  
  constructor: (@raw) -> # @raw is a 2D array
    @rowCount = @raw.length
    @colCount = @raw[0].length
    @
  
  get: (x=0, y=0) -> @raw[y][x] if @raw?[y]? and @raw[y][x]
  set: (x=0, y=0, value=0) -> @raw[y][x] = value; value
  
  debug: -> console.log(@raw[i]) for i in [0..@rowCount-1]
  
  row: (index=0) -> @raw[index]
  
  col: (index=0) -> 
    col = []
    col.push(@raw[i][index]) for i in [0..@rowCount-1]
    col
  
  each: (fn) ->
    for y in [0..@rowCount-1]
      for x in [0..@colCount-1]
        elem = @get(x,y)
        fn.call(elem, x, y, elem)