const RVO = require('../index.js')
const Simulator = RVO.Simulator
const Vector2 = RVO.Vector2
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
  new RVO.Vector2(2, 2) // default velocity
)

for (let i = 0; i < 10; i++) {
  const angle = i * (2 * Math.PI) / 9
  const x = Math.cos(angle) * 200
  const y = Math.sin(angle) * 200
  simulator.addAgent(new Vector2 (x, y))
}

let goals = []
for (let i = 0; i < simulator.getNumAgents (); ++i) {
  goals.push(simulator.getAgentPosition(i).scale(-1))
}
simulator.addGoals(goals)

let vertices = []
simulator.addObstacle(vertices)
simulator.processObstacles()

// console.log(simulator)

let interval
const step = () => {

  for (let i = 0; i < simulator.getNumAgents (); ++i) {
    if (RVOMath.absSq(simulator.getGoal(i).minus(simulator.getAgentPosition(i))) < RVOMath.RVO_EPSILON) {
      // Agent is within one radius of its goal, set preferred velocity to zero
      simulator.setAgentPrefVelocity (i, new Vector2 (0.0, 0.0))
      console.log('finish ' + i)
    } else {
      // Agent is far away from its goal, set preferred velocity as unit vector towards agent's goal.
      simulator.setAgentPrefVelocity(i, RVOMath.normalize (simulator.getGoal(i).minus(simulator.getAgentPosition(i))))
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
