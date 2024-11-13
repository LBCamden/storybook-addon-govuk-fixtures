import { Opts } from './types'

export * from './types'

/**
 * Helper to provide intellisense types for configuring storybook-addon-govuk-fixtures.
 */
export default function govukStorybook(options: Opts) {
  return {
    name: "storybook-addon-govuk-fixtures",
    options
  }
}
