import { Vector2 } from "../vector2"

function randomValue(): number {
  return (0.5 - Math.random()) * 20
}

describe("contructor()", () => {
  it("sets x and y", () => {
    const vector = new Vector2(1, 2)
    expect(vector.x).toBe(1)
    expect(vector.y).toBe(2)
  })

  it("defaults x and y to 0", () => {
    const vector = new Vector2()
    expect(vector.x).toBe(0)
    expect(vector.y).toBe(0)
  })
})

describe("direction()", () => {
  it("returns a normalised vector in the direction of another vector", () => {
    const origin = new Vector2(0, 0)

    const tests: [Vector2, number, number][] = [
      [new Vector2(0, 5), 0, 1],
      [new Vector2(1, 1), 0.5, 0.5],
      [new Vector2(-2, 8), -0.2, 0.8],
    ]

    tests.forEach(([target, x, y]) => {
      const direction = origin.direction(target)
      expect(direction.x).toBe(x)
      expect(direction.y).toBe(y)
    })
  })

  it("always has a magnitude of 1", () => {
    for (let i = 0; i < 100; i++) {
      const origin = new Vector2(randomValue(), randomValue())
      const target = new Vector2(randomValue(), randomValue())
      const magnitude = origin.direction(target).magnitude()
      expect(magnitude).toBeGreaterThanOrEqual(0.9999999999999998)
      expect(magnitude).toBeLessThanOrEqual(1.0000000000000002)
    }
  })

  it("returns a vector of (0, 0) when vectors are the same", () => {
    const origin = new Vector2(1, 2)
    const target = new Vector2(1, 2)
    const direction = origin.direction(target)
    expect(direction.x).toBe(0)
    expect(direction.y).toBe(0)
  })
})

describe("angle()", () => {
  it("gets the radians of a directional vector", () => {
    expect(new Vector2(1, 0).angle()).toBe(0)
    expect(new Vector2(1, 1).angle()).toBe(0.25 * Math.PI)
    expect(new Vector2(0, 1).angle()).toBe(0.5 * Math.PI)
    expect(new Vector2(-1, 1).angle()).toBe(0.75 * Math.PI)
    expect(new Vector2(-1, 0).angle()).toBe(1 * Math.PI)
    expect(new Vector2(-1, -1).angle()).toBe(1.25 * Math.PI)
    expect(new Vector2(0, -1).angle()).toBe(1.5 * Math.PI)
    expect(new Vector2(1, -1).angle()).toBe(1.75 * Math.PI)
  })

  it("returns 0 when the vector x and y is 0", () => {
    expect(new Vector2(0, 0).angle()).toBe(0)
  })
})

describe("distance()", () => {
  it("calculates the distance between two vectors", () => {
    const tests: [Vector2, Vector2, number][] = [
      [new Vector2(0, 0), new Vector2(0, 0), 0],
      [new Vector2(1, 1), new Vector2(1, 1), 0],
      [new Vector2(0, 0), new Vector2(0, 5), 5],
      [new Vector2(1, 3), new Vector2(5, 8), 6.4031242374328485],
      [new Vector2(-2, 5), new Vector2(6, -3), 11.313708498984761],
      [new Vector2(-1, -5), new Vector2(-3, -6), 2.23606797749979],
    ]

    tests.forEach(([a, b, distance]) => {
      expect(a.distance(b)).toBe(distance)
      expect(b.distance(a)).toBe(distance)
    })
  })
})

describe("normalise()", () => {
  it("normalises the vector", () => {
    const tests: [Vector2, Vector2][] = [
      [new Vector2(0, 0), new Vector2(0, 0)],
      [new Vector2(1, 1), new Vector2(0.5, 0.5)],
      [new Vector2(5, 15), new Vector2(0.25, 0.75)],
      [new Vector2(-3, 3), new Vector2(-0.5, 0.5)],
      [new Vector2(1, -4), new Vector2(0.2, -0.8)],
    ]

    tests.forEach(([a, b]) => {
      a.normalise()
      expect(a.x).toBe(b.x)
      expect(a.y).toBe(b.y)
    })
  })

  it("always has a magnitude of 1", () => {
    for (let i = 0; i < 100; i++) {
      const vector = new Vector2(randomValue(), randomValue())
      const magnitude = vector.normalise().magnitude()
      expect(magnitude).toBeGreaterThanOrEqual(0.9999999999999998)
      expect(magnitude).toBeLessThanOrEqual(1.0000000000000002)
    }
  })
})

describe("magnitude()", () => {
  it("calculates the magnitude of the vector", () => {
    const tests: [Vector2, number][] = [
      [new Vector2(0, 0), 0],
      [new Vector2(1, 1), 2],
      [new Vector2(-1, 1), 2],
      [new Vector2(-5, -10), 15],
      [new Vector2(4, -0.5), 4.5],
    ]

    tests.forEach(([vector, magnitude]) => {
      expect(vector.magnitude()).toBe(magnitude)
    })
  })
})
