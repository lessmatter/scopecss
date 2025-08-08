# ScopeCSS by Less Matter

Lightweight CSS scoping library for HTML using data-scope attributes.

> **⚠️ Alpha Version**  
> This library is currently in alpha and being used internally by Less Matter for testing.  
> Breaking changes may occur in future versions.

> **🔒 Security notice**  
> This library does not sanitize HTML or CSS and is not a security isolation tool (no XSS protection).  
> Use only trusted input or sanitize content before use. If you enforce a strict CSP, prefer `returnFormat: 'separate'` and attach CSS via a non-inline mechanism (nonce/hash or external stylesheet).

## Installation

This package is not yet on npm. Use one of the following:

- CDN (browser):

```html
<script type="module">
  import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@main/src/index.js';
</script>
```

- Download (Node/bundlers):

```bash
curl -o src/scopecss.js \
  https://raw.githubusercontent.com/lessmatter/scopecss/main/src/index.js
```

```js
// Local import
import scopeCss from './src/scopecss.js';
```

## Quick start

```javascript
import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@main/src/index.js';

const html = /*html*/`
  <div class="container">
    <h1 class="title">Hello</h1>
    <p class="text">Scoped CSS</p>
    <button class="btn">Submit</button>
  </div>
`;

const css = /*css*/`
  .container { padding: 20px; }
  .title { color: blue; }
  .text { font-size: 16px; }
  .btn { background: green; color: white; }
`;

const result = scopeCss(html, css);
document.getElementById('app').innerHTML = result;
```

## How it works

1. **Generates a random scope key** (e.g., "xdfc9a")
2. **Adds `data-scope="key"`** to all HTML elements
3. **Wraps CSS selectors** with `:where([data-scope="key"])`
4. **Returns complete HTML** with scoped CSS in `<style>` tag

## API

### `scopeCss(html, css, options?)`

**Parameters:**
- `html` (string) - HTML string
- `css` (string) - CSS string
 - `options` (object, optional)
   - `returnFormat` (`'inline' | 'separate'`, default `'inline'`) –
     Controls the return format. `'inline'` returns a single HTML string that already includes a `<style>` tag.
     `'separate'` returns `{ html, css }` separately.

**Returns:**
- `'inline'`: `string` – HTML string containing a `<style>` tag with scoped CSS
- `'separate'`: `{ html: string, css: string }`

### Example: separate return

```javascript
import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@main/src/index.js';

const html = /*html*/`
  <div class="card">
    <h2 class="title">Card</h2>
    <p class="text">Content</p>
  </div>
`;

const css = /*css*/`
  .card { padding: 12px; }
  .title { color: rebeccapurple; }
  .text { font-size: 14px; }
`;

const { html: scopedHtml, css: scopedCss } = scopeCss(html, css, { returnFormat: 'separate' });
// Insert HTML and CSS separately wherever you want
document.getElementById('app').innerHTML = scopedHtml;
const style = document.createElement('style');
style.textContent = scopedCss;
document.head.appendChild(style);
```

## License

MIT License

## Support

- GitHub Issues: [Create issue](https://github.com/lessmatter/scopecss/issues)
- Documentation: [JSDoc](https://github.com/lessmatter/scopecss/blob/main/src/index.js) 