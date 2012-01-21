describe "Level", ->
  
  it "should be global", -> expect(window.Level).toEqual(Level)
  it "should have a matrix implementation", -> expect(Level.Matrix).toBeDefined()
  it "should have a map implementation", -> expect(Level.Map).toBeDefined()
  
  
  # // spyOn(song, 'persistFavoriteStatus');
  # // 
  # // player.play(song);
  # // player.makeFavorite();
  # // 
  # // expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  # // 

  it "should accept a map on init", ->
    l = new Level
      map: [  [ 15, 15, ], [ 15, 15, ] ]
      
    expect(l.map).toBeDefined()

