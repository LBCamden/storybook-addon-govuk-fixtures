export interface Opts {
  fixtures: FixtureOpts[]
  additionalTemplatePaths?: string[]
}

export interface FixtureOpts { prefix: string, searchPath: string, type?: "json" | "yaml" }