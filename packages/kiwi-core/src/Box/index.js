import { css } from 'emotion'
import __css from '@styled-system/css'
import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import { baseProps, propsConfig } from '../config/props'
import { forwardProps } from '../utils/'

const baseEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

/**
 * @description Truncates text if `truncate` is set to true.
 * @param {Object} props Props
 */
const truncate = props => {
  if (props.truncate) {
    if (!props.lineClamp) {
      return baseEllipsis
    }
  }
}

/**
 * @description Clamps text based on number of lines.
 * @param {Object} props Props
 */
const clamp = props => {
  if (props.lineClamp) {
    return {
      ...baseEllipsis,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${props.lineClamp}`
    }
  }
}

const decorate = props => {
  if (props.textDecoration || props.textDecor) {
    return {
      'text-decoration': `${props.textDecoration || props.textDecor}`
    }
  }
}

const system = compose(
  layout,
  color,
  space,
  background,
  border,
  borderRadius,
  grid,
  position,
  shadow,
  decorate,
  typography,
  flexbox,
  propsConfig,
  truncate,
  clamp
)

const Box = {
  name: 'Box',
  inject: ['$theme'],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    ...baseProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const cleanedStyleProps = forwardProps(this.$props)
    // Something creepy is going on here.
    // But somehow it works. LOL
    const boxStylesObject = __css(system(__css(cleanedStyleProps)(this.theme)))(this.theme)
    const className = css(boxStylesObject)
    return h(this.as, {
      class: [className]
    }, this.$slots.default)
  }
}

export default Box
