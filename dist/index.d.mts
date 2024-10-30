interface Opts {
    fixtures: FixtureOpts[];
    additionalTemplatePaths?: string[];
}
interface FixtureOpts {
    prefix: string;
    searchPath: string;
    type?: "json" | "yaml";
}

declare function govukStorybook(options: Opts): {
    name: string;
    options: Opts;
};

export { type FixtureOpts, type Opts, govukStorybook as default };
