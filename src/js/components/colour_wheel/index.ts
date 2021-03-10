import * as m from "mithril"
import { draw } from "./canvas"

interface Attrs {
  width: number
  height: number
}

export const ColourWheel: m.Component<Attrs> = {
  oncreate: ({ state, dom }) => {
    draw(dom as HTMLCanvasElement)
  },

  view: ({ attrs: { width, height } }) => {
    return m("canvas", { width, height })
  },
}
