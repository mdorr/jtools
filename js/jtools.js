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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=jtools.js.map