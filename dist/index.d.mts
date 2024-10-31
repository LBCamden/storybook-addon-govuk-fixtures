/** Add-on options provided when setting up addon */
interface Opts {
    /**  */
    fixtures: FixtureOpts[];
    additionalTemplatePaths?: string[];
    fullPageExamples: FullPageExample[];
}
interface FixtureOpts {
    storyNamespace: string;
    searchPath: string;
    type?: "json" | "yaml";
    nunjucksPrefix?: string;
}
interface FullPageExample {
    storyNamespace: string;
    searchPath: string;
}
interface FixtureSpec {
    name: string;
    data: Record<string, unknown>;
    hidden?: boolean;
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

export { type ComponentSpec, type FixtureOpts, type FixtureSpec, type FullPageExample, type Opts, govukStorybook as default };
