const MDTOC_DEFAULT_OPTIONS = {
  prefix: '',
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
};

function appendChild(root, child) {
  let children = root.children;
  if (children.length <= 0) {
    children.push(
      Object.assign({}, child, {
        children: []
      })
    );
  } else {
    let _child = children[children.length - 1];
    if (_child.heading >= child.heading) {
      children.push(
        Object.assign({}, child, {
          children: []
        })
      );
    } else {
      appendChild(_child, child);
    }
  }
}

export default function(selector, options) {
  let md = null;
  if (Object.prototype.toString.call(selector) === '[object String]') {
    md = document.querySelector(selector);
  } else if (selector instanceof HTMLElement) {
    md = selector;
  }

  if (!md) {
    throw new Error('invalid selector');
  }

  const _options = Object.assign({}, MDTOC_DEFAULT_OPTIONS, options);

  let headings = Array.prototype.filter
    .call(
      md.childNodes || [],
      node =>
        node instanceof HTMLHeadingElement &&
        (_options.filter || []).indexOf(node.tagName.toLowerCase()) >= 0
    )
    .map(node => ({
      heading: parseInt(node.tagName[1]),
      name: node.innerHTML,
      link: prefix + node.id
    }));

  let tocTree = {
    heading: 0,
    name: 'root',
    link: '#root',
    children: []
  };

  for (let i = 0; i < headings.length; i++) {
    appendChild(tocTree, headings[i]);
  }

  return tocTree;
}
