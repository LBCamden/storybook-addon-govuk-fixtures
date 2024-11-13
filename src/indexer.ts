import type { Indexer } from "storybook/internal/types"
import * as path from 'path'
import escapeRegexp from "escape-string-regexp"
import * as fs from 'fs/promises'

import { FixtureOpts, FullPageExample } from "./types"
import { getFullPageExampleSpec, loadComponentSpec } from "./load-fixtures"
import { getExampleExportName } from "./util"

/**
 * Return a Storybook indexer object for component fixtures
 */
export function fixtureIndexer({ storyNamespace: prefix, searchPath }: FixtureOpts): Indexer {
  const absPath = path.resolve(searchPath);

  return {
    test: new RegExp('^' + escapeRegexp(absPath)),
    createIndex: async (fileName, { makeTitle }) => {
      const fixtures = await loadComponentSpec(await fs.readFile(fileName, 'utf-8'), fileName)
      const title = path.posix.join(prefix, fixtures.name)

      return fixtures.examples.filter(example => !example.hidden).map(example => ({
        type: "story",
        title: makeTitle(title),
        importPath: fileName,
        exportName: getExampleExportName(example.name)
      }))
    }
  }
}

/**
 * Return a Storybook indexer object for standalone examples
 */
export function fullPageExampleIndexer({ storyNamespace, searchPath }: FullPageExample): Indexer {
  const absPath = path.resolve(searchPath);

  return {
    test: new RegExp('^' + escapeRegexp(absPath)),
    createIndex: async (fileName, { makeTitle }) => {
      const example = getFullPageExampleSpec(fileName, { searchPath, storyNamespace})

      return [{
        type: "story",
        title: makeTitle(example.storyTitle),
        importPath: fileName,
        tags: ["!autodocs"],
        exportName: 'DefaultExample',
      }]
    }
  }
}
