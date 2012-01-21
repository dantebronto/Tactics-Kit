(function() {
  describe("Level", function() {
    it("should be global", function() {
      return expect(window.Level).toEqual(Level);
    });
    it("should have a matrix implementation", function() {
      return expect(Level.Matrix).toBeDefined();
    });
    it("should have a map implementation", function() {
      return expect(Level.Map).toBeDefined();
    });
    return describe("constructor", function() {
      var l, myFunc1, myFunc2;
      l = null;
      myFunc1 = function() {
        return 'myFunc1';
      };
      myFunc2 = function() {
        return 'myFunc2';
      };
      beforeEach(function() {
        return l = new Level({
          map: {
            terrain: [[15, 15], [15, 15]]
          },
          turnFunction: myFunc1,
          endFunction: myFunc2
        });
      });
      it("should accept a map on init", function() {
        return expect(l.map).toBeDefined();
      });
      it("should have a map that is of class Map", function() {
        return expect(l.map.__proto__).toEqual(Level.Map.prototype);
      });
      it("should allow you to set a fn to fire every turn", function() {
        return expect(l.turnFunction).toEqual(myFunc1);
      });
      return it("should allow you to set a fn to fire at the end", function() {
        return expect(l.endFunction).toEqual(myFunc2);
      });
    });
  });
}).call(this);
