import { createFilter, FilterPattern, Plugin, fetchModule } from 'vite';
import * as path from 'path'

import { getStandaloneExampleSpec, loadComponentSpec } from './load-fixtures';
import { fileExists, getExampleExportName, pascalCase } from './util';
import { camelCase } from 'lodash-es';
import { StandaloneExample } from './types';

interface FixtureLoaderOpts {
  /** Path to prefix macro imports in documentation with */
  docsImportPath: string,

  /** Prefix to append to name of story. This is slash-delimited (eg: 'category/subcategory') and used to group stories into categories */
  storyNamePrefix?: string;

  /** Prefix (eg "LBCamden" or "govuk") to add to component names when generating nunjucks documentation */
  docsNunjucksPrefix?: string

  /** Path patterns to include in plugin */
  include?: FilterPattern;

  /** Path patterns to exclude from plugin */
  exclude?: FilterPattern;

  /**
   * Given the name of a directory containing fixture examples, return the path (relative to cwd) of the template.njk
   * file implementing the component. Defaults to a template.njk file in the same directory.
   */
  resolveTemplate?: (name: string) => string
}

/**
 * Vite plugin that transforms json or yaml files containing a description of a component's properties and examples into a [CSF](https://storybook.js.org/docs/api/csf) format javascript file.
 */
export default function fixtureLoader({ resolveTemplate, include, exclude, storyNamePrefix = "", docsNunjucksPrefix, docsImportPath }: FixtureLoaderOpts): Plugin {
  const filter = createFilter(include, exclude);

  return {
    name: "vite-plugin-govuk-fixtures",

    async transform(code, id) {
      if (!filter(id) || !/\.(json|ya?ml)$/.test(id)) {
        return;
      }

      const importPath = path.relative(
        docsImportPath,
        path.join(
          path.dirname(id),
          'macro.njk'
        )
      )

      const componentSpec = await loadComponentSpec(code, id)

      // Passed into story and used when generating nunjucks documentation
      const storyParameters = {
        importPath,
        macroExport: docsNunjucksPrefix
        ? docsNunjucksPrefix + pascalCase(componentSpec.name)
        : camelCase(componentSpec.name)
      }

      const templatePath = resolveTemplate ? path.resolve(resolveTemplate(componentSpec.name)) : `./template.njk`

      return [
        `import render from "${templatePath}?import="`,
        `import { generateStory } from "/node_modules/storybook-addon-govuk-fixtures/dist/runtime.js"`,
        
        `export default {`,
        `  title: ${JSON.stringify(path.posix.join(storyNamePrefix, componentSpec.name))},`,
        `  parameters: ${JSON.stringify(storyParameters)}`,
        `}`,

        ...componentSpec.examples.flatMap(({ name, data }) => [
          `export const ${getExampleExportName(name)} = generateStory(render, ${JSON.stringify({ name, data })})`
        ])
      ].join('\n')
    }
  }
}

interface StandaloneExampleLoaderOpts extends StandaloneExample {
}

/**
 * Vite plugin that transforms nunjucks files providing standalone examples into a [CSF](https://storybook.js.org/docs/api/csf) format javascript file.
 */
export function standaloneExampleLoader({ storyNamespace = '', searchPath }: StandaloneExampleLoaderOpts): Plugin {
  const filter = createFilter([searchPath + '/*/example.yaml'], [])
  return {
    name: "vite-plugin-govuk-examples",

    async load(id) {
      if (!filter(id)) return
      
      const example = getStandaloneExampleSpec(id, { searchPath, storyNamespace })

      const storyMeta = {
        title: example.storyTitle,
        tags: ["!autodocs"],
        parameters: {
          layout: "fullscreen"
        }
      }

      return [
        ...await example.hasStyle() ? [`import ${JSON.stringify(example.stylePath)}`] : [],
        `import render from "${example.mainTemplate}?import="`,
        `import { generateStandaloneExample } from "/node_modules/storybook-addon-govuk-fixtures/dist/runtime.js"`,
        '',
        `export default ${JSON.stringify(storyMeta)}`,
        'export const DefaultExample = generateStandaloneExample(render)',
      ].join('\n')
    }
  }
}