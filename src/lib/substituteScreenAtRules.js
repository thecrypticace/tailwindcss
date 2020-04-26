import _ from 'lodash'
import buildMediaQuery from '../util/buildMediaQuery'

export default function({ theme }) {
  return function(css) {
    css.walkAtRules('screen', atRule => {
      const screens = atRule.params.split(/\s*,\s*/g)

      screens.forEach(screen => {
        if (!_.has(theme.screens, screen)) {
          throw atRule.error(`No \`${screen}\` screen found.`)
        }

        const rule = atRule.cloneBefore()
        rule.name = 'media'
        rule.params = buildMediaQuery(theme.screens[screen])
      })

      atRule.remove()
    })
  }
}
