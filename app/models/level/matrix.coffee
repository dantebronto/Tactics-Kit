class Level.Matrix
  
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
  
  get: (x=0, y=0) -> @raw[y][x] if @raw[x]? && @raw[y][x]?
  set: (x=0, y=0, value=0) -> @raw[y][x] = value
  
  debug: -> console.log(@raw[i]) for i in [0..@rowCount-1]
  
  row: (index=0) -> @raw[index]
  
  col: (index=0) -> 
    col = []
    col.push(@raw[i][index]) for i in [0..@rowCount-1]
    col
  
  each: (fn) ->
    for y in [0..@rowCount-1]
      for x in [0..@colCount-1]
        fn.call(@get(x,y), x, y)