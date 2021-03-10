import { Vector2, Colour } from "."

export class ColourWheel {
  redAngle: number = 0
  greenAngle: number = 0.6666666666666666 * Math.PI
  blueAngle: number = 1.3333333333333333 * Math.PI
  radius: number

  constructor(radius: number) {
    this.radius = radius
  }

  colourFromPoint(vector: Vector2): Colour | null {
    const center = new Vector2(this.radius, this.radius)
    const distance = vector.distance(center)

    if (distance <= this.radius) {
      const angle = center.direction(vector).angle()
      const colour = this.colourFromAngle(angle)
      const oppositeColour = this.colourFromAngle(angle + Math.PI)
      oppositeColour.scale(1 - distance / this.radius)
      return colour.add(oppositeColour)
    } else {
      return null
    }
  }

  colourFromAngle(angle: number): Colour {
    return new Colour(
      this.colourValueFromAngle(angle, this.redAngle),
      this.colourValueFromAngle(angle, this.greenAngle),
      this.colourValueFromAngle(angle, this.blueAngle),
    )
  }

  colourValueFromAngle(angle: number, colourAngle: number): number {
    const diff = Math.abs(this.angleDiff(angle, colourAngle))
    const range = Math.PI / 3

    if (diff < range) {
      return 255
    } else if (diff < range * 2) {
      return Math.round(255 * (1 - ((diff - range) / range)))
    } else {
      return 0
    }
  }

  angleDiff(a: number, b: number) {
    return (a - b + Math.PI) % (2 * Math.PI) - Math.PI
  }
}
