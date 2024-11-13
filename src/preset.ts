import type { StorybookConfig } from '@storybook/html-vite'
import type { PresetProperty, PresetPropertyFn } from 'storybook/internal/types'
import nunjucksLoader from 'vite-plugin-nunjucks-loader'
import * as path from 'path'
import type { InlineConfig } from 'vite'

import { Opts } from './types'
import { fixtureIndexer, fullPageExampleIndexer } from './indexer'
import fixtureLoader, { fullPageExampleLoader } from './vite-plugin'

/**
 * Preset hook to override vite configuration. We use it to inject the plugins that we need to transform yaml and json
 * fixtures into Storybook CSF-format js modules.
 **/
export const viteFinal = (viteConf: InlineConfig, { fixtures, fullPageExamples = [], additionalTemplatePaths = [] }: Opts) => {
  // workaround for loader being in esm format
  const nunjucksLoaderFixed = typeof nunjucksLoader === 'function' ? nunjucksLoader : (nunjucksLoader as any).default

  viteConf.plugins ||= []
  viteConf.plugins.unshift(
      // Install a fixture-loader plugin for each fixture search path
    ...fixtures.map(f => fixtureLoader({
      docsImportPath: f.searchPath,
      include: [f.searchPath + '/**'],
      storyNamePrefix: f.storyNamespace,
      docsNunjucksPrefix: f.nunjucksPrefix,
      resolveTemplate: f.resolveTemplate
    })),

      // Install a plugin for each full page example search path
    ...fullPageExamples.map(ex => fullPageExampleLoader(ex)),

    // Install the nunjucks template loader and configure it to bundle templates associated with our stories
    // and any additional template search paths provided.
    nunjucksLoaderFixed({
      templates: [
        ...fixtures.map(f => f.searchPath),
        ...fullPageExamples.map(f => f.searchPath),
        ...additionalTemplatePaths ?? []
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
    ),
    ...(opts.fullPageExamples ?? []).map(ex => `${path.resolve(ex.searchPath)}/*/example.yaml`),
  ]
}


/**
 * Preset hook to override the story indexer.
 * 
 * By default storybook's server process will only parse and index stories from a CSF file with the name
 * `*.stories.(j|t)sx?`. As our stories are defined in yaml or json files, we need to read the list of stories from
 * them and provide them to storybook explicitly so that it can populate the sidebar and support search.
 * 
 * Given that this hook is experimental, if an upgrade to storybook breaks things, it's probably a good place to look...
 **/
export const experimental_indexers: PresetPropertyFn<"experimental_indexers", StorybookConfig, Opts> = async (prev, opts) => {
  const indexers = typeof prev === 'function' ? await prev([], opts) : prev
  
  return [
    ...indexers ?? [],
    ...opts.fixtures.map(opts => fixtureIndexer(opts)),
    ...(opts.fullPageExamples ?? []).map(ex => fullPageExampleIndexer(ex))
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