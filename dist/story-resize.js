let resizeObserver;
function isStoryResizeMessage(value) {
  return typeof value === "object" && value !== null && "context" in value && value.context === "iframe.resize";
}
function parseMessage(value) {
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch {
    return void 0;
  }
}
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
function initStoryResizeReceiver({
  root = document,
  selector = "[data-storybook-iframe]",
  minimumHeight = 0
} = {}) {
  const frames = Array.from(root.querySelectorAll(selector));
  const receiveStoryResize = (event) => {
    const payload = parseMessage(event.data);
    if (!isStoryResizeMessage(payload)) {
      return;
    }
    const frame = frames.find(
      (candidate) => candidate.contentWindow === event.source
    );
    if (!frame || event.origin !== new URL(frame.src, window.location.href).origin) {
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

export { initStoryResizeReceiver, storyResizeDecorator };
