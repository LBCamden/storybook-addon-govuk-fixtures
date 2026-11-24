import { Decorator } from '@storybook/html';

type StoryResizeMessage = {
    context: "iframe.resize";
    width: number;
    height: number;
    href: string;
    src: string;
};
type StoryResizeReceiverOptions = {
    root?: ParentNode;
    selector?: string;
    minimumHeight?: number;
};
declare const storyResizeDecorator: Decorator;
/**
 * Applies resize messages to matching Storybook iframes.
 *
 * The returned function removes the message listener.
 */
declare function initStoryResizeReceiver({ root, selector, minimumHeight, }?: StoryResizeReceiverOptions): () => void;

export { type StoryResizeMessage, type StoryResizeReceiverOptions, initStoryResizeReceiver, storyResizeDecorator };
