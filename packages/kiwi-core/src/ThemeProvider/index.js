import { colorModeObserver } from '../utils/color-mode-observer'

const ThemeProvider = {
  name: 'ThemeProvider',
  provide () {
    return {
      $theme: () => this.theme,
      $icons: this.icons
    }
  },
  computed: {
    icons () {
      return this.$kiwi ? this.$kiwi.icons : {}
    },
    theme () {
      return this.$kiwi.theme
    }
  },
  watch: {
    theme: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.theme = newVal
      }
    },
    icons: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.icons = newVal
      }
    }
  },
  render () {
    return this.$slots.default
  }
}

export default ThemeProvider
