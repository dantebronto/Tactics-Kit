describe("Level", function() {
  
  it("should be global", function() {
    expect(window.Level).toEqual(Level)
  })

  it("should have a matrix implementation", function(){
    expect(Level.Matrix).toBeDefined()
  })
  
  it("should have a map implementation", function(){
    expect(Level.Map).toBeDefined()
  })
  
  // beforeEach(function() {
  //   l = new Level()
  // })
  
  // spyOn(song, 'persistFavoriteStatus');
  // 
  // player.play(song);
  // player.makeFavorite();
  // 
  // expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // 

})