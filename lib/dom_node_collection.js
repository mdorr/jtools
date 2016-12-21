const isString = (s) => {
  return typeof(s) === 'string' || s instanceof String;
};



class DOMNodeCollect {
  constructor (htmlElements) {
    this.htmlElements = htmlElements;
  }

  html (string) {
    if (string === undefined) {
      return this.htmlElements[0].innerHTML;
    } else {
      this.htmlElements.forEach((el) => el.innerHTML = string );
    }
  }

  empty () {
    this.html("");
  }

  append (add) {
    let addedString = "";
    if (isString(add)) {
      addedString = add;
    } else if (add instanceof HTMLElement) {
      addedString = add.outerHTML;
    } else if (add instanceof DOMNodeCollect) {
      for (let i = 0; i < add.htmlElements.length; i++) {
        addedString += add.htmlElements[i].outerHTML;
      }
    }

    this.htmlElements.forEach((el) => el.innerHTML += addedString);
  }

  addClass (className) {
    this.htmlElements.forEach((el) => el.classList.add(className));
  }

  removeClass (className) {
    this.htmlElements.forEach((el) => el.classList.remove(className));
  }

  attr (key, value) {
    if (value === undefined) {
      return this.htmlElements[0].getAttribute(key);
    } else {
      this.htmlElements.forEach((el) => el.setAttribute(key, value));
    }
  }

  children () {
    // debugger
    let kiddies = [];

    for (let i = 0; i < this.htmlElements.length; i++) {
      const el = this.htmlElements[i];
      for (let j = 0; j < el.children.length; j++) {
        kiddies.push(el.children[j]);
      }
    }
    return new DOMNodeCollect(kiddies);
  }

  parent () {
    let parents = [];

    for (let i = 0; i < this.htmlElements.length; i++) {
      parents.push(this.htmlElements[i].parentElement);
    }

    return new DOMNodeCollect(parents);
  }

  find (selector) {
    let found = [];

    for (let i = 0; i < this.htmlElements.length; i++) {
      const matches = this.htmlElements[i].querySelectorAll(selector);
      for (var j = 0; j < matches.length; j++) {
        found.push(matches[j]);
      }
    }

    return new DOMNodeCollect(found);
  }

  remove () {
    for (let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i].remove();
    }
    this.htmlElements = [];
  }

  on (event, callback) {
    this.htmlElements.forEach((el) => el.addEventListener(event, callback));
  }

  off (event, callback) {
    this.htmlElements.forEach((el) => el.removeEventListener(event, callback));
  }



}

module.exports = DOMNodeCollect;
