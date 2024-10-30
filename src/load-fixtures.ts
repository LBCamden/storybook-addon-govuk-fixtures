import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs/promises'
import { camelCase } from 'lodash-es'

export async function loadFixture(code: string, id: string) {
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
    examples: fixtures.map(x => ({
      ...x,
      data: x.options
    }))
  }
}

export function generateStoryMetadata(id, prefix, { params, name }) {
  return [
    `export default {`,
    `  title: ${JSON.stringify(path.posix.join(prefix, name))},`,
    `}`
  ]
}

export function generateStories({ examples }) {
  return examples.flatMap(({ name, data }) => [
    `export const _${camelCase(name)} = {`,
    `  name: ${JSON.stringify(name)},`,
    `  args: ${JSON.stringify(data)},`,
    `  render: (_, { loaded }) => loaded.html,`,
    `  loaders: [ async (cx) => ({ html: await render({ params: cx.args || cx.initialArgs }) }) ]`,
    `}`
  ])
}
