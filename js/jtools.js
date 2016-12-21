/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollect = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    debugger
	    this.nodes.forEach(node => {
	      node.addEventListener(event, callback);
	      const eventKey = `jToolsEvents-${event}`;
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
	  }
	
	  off (event) {
	    this.nodes.forEach(node => {
	      const eventKey = `jToolsEvents-${event}`;
	      if (node[eventKey]) {
	        node[eventKey].forEach(cb => {
	          node.removeEventListener(event, cb)
	        });
	      }
	      node[eventKey] = [];
	    });
	  }
	}
	
	module.exports = DOMNodeCollect;


/***/ }
/******/ ]);
//# sourceMappingURL=jtools.js.map