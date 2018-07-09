# MD Toc

Generate a table of contents based on the heading structure of a html document.

## Install

```shell
npm install md-toc --save
```

OR

```html
<script src="mdtoc.min.js"></script>
```

## Usage

**mdtoc(selector, options)**

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

console.log(tocTree);

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

```
