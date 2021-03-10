import * as m from "mithril"
import { ColourWheel, Vector2 } from "../lib"

const size = 500

export const ColourWheelScreen: m.Component = {
  oncreate: ({ dom }) => {
    const wheel = new ColourWheel(size / 2)
    draw(dom.childNodes[1] as HTMLCanvasElement, wheel)
  },

  view: () => {
    return m(".p-3", [
      m("h1", "Colour Wheel"),
      m("canvas", { width: size, height: size }),
    ])
  },
}

function draw(canvas: HTMLCanvasElement, wheel: ColourWheel) {
  const context = canvas.getContext("2d")

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const colour = wheel.colourFromPoint(new Vector2(x, y))

      if (colour) {
        context.fillStyle = colour.css()
        context.fillRect(x, y, 1, 1)
      }
    }
  }
}
