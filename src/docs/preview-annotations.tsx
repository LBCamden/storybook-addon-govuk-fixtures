import { GlobalTypes } from "storybook/internal/types";
import { docsTransformSource } from "./docs-transform";
import { storyResizeDecorator } from "../story-resize";

/**
 Decorators to apply to every generated story.
*/
export const decorators = [storyResizeDecorator];

/**
 Additional parameters to inject into the frontend storybook context 
*/
export const parameters = {
  docs: {
    source: {
      transform: docsTransformSource
    }
  }
}

/**
 Additional globals to inject into the frontend storybook context
*/
export const globalTypes: GlobalTypes = {
  // This is used to toggle between languages for code examples.
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

/**
 Default values for globals injected into the frontend storybook context.
*/
export const initialGlobals = {
  sourceLanguage: "nunjucks"
}
