# ScopeCSS by Less Matter

Lightweight CSS scoping library for HTML using data-scope attributes.

> **⚠️ Alpha Version**  
> This library is currently in alpha and being used internally by Less Matter for testing.  
> Breaking changes may occur in future versions.

## Installation

This package is not yet published on npm. Use one of the following options:

- CDN (recommended for browser):

```html
<script type="module">
  import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@main/src/index.js';
  // Tip: pin to a commit for deterministic builds, e.g.
  // import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@<commit>/src/index.js';
  console.log(typeof scopeCss);
</script>
```

- Direct GitHub ESM import (browser):

```html
<script type="module">
  import scopeCss from 'https://raw.githubusercontent.com/lessmatter/scopecss/main/src/index.js';
  console.log(typeof scopeCss);
</script>
```

- Download the file (Node/bundlers):

```bash
curl -o src/scopecss.js \
  https://raw.githubusercontent.com/lessmatter/scopecss/main/src/index.js
```

```js
// Then import locally
import scopeCss from './src/scopecss.js';
```

## Usage

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>ScopeCSS Example</title>
</head>
<body>
    <div id="app">
        <button class="btn">Click me</button>
        <div class="card">Card content</div>
    </div>

    <script type="module">
        import scopeCss from 'https://cdn.jsdelivr.net/gh/lessmatter/scopecss@main/src/index.js';
        
        const html = /*html*/`
            <div class="container">
                <h1 class="title">Hello World</h1>
                <p class="text">This is scoped CSS</p>
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
    </script>
</body>
</html>
```

### 2. Component Libraries

Perfect for component libraries where you need to isolate CSS:

```javascript
// Component library usage
const componentHtml = /*html*/`
  <div class="widget">
    <h3 class="widget-title">Widget Title</h3>
    <p class="widget-content">Widget content here</p>
  </div>
`;

const componentCss = /*css*/`
  .widget { border: 1px solid #ccc; padding: 15px; }
  .widget-title { color: #333; margin-bottom: 10px; }
  .widget-content { color: #666; }
`;

const scopedComponent = scopeCss(componentHtml, componentCss);
// CSS is now scoped and won't conflict with other components
```

### 3. Dynamic Content

Great for CMS systems or dynamic content generation:

```javascript
// User-generated content
const userHtml = document.querySelector('#user-content').innerHTML;
const userCss = /*css*/`
  .user-content h1 { color: blue; }
  .user-content p { line-height: 1.6; }
  .user-content a { color: green; }
`;

const scopedUserContent = scopeCss(userHtml, userCss);
document.querySelector('#output').innerHTML = scopedUserContent;
```

## How it works

1. **Generates a random scope key** (e.g., "xdfc9a")
2. **Adds `data-scope="key"`** to all HTML elements
3. **Wraps CSS selectors** with `:where([data-scope="key"])`
4. **Returns complete HTML** with scoped CSS in `<style>` tag

## API

### `scopeCss(html, css)`

**Parameters:**
- `html` (string) - HTML string
- `css` (string) - CSS string

**Returns:**
- `string` - Scoped HTML string containing CSS

## License

MIT License

## Support

- GitHub Issues: [Create issue](https://github.com/lessmatter/scopecss/issues)
- Documentation: [JSDoc](https://github.com/lessmatter/scopecss/blob/main/src/index.js) 