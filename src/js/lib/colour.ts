export class Colour {
  r: number = 0
  g: number = 0
  b: number = 0

  constructor(r: number, g: number, b: number) {
    this.r = r
    this.g = g
    this.b = b
  }

  scale(amount: number): Colour {
    this.r *= amount
    this.g *= amount
    this.b *= amount
    this.applyLimits()
    return this
  }

  lighten(amount: number): Colour {
    this.r += amount * 255
    this.g += amount * 255
    this.b += amount * 255
    this.applyLimits()
    return this
  }

  add(colour: Colour): Colour {
    this.r += colour.r
    this.g += colour.g
    this.b += colour.b
    this.applyLimits()
    return this
  }

  applyLimits(): Colour {
    this.r = Math.max(0, Math.min(255, this.r))
    this.g = Math.max(0, Math.min(255, this.g))
    this.b = Math.max(0, Math.min(255, this.b))
    return this
  }

  css(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
}
