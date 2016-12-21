const DOMNodeCollect = require('./dom_node_collection.js');

const isString = (s) => {
  return typeof(s) === 'string' || s instanceof String;
};

let queued = [];
const enqueue = (arg) => {
  queued.push(arg);
};

document.addEventListener("DOMContentLoaded", () => {
  queued.forEach((f) => {
    f();
  });
  queued = null;
});

const $j = (arg) => {
  if (isString(arg)) {
    return new DOMNodeCollect(Array.from(document.querySelectorAll(arg)));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollect(Array.from(arg));
  } else if (arg instanceof Function) {
    document.readyState === "complete" ? arg() : enqueue(arg);
  }
}

$j.extend = (base, ...objs) => {
  objs.forEach( obj => {
    for(let property in obj) {
      base[property] = obj[property];
    }
  });
  return base;
};

$j.ajax = options => {
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + queryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

queryString = obj => {
  let result = "";
  for(let property in obj){
    if (obj.hasOwnProperty(property)){
      result += property + "=" + obj[property] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};


window.$j = $j;
