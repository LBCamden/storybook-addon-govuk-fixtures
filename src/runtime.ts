import type { StoryObj } from "@storybook/html";
import prettierHtml from 'prettier/plugins/html'
import * as prettier from 'prettier/standalone'
import { FixtureSpec } from "./types";

export function generateStory(renderFn: (args: any) => Promise<string>, { name, data }: FixtureSpec): StoryObj {
  return {
    name,
    args: data,
    render: (_, { loaded }) => loaded.html,
    loaders: [
      // As our template rendering functions and prettier are async, we use storybook's "loader" feature
      // to render them asynchronously.
      async (cx) => {
        const rawStoryHtml = await renderFn({params: cx.args || cx.initialArgs})
        console.log(cx.args, rawStoryHtml)

        // This is just to make code examples looks nicer. We'd ideally do this in the docs source transform,
        // but it doesn't support async transform functions.
        return {
          html: await prettier.format(rawStoryHtml, {
            plugins: [prettierHtml],
            parser: "html"
          })
        }
      }
    ]
  }
}
