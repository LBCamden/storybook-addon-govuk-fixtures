import type { StorybookConfig } from '@storybook/html-vite'
import type { PresetPropertyFn } from 'storybook/internal/types'
import nunjucksLoader from 'vite-plugin-nunjucks-loader'
import * as path from 'path'
import type { InlineConfig } from 'vite'
import {glob} from 'glob'

import { Opts } from './types'
import { fixtureIndexer } from './indexer'
import fixtureLoader from './vite-plugin'


export const viteFinal = (viteConf: InlineConfig, opts: Opts) => {
  // workaround for loader being in esm format
  const nunjucksLoaderFixed = typeof nunjucksLoader === 'function' ? nunjucksLoader : (nunjucksLoader as any).default

  const allTemplates = [
    ...opts.fixtures.map(f => f.searchPath),
    ...opts.additionalTemplatePaths ?? []
  ]

  viteConf.plugins ||= []
  viteConf.plugins.unshift(
    ...opts.fixtures.map(f => fixtureLoader({
      include: [f.searchPath + '/**'],
      prefix: f.prefix
    })),
    nunjucksLoaderFixed({
      templates: allTemplates,
    }),
  );

  return viteConf
}

export const stories: PresetPropertyFn<"stories", StorybookConfig, Opts> = async (prev, opts) => {
  const stories = typeof prev === 'function' ? await prev([], opts) : prev

  return [
    ...stories ?? [],
    ...opts.fixtures.map(f =>
      f.type === 'yaml' ? `${path.resolve(f.searchPath)}/**/*.yaml` : `${path.resolve(f.searchPath)}/**/fixtures.json`,
    )
  ]
}


export const experimental_indexers: PresetPropertyFn<"experimental_indexers", StorybookConfig, Opts> = async (prev, opts) => {
  const indexers = typeof prev === 'function' ? await prev([], opts) : prev
  
  return [
    ...indexers ?? [],
    ...opts.fixtures.map(opts => fixtureIndexer(opts))
  ]
}
