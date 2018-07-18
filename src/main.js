const MDTOC_DEFAULT_OPTIONS = {
  name: 'mdtoc',
  prefix: '',
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
};

const mdtoc = function(selector, options) {
  this.done = false;
  this.selector = selector;

  this.md = null;
  if (Object.prototype.toString.call(selector) === '[object String]') {
    this.md = document.querySelector(selector);
  } else if (selector instanceof HTMLElement) {
    this.md = selector;
  }
  if (!this.md) {
    throw new Error('invalid selector');
  }

  this.options = Object.assign({}, MDTOC_DEFAULT_OPTIONS, options);

  this.tocTree = {
    heading: 0,
    name: this.options.name,
    children: []
  };

  this.init();
};

mdtoc.prototype = {
  init: function() {
    let headings = Array.prototype.filter
      .call(
        this.md.childNodes || [],
        node =>
          node instanceof HTMLHeadingElement &&
          (this.options.filter || []).indexOf(node.tagName.toLowerCase()) >= 0
      )
      .map(node => ({
        heading: parseInt(node.tagName[1]),
        name: node.innerHTML,
        link: '#' + this.options.prefix + node.id
      }));

    const headingsLength = headings.length;
    for (let i = 0; i < headingsLength; i++) {
      this.appendChild(this.tocTree, headings[i]);
    }

    this.done = true;
  },
  get: function() {
    if (!this.done) {
      throw new Error('mdtoc initialize failed');
    }

    return this.tocTree;
  },
  make: function(useLink) {
    if (!this.done) {
      throw new Error('mdtoc initialize failed');
    }

    let tocTreeNode = document.createElement('ol');
    tocTreeNode.id = this.options.prefix + this.options.name;

    this.appendChildren(tocTreeNode, this.tocTree.children, useLink);

    return tocTreeNode;
  },
  appendChild: function(root, child) {
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
        this.appendChild(_child, child);
      }
    }
  },
  appendChildren: function(root, childrens, useLink) {
    const childrenLength = childrens.length;
    for (let i = 0; i < childrenLength; i++) {
      const child = childrens[i];
      const childNode = document.createElement('li');
      if (useLink) {
        const linkNode = document.createElement('a');
        linkNode.href = child.link;
        linkNode.innerHTML = child.name;
        childNode.appendChild(linkNode);
      } else {
        childNode.setAttribute('data-link', child.link);
        childNode.innerHTML = child.name;
      }

      if (child.children.length > 0) {
        const childrenNode = document.createElement('ol');
        childNode.appendChild(childrenNode);
        this.appendChildren(childrenNode, child.children, useLink);
      }

      root.appendChild(childNode);
    }
  }
};

export default function(selector, options) {
  return new mdtoc(selector, options);
}
