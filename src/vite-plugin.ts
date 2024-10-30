import { createFilter, FilterPattern, Plugin, fetchModule } from 'vite';
import * as path from 'path'

import { generateStories, generateStoryMetadata, loadFixture } from './load-fixtures';

interface LoaderOpts {
  prefix?: string;
  include?: FilterPattern;
  exclude?: FilterPattern;
};

export default function fixtureLoader({ include, exclude, prefix }: LoaderOpts): Plugin {
  const filter = createFilter(include, exclude);

  return {
    name: "vite-plugin-govuk-fixtures",

    async transform(code, id) {
      if (!filter(id) || !/\.(json|ya?ml)$/.test(id)) {
        return;
      }

      const fixtures = await loadFixture(code, id)

      return [
        `import render from "./template.njk?import="`,
        ...generateStoryMetadata(id, prefix, fixtures),
        ...generateStories(fixtures)
      ].join('\n')
    }
  }
}