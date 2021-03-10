export class Vector2 {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  direction(vector: Vector2): Vector2 {
    return new Vector2(vector.x - this.x, vector.y - this.y).normalise()
  }

  angle(): number {
    const angle = Math.atan2(this.y, this.x)
    return angle < 0 ? 2 * Math.PI + angle : angle
  }

  distance(vector: Vector2): number {
    return Math.hypot(vector.x - this.x, vector.y - this.y)
  }

  normalise(): Vector2 {
    const magnitude = this.magnitude()

    if (magnitude !== 0) {
      this.x *= 1 / magnitude
      this.y *= 1 / magnitude
    }

    return this
  }

  magnitude(): number {
    return Math.abs(this.x) + Math.abs(this.y)
  }
}
