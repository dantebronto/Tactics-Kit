describe "Matrix", ->

  describe "creating a new initialized array", ->
    it "should set all values of a new array to the provided value", ->
      expect(Level.Matrix.newFilledMatrix(2,3,6).raw).toEqual([[6,6,6], [6,6,6]])
      
    it "should set the correct dimensions", ->
      matrix = Level.Matrix.newFilledMatrix(1,3)
      expect(matrix.rowCount).toEqual(1)
      expect(matrix.colCount).toEqual(3)
      
    it "should default the value to zero", ->
      matrix = Level.Matrix.newFilledMatrix(1,3)
      expect(matrix.get(0,0)).toEqual(0)

  describe "when passing an array", ->
    matrix = null
    beforeEach -> 
      matrix = new Level.Matrix([[1,2], [3,4], [5,6]])
  
    it "should be in the level module", ->
      expect(Level.Matrix).toBeDefined()
  
    it "should accept a 2D array and call it raw", ->
      expect(matrix.raw[0]).toEqual([1,2])
  
    it "should allow you to get by index", ->
      expect(matrix.get(0,0)).toEqual(1)
      expect(matrix.get(1,0)).toEqual(2)
      expect(matrix.get(0,1)).toEqual(3)
      expect(matrix.get(1,1)).toEqual(4)
  
    it "should allow you to set by index", ->
      matrix.set(0,0,5)
      expect(matrix.get(0,0)).toEqual(5)
    
      matrix.set(1,1,10)
      expect(matrix.get(1,1)).toEqual(10)
    
      expect(matrix.raw).toEqual([[5,2], [3,10], [5,6]])
    
    it "should return a row count", -> expect(matrix.rowCount).toEqual(3)
    it "should return a col count", -> expect(matrix.colCount).toEqual(2)
  
    it "should return a row by index", ->
      expect(matrix.row(0)).toEqual([1,2])
      expect(matrix.row(1)).toEqual([3,4])
      expect(matrix.row(2)).toEqual([5,6])
  
    it "should default to 0 for a row index", ->
      expect(matrix.row()).toEqual([1,2])
  
    it "should return a column by index", ->
      expect(matrix.col(0)).toEqual([1,3,5])
      expect(matrix.col(1)).toEqual([2,4,6])
      
    it "should "