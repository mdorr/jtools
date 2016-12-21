const DOMNodeCollect = require('./dom_node_collection.js');

const isString = (s) => {
  return typeof(s) === 'string' || s instanceof String;
};

let queued = [];
const enqueue = (arg) => {
  queued.push(arg);
};

const $j = (arg) => {
  if (isString(arg)) {
    return new DOMNodeCollect(Array.from(document.querySelectorAll(arg)));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollect(Array.from(arg));
  } else if (arg instanceof Function) {
    document.readyState === "complete" ? arg() : enqueue(arg);
  }
}


window.$j = $j;
