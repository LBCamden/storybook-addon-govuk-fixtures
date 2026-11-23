import type { Decorator } from "@storybook/html";

type StoryResizeMessage = {
  context: "iframe.resize";
  width: number;
  height: number;
  href: string;
  src: string;
};

let resizeObserver: ResizeObserver | undefined;

function dispatchStoryResize(storyRoot: Element) {
  const { width, height } = storyRoot.getBoundingClientRect();
  const storyUrl = window.location.href;

  const message: StoryResizeMessage = {
    context: "iframe.resize",
    width: Math.ceil(width),
    height: Math.ceil(height),
    href: storyUrl,
    src: storyUrl,
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

export const storyResizeDecorator: Decorator = (Story, context) => {
  const renderedStory = Story(context);

  window.requestAnimationFrame(observeRenderedStory);

  return renderedStory;
};
