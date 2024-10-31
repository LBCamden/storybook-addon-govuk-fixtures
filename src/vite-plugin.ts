import { createFilter, FilterPattern, Plugin, fetchModule } from 'vite';
import * as path from 'path'

import { loadComponentSpec } from './load-fixtures';
import { getExampleExportName, pascalCase } from './util';
import { camelCase } from 'lodash-es';

interface LoaderOpts {
  importRelativePath: string,
  prefix?: string;
  nunjucksPrefix?: string
  include?: FilterPattern;
  exclude?: FilterPattern;
};

export default function fixtureLoader({ include, exclude, prefix = "", nunjucksPrefix, importRelativePath }: LoaderOpts): Plugin {
  const filter = createFilter(include, exclude);

  return {
    name: "vite-plugin-govuk-fixtures",

    async transform(code, id) {
      if (!filter(id) || !/\.(json|ya?ml)$/.test(id)) {
        return;
      }

      const importPath = path.relative(
        importRelativePath,
        path.join(
          path.dirname(id),
          'macro.njk'
        )
      )

      const componentSpec = await loadComponentSpec(code, id)
      const storyParameters = {
        importPath,
        macroExport: nunjucksPrefix
        ? nunjucksPrefix + pascalCase(componentSpec.name)
        : camelCase(componentSpec.name)
      }

      return [
        `import render from "./template.njk?import="`,
        `import { generateStory } from "/node_modules/storybook-addon-govuk-fixtures/dist/runtime.js"`,
        
        `export default {`,
        `  title: ${JSON.stringify(path.posix.join(prefix, componentSpec.name))},`,
        `  parameters: ${JSON.stringify(storyParameters)}`,
        `}`,

        ...componentSpec.examples.flatMap(({ name, data }) => [
          `export const ${getExampleExportName(name)} = generateStory(render, ${JSON.stringify({ name, data })})`
        ])
      ].join('\n')
    }
  }
}