import { Marked } from 'marked';

/**
 * Markdown → HTML for collection bodies. Content is authored in this repo and
 * reviewed in PRs (trusted, like MDX would be); raw HTML in a body is disallowed
 * by convention. GFM on, headings get ids for in-page anchors.
 */
const marked = new Marked({
  gfm: true,
  breaks: false,
});

marked.use({
  renderer: {
    heading({ text, depth }) {
      const id = text
        .toLowerCase()
        .replace(/<[^>]+>/g, '')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-');
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
  },
});

export function renderMarkdown(body: string): string {
  return marked.parse(body.trim(), { async: false });
}
