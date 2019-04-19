
const RVOMath = {
  RVO_EPSILON: 0.01,

  absSq(v) {
    return v.multiply(v)
  },

  normalize(v) {
    return v.scale(1 / RVOMath.abs(v)) // v / abs(v)
  },

  distSqPointLineSegment(a, b, c) {
    var aux1 = c.minus(a)
    var aux2 = b.minus(a)

    // r = ((c - a) * (b - a)) / absSq(b - a)
    var r = aux1.multiply(aux2) / RVOMath.absSq(aux2)

    if (r < 0) {
      return RVOMath.absSq(aux1) // absSq(c - a)
    } else if (r > 1) {
      return RVOMath.absSq(aux2) // absSq(c - b)
    } else {
      return RVOMath.absSq(c.minus(a.plus(aux2.scale(r)))) // absSq(c - (a + r * (b - a)))
    }
  },

  sqr(p) {
    return p * p
  },

  det(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x
  },

  abs(v) {
    return Math.sqrt(RVOMath.absSq(v))
  },

  leftOf(a, b, c) {
    return RVOMath.det(a.minus(c), b.minus(a))
  },
}

module.exports = RVOMath
