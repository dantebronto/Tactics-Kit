describe "Level", ->

  it "should be global", -> expect(RPG.Level).toEqual(RPG.Level)
  it "should have a matrix implementation", -> expect(RPG.Level.Matrix).toBeDefined()
  it "should have a map implementation", -> expect(RPG.Level.Map).toBeDefined()
  
  describe "constructor", ->
    l = null
    myFunc1 = -> 'myFunc1'
    myFunc2 = -> 'myFunc2'
    
    beforeEach ->
      l = new RPG.Level
        map: 
          terrain: [  [ 15, 15, ], [ 15, 15, ] ]
        turnFunction: myFunc1
        endFunction: myFunc2
    
    it "should accept a map on init", -> expect(l.map).toBeDefined()
    it "should have a map that is of class Map", -> expect(l.map.__proto__).toEqual(RPG.Level.Map::)
    it "should allow you to set a fn to fire every turn", -> expect(l.turnFunction).toEqual(myFunc1)
    it "should allow you to set a fn to fire at the end", -> expect(l.endFunction).toEqual(myFunc2)