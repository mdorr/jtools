# jTools
## Lightweight DOM manipulation library

The jTools are a collection of useful DOM manipulation tools. They allow the selection, traversal, event handling, and changing of DOM elements.

## Usage
### Installation
Simply add jtools.js to your HTML file:
```html
<script src="./js/jtools.js" charset="utf-8"></script>
```

### ```$j``` - Selector
To select DOM elements, use the ```$j``` selector. This takes the following arguments:

* ```$j(string)```: Select by CSS selector, p.e. ```$j("h1")```
* ```$j(HTMLElement)```: Select by HTML elements

In both cases, $j will return a collection of type ```
DOMNodeCollect```.

### ```DOMNodeCollect``` - DOM Node Collection
A DOM Node collection offers the following methods:

#### Manipulation

* ```html()```: Return the innerHTML of the current node(s).
* ```html(value)```: Set the innerHTML of the current node(s) to the passed ```value```.
* ```empty()```: Clear the content of the node(s).
* ```append(add)```: Add content to node(s). ```add``` can be a ```String```, a ```DOMNodeCollect```, or an ```HTMLElement```.
* ```attr(key, value)```: Will add or update the attribute ```key``` with the new ```value```.
* ```remove()```: Remove the HTML and the node(s).
* ```addClass(className)```: Add the class named ```className``` to the node(s).
* ```removeClass(className)```: Remove the class named ```className``` from the node(s).

#### Traversal
* ```children()```: Return the children objects of the selected node(s).
* ```parent()```: Return the parent object(s) of the selected node(s).
* ```find(selector)```: Find all descending nodes matching the passed CSS ```selector```.

#### Event Handling
* ```on(event, callback)```: Add an event handler to the node(s) that invokes ```callback``` on ```event```. For example: ```$j("h1").on("click", () => {alert("h1 clicked!")})```
* ```off(event)```: Remove all event callbacks from the node(s) that match ```event```.

### ```$j``` - Document ready functions
Passing a function to ```$j``` will queue a function to be invoked once the document is fully loaded. If the document has already finished loading, the function is invoked immediately.

### ```$j``` - AJAX

* ```$j.ajax(options)```: Create a new AJAX request. Takes the following ```options```:
  * ```contentType```: The [media type](https://www.iana.org/assignments/media-types/media-types.xhtml) of the request. Default: ```application/x-www-form-urlencoded; charset=UTF-8```
  * ```method```: The [HTTP method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) used. Default: ```GET```
  * ```url```: The target URL for the request. Default: empty
  * ```success```: Callback function to be invoked on successful request. Default: None
  * ```error```: Callback function to be invoked on unsuccessful request. Default: None
  * ```data```: Data submitted with the AJAX request. Default: None
