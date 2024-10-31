import type { StorybookConfig } from '@storybook/html-vite'
import type { PresetProperty, PresetPropertyFn } from 'storybook/internal/types'
import nunjucksLoader from 'vite-plugin-nunjucks-loader'
import * as path from 'path'
import type { InlineConfig } from 'vite'

import { Opts } from './types'
import { fixtureIndexer } from './indexer'
import fixtureLoader from './vite-plugin'

/**
 * Preset hook to override vite configuration. We use it to inject the plugins that we need to transform yaml and json
 * fixtures into Storybook CSF-format js modules.
 **/
export const viteFinal = (viteConf: InlineConfig, opts: Opts) => {
  // workaround for loader being in esm format
  const nunjucksLoaderFixed = typeof nunjucksLoader === 'function' ? nunjucksLoader : (nunjucksLoader as any).default

  viteConf.plugins ||= []
  viteConf.plugins.unshift(
      // Install a fixture-loader plugin for each fixture search path
    ...opts.fixtures.map(f => fixtureLoader({
      importRelativePath: f.searchPath,
      include: [f.searchPath + '/**'],
      prefix: f.storyNamespace,
      nunjucksPrefix: f.nunjucksPrefix
    })),

    // Install the nunjucks template loader and configure it to bundle templates associated with our stories
    // and any additional template search paths provided.
    nunjucksLoaderFixed({
      templates: [
        ...opts.fixtures.map(f => f.searchPath),
        ...opts.additionalTemplatePaths ?? []
      ],
    }),
  );

  return viteConf
}

/**
 * Preset hook to override the search path for stories.
 * 
 * We derive this from the `fixtures` setting passed into the preset options.
 * This ensures that the search paths for stories are consistent with what the plugin and indexer expect.
 **/
export const stories: PresetPropertyFn<"stories", StorybookConfig, Opts> = async (prev, opts) => {
  // Inherit from any previous plugins
  const stories = typeof prev === 'function' ? await prev([], opts) : prev

  return [
    ...stories ?? [],
    ...opts.fixtures.map(f =>
      f.type === 'yaml'
      // yaml fixture format
      ? `${path.resolve(f.searchPath)}/**/*.yaml`
      // govuk-prototype-kit json format
      : `${path.resolve(f.searchPath)}/**/fixtures.json`,
    )
  ]
}


/**
 * Preset hook to override the story indexer.
 * 
 * By default storybook's server process will only parse and index stories from a CSF file with the name
 * `*.stories.(j|t)sx?`. We use this to index our stories using the.
 * 
 * Given that this hook is experimental, if an upgrade to storybook breaks things, it's probably a good place to look...
 **/
export const experimental_indexers: PresetPropertyFn<"experimental_indexers", StorybookConfig, Opts> = async (prev, opts) => {
  const indexers = typeof prev === 'function' ? await prev([], opts) : prev
  
  return [
    ...indexers ?? [],
    ...opts.fixtures.map(opts => fixtureIndexer(opts))
  ]
}

/**
 * Preset hook to configure client-side hooks (augmenting storybook's preview.js).
 * 
 * This is used to add in the (separately bundled) client entrypoint to set up docs customisation.
 */
export const previewAnnotations: PresetProperty<'previewAnnotations'> = async (
  input = [],
  options
) => {
  const docsEnabled = Object.keys(await options.presets.apply('docs', {}, options)).length > 0;

  return [
    ...input,
    ...docsEnabled ? [path.join(__dirname, 'docs/preview-annotations.js')] : []
  ]
};