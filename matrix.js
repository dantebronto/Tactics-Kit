function Matrix(raw){
  this.raw = raw; // 2d array
}

Matrix.new_zero_matrix = function(rows, cols){
  var row, cc;
  var ara = [];
  
  for(rows; rows > 0; rows--){
    row = new Array(cols);
    for(cc=0; cc < cols; cc++)
      row[cc] = 0;
    ara.push(row);
  }
  return new Matrix(ara);
}

Matrix.prototype = {
  e: function(x, y){
    if( this.raw[y]) //&& typeof(this.raw[y][x]) == "number"
      return this.raw[y][x];
  },
  set: function(x, y, value){
    return this.raw[y][x] = value;
  },
  rows: function(){
    return this.raw.length;
  },
  cols: function(){
    return this.raw[0].length;
  },
  row: function(index){
    return this.raw[index];
  },
  col: function(index){
    var col = [];
    for(var i=0; i < this.rows(); i++)
      col.push(this.raw[i][index]);
    return col;
  },
  debug: function(){        
    for(var i=0; i < this.rows(); i++)
      console.log(this.raw[i]);
  },
  each: function(func){
    for(var y=0; y < this.rows(); y++)
      for(var x=0; x < this.cols(); x++)
        func.call(this, x, y);
  }
}