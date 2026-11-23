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

let resizeObserver;
function dispatchStoryResize(storyRoot) {
  const { width, height } = storyRoot.getBoundingClientRect();
  const storyUrl = window.location.href;
  const message = {
    context: "iframe.resize",
    width: Math.ceil(width),
    height: Math.ceil(height),
    href: storyUrl,
    src: storyUrl
  };
  window.parent.postMessage(message, "*");
}
function observeRenderedStory() {
  const storyRoot = document.getElementById("storybook-root");
  resizeObserver?.disconnect();
  if (!storyRoot) {
    return;
  }
  dispatchStoryResize(storyRoot);
  resizeObserver = new ResizeObserver(() => {
    dispatchStoryResize(storyRoot);
  });
  resizeObserver.observe(storyRoot);
}
const storyResizeDecorator = (Story, context) => {
  const renderedStory = Story(context);
  window.requestAnimationFrame(observeRenderedStory);
  return renderedStory;
};

const decorators = [storyResizeDecorator];
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

export { decorators, globalTypes, initialGlobals, parameters };
