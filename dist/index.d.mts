/** Add-on options passed into hooks in preset.ts by Storybook */
interface Opts {
    /**  */
    fixtures: FixtureOpts[];
    additionalTemplatePaths?: string[];
}
interface FixtureOpts {
    storyNamespace: string;
    searchPath: string;
    type?: "json" | "yaml";
    nunjucksPrefix?: string;
}
interface FixtureSpec {
    name: string;
    data: Record<string, unknown>;
}
interface ComponentSpec {
    name: string;
    params: Record<string, unknown>;
    examples: FixtureSpec[];
}

declare function govukStorybook(options: Opts): {
    name: string;
    options: Opts;
};

export { type ComponentSpec, type FixtureOpts, type FixtureSpec, type Opts, govukStorybook as default };
