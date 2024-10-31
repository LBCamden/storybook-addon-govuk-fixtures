/** Add-on options passed into hooks in preset.ts by Storybook */
export interface Opts {
  /**  */
  fixtures: FixtureOpts[]
  additionalTemplatePaths?: string[]
}

export interface FixtureOpts {
  storyNamespace: string,
  searchPath: string,
  type?: "json" | "yaml",
  nunjucksPrefix?: string
}


export interface FixtureSpec {
  name: string
  data: Record<string, unknown>
}

export interface ComponentSpec {
  name: string
  params: Record<string, unknown>
  examples: FixtureSpec[]
}