import { ColourWheel } from "../colour_wheel"
import { Colour } from "../colour"
import { Vector2 } from "../vector2"

function random(): number {
  return (Math.random() - 0.5) * 2
}

describe("colourFromAngle()", () => {
  it("returns expected colours from angle", () => {
    const wheel = new ColourWheel(50)

    const tests: [number, Colour][] = [
      [0, new Colour(255, 0, 0)],
      [1, new Colour(255, 127, 0)],
      [2, new Colour(255, 255, 0)],
      [3, new Colour(127, 255, 0)],
      [4, new Colour(0, 255, 0)],
      [5, new Colour(0, 255, 127)],
      [6, new Colour(0, 255, 255)],
      [7, new Colour(0, 127, 255)],
      [8, new Colour(0, 0, 255)],
      [9, new Colour(127, 0, 255)],
      [10, new Colour(255, 0, 255)],
      [11, new Colour(255, 0, 127)],
    ]

    tests.forEach(([fraction, colour]) => {
      const angle = (2 * Math.PI / 12) * fraction
      expect(wheel.colourFromAngle(angle)).toStrictEqual(colour)
    })
  })
})

describe("colourFromPoint()", () => {
  it("returns expected colours from vector", () => {
    const wheel = new ColourWheel(50)

    const tests: [Vector2, Colour][] = [
      [new Vector2(100, 50), new Colour(255, 0, 0)],
      [new Vector2(50, 0), new Colour(127, 0, 255)],
      [new Vector2(50, 100), new Colour(127, 255, 0)],
      [new Vector2(0, 50), new Colour(0, 255, 255)],
    ]

    tests.forEach(([vector, colour]) => {
      expect(wheel.colourFromPoint(vector)).toStrictEqual(colour)
    })
  })

  it("returns null if the point is outside the wheel", () => {
    const wheel = new ColourWheel(50)
    expect(wheel.colourFromPoint(new Vector2(0, 0))).toBe(null)
  })
})

describe("colourValueFromAngle()", () => {
  it("returns 255 when angle matches or is within 1.047 radians", () => {
    const wheel = new ColourWheel(50)
    const angles = [wheel.redAngle, wheel.greenAngle, wheel.blueAngle]

    angles.forEach((angle) => {
      for (let i = 0; i < 20; i++) {
        const offsetAngle = angle + random() * (Math.PI / 3)
        const value = wheel.colourValueFromAngle(offsetAngle, angle)
        expect(value).toBe(255)
      }
    })
  })
})
