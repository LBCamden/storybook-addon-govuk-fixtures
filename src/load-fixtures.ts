import * as yaml from 'yaml'
import * as path from 'path'
import * as fs from 'fs/promises'
import { ComponentSpec } from './types'

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
    examples: fixtures.map(x => ({
      ...x,
      data: x.options
    }))
  }
}
