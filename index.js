const Simulator = require('./src/Simulator')
const Agent = require('./src/Agent')
const KdTree = require('./src/KdTree')
const Vector2 = require('./src/Vector2')
const RVOMath = require('./src/RVOMath')

const RVO = {
  Simulator: Simulator,
  Agent: Agent,
  KdTree: KdTree,
  Vector2: Vector2,
  RVOMath: RVOMath,
}

module.exports = RVO