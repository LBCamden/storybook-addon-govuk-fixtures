import { createFilter, FilterPattern, Plugin, fetchModule } from 'vite';
import * as path from 'path'

import { getExampleSpec, loadComponentSpec } from './load-fixtures';
import { fileExists, getExampleExportName, pascalCase } from './util';
import { camelCase } from 'lodash-es';
import { FullPageExample } from './types';

interface FixtureLoaderOpts {
  importRelativePath: string,
  prefix?: string;
  nunjucksPrefix?: string
  include?: FilterPattern;
  exclude?: FilterPattern;
  resolveTemplate?: (name: string) => string
}

export default function fixtureLoader({ resolveTemplate, include, exclude, prefix = "", nunjucksPrefix, importRelativePath }: FixtureLoaderOpts): Plugin {
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

      const templatePath = resolveTemplate ? path.resolve(resolveTemplate(componentSpec.name)) : `./template.njk`

      return [
        `import render from "${templatePath}?import="`,
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

interface FullPageExampleLoaderOpts extends FullPageExample {
}

export function fullPageExampleLoader({ storyNamespace = '', searchPath }: FullPageExampleLoaderOpts): Plugin {
  const filter = createFilter([searchPath + '/*/example.yaml'], [])
  return {
    name: "vite-plugin-govuk-examples",

    async load(id) {
      if (!filter(id)) return
      
      const example = getExampleSpec(id, { searchPath, storyNamespace })

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
        `import { generateFullPageExample } from "/node_modules/storybook-addon-govuk-fixtures/dist/runtime.js"`,
        '',
        `export default ${JSON.stringify(storyMeta)}`,
        'export const DefaultExample = generateFullPageExample(render)',
      ].join('\n')
    }
  }
}