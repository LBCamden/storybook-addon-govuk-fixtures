import { GlobalTypes } from "storybook/internal/types";
import { docsTransformSource } from "./docs-transform";

export const parameters = {
  docs: {
    source: {
      transform: docsTransformSource
    }
  }
}

export const globalTypes: GlobalTypes = {
  sourceLanguage: {
    description: "Language to use in source code examples",
    toolbar: {
      title: 'Language',
      icon: 'markup',
      // Array of plain string values or MenuItem shape (see below)
      items: ['nunjucks', 'html'],
      // Change title based on selected value
      dynamicTitle: true,
    }
  }
}

export const initialGlobals = {
  sourceLanguage: "nunjucks"
}

console.log('init preview')