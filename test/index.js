const RVO = require('../index.js')
const Simulator = RVO.Simulator
const RVOMath = RVO.RVOMath

const simulator = new Simulator()

simulator.setTimeStep(0.25)
simulator.setAgentDefaults(
  200, // neighbor distance (min = radius * radius)
  30, // max neighbors
  600, // time horizon
  600, // time horizon obstacles
  5, // agent radius
  10.0, // max speed
  2, // default velocity for x
  2, // default velocity for y
)

for (let i = 0; i < 10; i++) {
  const angle = i * (2 * Math.PI) / 9
  const x = Math.cos(angle) * 200
  const y = Math.sin(angle) * 200
  simulator.addAgent()
  simulator.setAgentPosition(i, x, y)
}

for (let i = 0; i < simulator.getNumAgents(); i++) {
  let goal = simulator.getAgentPosition(i).scale(-1)
  simulator.setAgentGoal(i, goal.x, goal.y)
}

let vertices = []
simulator.addObstacle(vertices)
simulator.processObstacles()

// console.log(simulator)

let interval
const step = () => {

  for (let i = 0; i < simulator.getNumAgents (); ++i) {
    if (RVOMath.absSq(simulator.getGoal(i).minus(simulator.getAgentPosition(i))) < RVOMath.RVO_EPSILON) {
      // Agent is within one radius of its goal, set preferred velocity to zero
      simulator.setAgentPrefVelocity(i, 0.0, 0.0)
      console.log('finish ' + i)
    } else {
      // Agent is far away from its goal, set preferred velocity as unit vector towards agent's goal.
      let v = RVOMath.normalize(simulator.getGoal(i).minus(simulator.getAgentPosition(i)))
      simulator.setAgentPrefVelocity(i, v.x, v.y)
    }
  }

  simulator.run()

  // console.log(simulator)
  if (simulator.reachedGoal()) {
    clearInterval(interval)
    console.log('finish')
  }
}

interval = setInterval(step, 10)
