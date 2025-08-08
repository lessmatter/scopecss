/**
 * @fileoverview ScopeCSS - CSS scoping library for HTML
 * @version 1.0.0
 * @author Less Matter
 * @license MIT
 */

import { parse } from "node-html-parser";
import * as csstree from "css-tree";

/**
 * Generate a random 6-character scoping key (a–z + 0–9)
 * @returns {string} Random 6-character key
 * @example
 * generateScopeKey(); // "xdfc9a"
 */
function generateScopeKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 6; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

/**
 * Add the data-scope attribute to all HTML elements
 * @param {string} htmlString - HTML string
 * @param {string} scopeValue - Scoping key (e.g., "xdfc9a")
 * @returns {string} HTML string with data-scope attributes
 * @example
 * addDataScopeToAllElements('<div>Hello</div>', 'abc123');
 * Result: '<div data-scope="abc123">Hello</div>'
 */
function addDataScopeToAllElements(htmlString, scopeValue) {
  const root = parse(htmlString, { lowerCaseTagName: false });

  root.querySelectorAll("*").forEach((el) => {
    if (!el.hasAttribute("data-scope")) {
      el.setAttribute("data-scope", scopeValue);
    }
  });

  return root.toString();
}

/**
 * Prefix all CSS selectors with :where([data-scope="scopeValue"]) 
 * @param {string} css - CSS string
 * @param {string} scopeValue - Scoping key
 * @returns {string} Scoped CSS string
 * @example
 * addScopeToCssWithCssTree('.button { color: red; }', 'abc123');
 * Result: ':where([data-scope="abc123"]) .button { color: red; }'
 */
function addScopeToCssWithCssTree(css, scopeValue) {
  const ast = csstree.parse(css);

  csstree.walk(ast, {
    visit: "Rule",
    enter(node) {
      if (node.prelude && node.prelude.type === "SelectorList") {
        // Build a new selectorList where each selector is prefixed
        // as: :where([data-scope="<key>"]) <selector>
        const prefixedSelectors = [];

        node.prelude.children.forEach((selector) => {
          const selectorString = csstree.generate(selector);
          const prefixedString = `:where([data-scope="${scopeValue}"]) ${selectorString}`;
          const parsedSelector = csstree.parse(prefixedString, { context: "selector" });
          prefixedSelectors.push(parsedSelector);
        });

        // Replace the entire SelectorList with a new list
        const selectorListString = prefixedSelectors
          .map((sel) => csstree.generate(sel))
          .join(", ");
        node.prelude = csstree.parse(selectorListString, { context: "selectorList" });
      }
    },
  });

  return csstree.generate(ast);
}

/**
 * 🔧 ScopeCSS - CSS scoping for HTML
 * 
 * This function:
 * 1. Generates a random scoping key (e.g., "xdfc9a")
 * 2. Adds data-scope="key" to every HTML element if not present
 * 3. Prefixes CSS selectors with :where([data-scope="key"]) 
 * 4. Returns an HTML string with <style>scopedCss</style> injected
 * 
 * @param {string} html - HTML string
 * @param {string} css - CSS string
 * @returns {string} Scoped HTML string containing the CSS
 * 
 * @example
 * ```javascript
 * import scopeCss from 'https://raw.githubusercontent.com/lessmatter/scopecss/main/src/index.js';
 * 
 * const html = '<div class="button">Click me</div>';
 * const css = '.button { color: red; }';
 * const result = scopeCss(html, css);
 * Output:
 * '<div class="button" data-scope="xdfc9a">Click me</div><style>:where([data-scope="xdfc9a"]) .button { color: red; }</style>'
 * ```
 * 
 * @example
 * Usage via GitHub:
 * import scopeCss from 'https://raw.githubusercontent.com/lessmatter/scopecss/main/src/index.js';
 * 
 * const result = scopeCss(
 *   '<button class="btn">Submit</button>',
 *   '.btn { background: blue; color: white; }'
 * );
 */
export default function scopeCss(html, css) {
  const scopeValue = generateScopeKey(); // e.g., "xdfc9a"
  const scopedHtml = addDataScopeToAllElements(html, scopeValue);
  const scopedCss = addScopeToCssWithCssTree(css, scopeValue);
  return `${scopedHtml}<style>${scopedCss}</style>`;
} 