/** Add-on options provided when setting up addon */
interface Opts {
    /**
     * Defines where to search for components and stories.
     *
     * You can provide multiple fixture search paths in order to customise options for fixtures under different paths.
     **/
    fixtures: FixtureOpts[];
    /**
     * Additional directories to scan for nunjucks templates.
     *
     * For example, you might want to {% include %} nunjucks templates that aren't under any of the directories defined in `fixtures`. In that case, you'd need to add directories containing the templates here.
     */
    additionalTemplatePaths?: string[];
    /**
     * Defines where to search for components and stories.
     *
     * You can provide multiple fixture search paths in order to customise options for fixtures under different paths.
     **/
    standaloneExamples: StandaloneExample[];
}
interface FixtureOpts {
    /**
     * Slash-delimited namespace that defines how stories are grouped in the sidebar.
     *
     * Eg: `components` or `components/forms` or `components/base`
     */
    storyNamespace: string;
    /**
     * Path to a directory containing nunjucks components.
     *
     * Components should have the following directory structure:
     *
     * + `{componentName}`
     *   - `template.njk`
     *   - `macro.njk`
     *   - _either_ `{componentName}.yaml` or `examples.json` and `macro-options.
     *
     */
    searchPath: string;
    /**
     * Format of the component definition and examples. We support two formats:
     *
     * ## `yaml`
     *
     * A single yaml file named `{componentName}.yaml` in the component directory. It has a `params` key defining the component parameters and and `examples` key defining component examples.
     *
     * [Example](https://github.com/LBCamden/lbcamden-frontend/blob/release-0.5.1/src/lbcamden/components/button/button.yaml)
     *
     * ## `json`
     *
     * TWO json files in the component directory, named `macro-options.json` and `fixtures.json`. macro-options should define the component parameters. fixtures should define component examples.
     *
     * Examples:
     * - [`macro-options.json`](https://github.com/LBCamden/lbcamden-frontend/blob/release-0.5.1/package/lbcamden/components/button/macro-options.json)
     * - [`fixtures.json`](https://github.com/LBCamden/lbcamden-frontend/blob/release-0.5.1/package/lbcamden/components/button/fixtures.json)
     */
    type?: "json" | "yaml";
    /** Prefix (eg "LBCamden" or "govuk") to add to component names when generating nunjucks documentation */
    nunjucksPrefix?: string;
    /**
     * If provided, resolves the template.njk to render a component in a custom location based on the component name.
     * If not provided, the template.njk will be resolved to the same directory as the fixtures file.
     *
     * This is useful for augmenting components defined in an upstream library with additional examples.
     */
    resolveTemplate?: (name: string) => string;
}
interface StandaloneExample {
    /**
     * Slash-delimited namespace that defines how stories are grouped in the sidebar.
     *
     * Eg: `patterns` or `full-page-examples/forms`
     */
    storyNamespace: string;
    /**
     * Path to a directory containing the example.
     *
     * Examples should have the following directory structure:
     *
     * + `{exampleName}`
     *   - `index.njk`
     *   - `example.yaml`
     *   - `style.scss` (optional)
     *
     * example.yaml must be present in order for the example to be generated. At minimum, it should contain an empty object (eg: `{}`).
     *
     * If `style.scss` is present, it will be added to the styles for this example.
     *
     * It may define a `data` property containing data to be passed into the template.
     */
    searchPath: string;
}
/** A component definition loaded from yaml or json */
interface ComponentSpec {
    name: string;
    params: Record<string, unknown>;
    examples: FixtureSpec[];
}
/** A fixture definition loaded from yaml or json */
interface FixtureSpec {
    name: string;
    data: Record<string, unknown>;
    hidden?: boolean;
}

/**
 * Helper to provide intellisense types for configuring storybook-addon-govuk-fixtures.
 */
declare function govukStorybook(options: Opts): {
    name: string;
    options: Opts;
};

export { type ComponentSpec, type FixtureOpts, type FixtureSpec, type Opts, type StandaloneExample, govukStorybook as default };
