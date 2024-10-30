import { Opts } from './types'

export * from './types'

export default function govukStorybook(options: Opts) {
  return {
    name: "storybook-addon-govuk-fixtures",
    options
  }
}
