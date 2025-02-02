# storybook-addon-govuk-fixtures

Storybook plugin to render nunjucks components and examples using fixtures defined in yaml and json format.

> [!WARNING]  
> This add-on is in early stage development and may be subject to breaking change.

## Installation

Install the library (requires authentication with lbcamden github)

`npm install -D github:lbcamden/storybook-addon-govuk-fixtures`

Configure your storybook's main.js to use the `html-vite` framework. Add this add-on to your storybook's `addons` config.

```javascript
import govukStorybook from "storybook-addon-govuk-fixtures";

const config = {
  // ...
  addons: [
    // ...
    govukStorybook({
      // Definitions of component examples
      fixtures: [
        // This will search node_modules/govuk-frontend/dist for examples in macro-options.json and examples.json files and add stories under components > govuk.
        // Templates are assumed to live in the same directory as the fixture configuration files.
        // Macros will be assumed to have the prefix `govuk` when generating code examples.
        {
          storyNamespace: "components/govuk",
          searchPath: "node_modules/govuk-frontend/dist",
          nunjucksPrefix: 'govuk',
          type: "json"
        },
        // This will search src/govuk for examples in yaml files and add stories under components > govuk.
        // A custom function is used to resolve the template from the component name.
        // Macros will be assumed to have the prefix `govuk` when generating code examples.
        // In this example, we're augmenting the examples in the upstream library with some of our own.
        {
          storyNamespace: "components/govuk",
          searchPath: "src/govuk",
          nunjucksPrefix: 'govuk',
          type: "yaml",
          resolveTemplate: name => `node_modules/govuk-frontend/dist/govuk/components/${name}/template.njk`
        },
        // This will search src/lbcamden for examples in yaml files and add stories under components > lbcamden.
        // Macros will be assumed to have the prefix `LBCamden` when generating code examples.
        {
          storyNamespace: "components/lbcamden",
          searchPath: "src/lbcamden",
          type: "yaml",
          nunjucksPrefix: 'LBCamden'
        },
      ],
      // Definitions of standalone examples not linked to components
      fullPageExamples: [
        {
          searchPath: "examples/patterns",
          storyNamespace: 'patterns',
        },
        {
          searchPath: "examples/full-page-examples",
          storyNamespace: 'full-page-examples',
        }
      ],
      // Additional directories to scan for nunjucks templates.
      // In this case, our examples make use of imports in other directories, so we need to make sure they get added to the frontend bundle.
      additionalTemplatePaths: ["examples"],
    }),
    // default storybook addons
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  // Add any static asset directories here
  staticDirs: [
    {
      to: "/assets",
      from: "../src/lbcamden/assets"
    },
    {
      to: "/example-assets",
      from: "../src/lbcamden/example-assets"
    },
  ]
};
```

## Development

If you're making changes to this library, you'll probably want to test it against a downstream project containing component fixtures.

Use npm link to do this.

In this project's repository, run:

```bash
npm link
```

In the downstream repository, run:

```bash
npm link storybook-addon-govuk-fixtures
```

You will need to `npm run build` in this repository and restart your downstream storybook for changes to take effect.

## Publishing changes

As this library is currently hosted on github, you'll need to rebuild it and commit the built assets for them to be available downstream.

You can do this by running:

```bash
npm run build
git add -A
git commit -m "release"
git push origin main
```
