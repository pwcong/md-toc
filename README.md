# MD Toc

Generate a table of contents based on the heading structure of a html document. Preview demo [here](https://pwcong.github.io/mdtoc.js/public/index.html)

## Install

```shell
npm install mdtoc.js --save
```

OR

```html
<script src="mdtoc.min.js"></script>
```

## Usage

**mdtoc(selector, options)**

- get(): get mdtoc tree
- make(useLink): make mdtoc tree node

Default Options:

```javascript
{
  name: 'mdtoc',
  prefix: '',
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
}
```

Example:

```javascript
var tocTree = mdtoc('#md');

console.log(tocTree.get());
// {
//   "heading": 0,
//   "name": "mdtoc",
//   "children": [
//     {
//       "heading": 1,
//       "name": "h1",
//       "link": "#h-1",
//       "children": [
//         {
//           "heading": 2,
//           "name": "h2",
//           "link": "#h-1-2",
//           "children": [
//             ...
//           ]
//         }
//       ]
//     }
//   ]
// }

toc.appendChild(tocTree.make(true));
// <ol id="mdtoc">
//   <li>
//     <a href="#h1">H1</a>
//     <ol>
//       <li>
//         <a href="#h2-1">H2-1</a>
//         ...
//     </ol>
//   </li>
// </ol>

```
