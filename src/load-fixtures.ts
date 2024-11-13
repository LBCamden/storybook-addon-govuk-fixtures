import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs/promises'
import { readFile } from 'fs/promises'
import { uniqBy } from 'lodash-es'

import { ComponentSpec, FixtureSpec, StandaloneExample } from './types'
import { fileExists } from './util'

/**
 * Parse the raw yaml or json of a fixtures file into a `ComponentSpec`.
 */
export async function loadComponentSpec(code: string, id: string): Promise<ComponentSpec> {
  if (id.endsWith('.yaml')) {
    return {
      ...yaml.parse(code),
      name: path.basename(path.dirname(id))
    }
  }

  const macroOpts = JSON.parse(await fs.readFile(path.join(path.dirname(id), 'macro-options.json'), 'utf-8'))
  const { fixtures } = JSON.parse(await fs.readFile(id, 'utf-8'))

  return {
    name: path.basename(path.dirname(id)),
    params: macroOpts,
    examples: uniqBy(
      fixtures.map((x: any): FixtureSpec => ({
        ...x,
        data: x.options
      })),
      x => x.name
    )
  }
}

/**
 * Given the path to the example.yaml of a standlone example and the relevant config options, return an object that
 * containing the data needed to render it.
 */
export function getStandaloneExampleSpec(exampleYamlPath: string, { storyNamespace }: StandaloneExample) {
  const exampleDir = path.dirname(exampleYamlPath)
  const stylePath = path.join(exampleDir, 'style.scss')
  const mainTemplate = path.join(exampleDir, 'index.njk')
  const storyTitle = path.posix.join(storyNamespace, path.basename(exampleDir));

  return {
    mainTemplate,
    storyTitle,
    stylePath,
    hasStyle() {
      return fileExists(stylePath)
    },
    async getData() {
      const {data = {}} = yaml.parse(await readFile(exampleYamlPath, 'utf-8'))
      return data
    }
  }
}
