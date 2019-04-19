function Vector2(x, y) {
  this.x = x
  this.y = y

  this.plus = function(vector) {
    return new Vector2(x + vector.x, y + vector.y)
  }

  this.minus = function(vector) {
    return new Vector2(x - vector.x, y - vector.y)
  }

  this.multiply = function(vector) {
    return x * vector.x + y * vector.y
  }

  this.scale = function(k) {
    return new Vector2(x * k, y * k)
  }
}

module.exports = Vector2