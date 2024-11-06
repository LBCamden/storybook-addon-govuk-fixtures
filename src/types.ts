/** Add-on options provided when setting up addon */
export interface Opts {
  /**  */
  fixtures: FixtureOpts[]
  additionalTemplatePaths?: string[]

  fullPageExamples: FullPageExample[],
}

export interface FixtureOpts {
  storyNamespace: string,
  searchPath: string,
  type?: "json" | "yaml",
  nunjucksPrefix?: string
  resolveTemplate?: (name: string) => string
}

export interface FullPageExample {
  storyNamespace: string,
  searchPath: string,
}

export interface FixtureSpec {
  name: string
  data: Record<string, unknown>
  hidden?: boolean
}

export interface ComponentSpec {
  name: string
  params: Record<string, unknown>
  examples: FixtureSpec[]
}