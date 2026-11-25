import type { Decorator } from "@storybook/html";

export type StoryResizeMessage = {
  context: "iframe.resize";
  width: number;
  height: number;
  href: string;
  src: string;
};

export type StoryResizeReceiverOptions = {
  root?: ParentNode;
  selector?: string;
  minimumHeight?: number;
};

let resizeObserver: ResizeObserver | undefined;

function isStoryResizeMessage(value: unknown): value is StoryResizeMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "context" in value &&
    value.context === "iframe.resize"
  );
}

function parseMessage(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

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

/**
 * Applies resize messages to matching Storybook iframes.
 *
 * The returned function removes the message listener.
 */
export function initStoryResizeReceiver({
  root = document,
  selector = "[data-storybook-iframe]",
  minimumHeight = 0,
}: StoryResizeReceiverOptions = {}) {
  const frames = Array.from(root.querySelectorAll<HTMLIFrameElement>(selector));

  const receiveStoryResize = (event: MessageEvent) => {
    const payload = parseMessage(event.data);

    if (!isStoryResizeMessage(payload)) {
      return;
    }

    const frame = frames.find(
      (candidate) => candidate.contentWindow === event.source,
    );

    if (
      !frame ||
      event.origin !== new URL(frame.src, window.location.href).origin
    ) {
      return;
    }

    const height = Number(payload.height);

    if (Number.isFinite(height) && height > 0) {
      frame.style.height = `${Math.max(height, minimumHeight)}px`;
    }
  };

  window.addEventListener("message", receiveStoryResize);

  return () => window.removeEventListener("message", receiveStoryResize);
}

