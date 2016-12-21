const isString = (s) => {
  return typeof(s) === 'string' || s instanceof String;
};

class DOMNodeCollect {
  constructor (nodes) {
    this.nodes = nodes;
  }

  html (string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      this.nodes.forEach((el) => el.innerHTML = string );
    }
  }

  empty () {
    this.html("");
  }

  append (add) {
    let toAppend = "";
    if (isString(add)) {
      toAppend = add;
    } else if (add instanceof HTMLElement) {
      toAppend = add.outerHTML;
    } else if (add instanceof DOMNodeCollect) {
      for (let i = 0; i < add.nodes.length; i++) {
        toAppend += add.nodes[i].outerHTML;
      }
    }
    this.nodes.forEach((el) => el.innerHTML += toAppend);
  }

  addClass (c) {
    this.nodes.forEach((el) => el.classList.add(c));
  }

  removeClass (c) {
    this.nodes.forEach((el) => el.classList.remove(c));
  }

  attr (k, v) {
    if (v === undefined) {
      return this.nodes[0].getAttribute(k);
    } else {
      this.nodes.forEach((el) => el.setAttribute(k, v));
    }
  }

  children () {
    let children = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const el = this.nodes[i];
      for (let j = 0; j < el.children.length; j++) {
        children.push(el.children[j]);
      }
    }
    return new DOMNodeCollect(children);
  }

  parent () {
    let parents = [];
    for (let i = 0; i < this.nodes.length; i++) {
      parents.push(this.nodes[i].parentElement);
    }
    return new DOMNodeCollect(parents);
  }

  find (selector) {
    let result = [];
    for (let i = 0; i < this.nodes.length; i++) {
      const matches = this.nodes[i].querySelectorAll(selector);
      for (var j = 0; j < matches.length; j++) {
        result.push(matches[j]);
      }
    }
    return new DOMNodeCollect(result);
  }

  remove () {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].remove();
    }
    this.nodes = [];
  }

  on (event, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(event, callback);
      const eventKey = getEventKey(event);
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off (event) {
    this.nodes.forEach(node => {
      const eventKey = getEventKey(event);
      if (node[eventKey]) {
        node[eventKey].forEach(cb => {
          node.removeEventListener(event, cb)
        });
      }
      node[eventKey] = [];
    });
  }

  getEventKey(event) {
    return `jTools-Events-${event}`;
  }

}

module.exports = DOMNodeCollect;
