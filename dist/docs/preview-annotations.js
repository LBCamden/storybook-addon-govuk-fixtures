function docsTransformSource(code, ctx) {
  const { macroExport, importPath } = ctx.parameters;
  const sourceLanguage = ctx.globals.sourceLanguage;
  switch (sourceLanguage) {
    case "nunjucks": {
      return [
        `{% from ${JSON.stringify(importPath)} import ${macroExport} %}`,
        "",
        `{{ ${macroExport}(${JSON.stringify(ctx.args, null, 2)}) }}`
      ].join("\n");
    }
  }
}

const parameters = {
  docs: {
    source: {
      transform: docsTransformSource
    }
  }
};
const globalTypes = {
  // This is used to toggle between languages for code examples.
  sourceLanguage: {
    description: "Language to use in source code examples",
    toolbar: {
      title: "Language",
      icon: "markup",
      // Array of plain string values or MenuItem shape (see below)
      items: ["nunjucks", "html"],
      // Change title based on selected value
      dynamicTitle: true
    }
  }
};
const initialGlobals = {
  sourceLanguage: "nunjucks"
};

export { globalTypes, initialGlobals, parameters };
