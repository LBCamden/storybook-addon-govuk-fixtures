import type { StoryContext } from "@storybook/html";

export function docsTransformSource(code: string, ctx: StoryContext) {
  const {macroExport, importPath} = ctx.parameters
  const sourceLanguage = ctx.globals.sourceLanguage

  switch (sourceLanguage) {
    case "nunjucks": {
      return [
        `{% from ${JSON.stringify(importPath)} import ${macroExport} %}`,
        '',
        `${macroExport}(${JSON.stringify(ctx.args, null, 2)})`,
      ].join('\n')
    }
    case "html": {
      code
    }
  }
}