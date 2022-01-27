function DOM(elements) {
    this.element = this.getDOMElements(elements)
}

DOM.prototype.getDOMElements = function getDOMElements(elements){
    return document.querySelectorAll(elements)
}

DOM.prototype.on = function on(eventType, callback){
    Array.prototype.forEach.call(this.element, function(element) {
        element.addEventListener(eventType, callback, false)
    })
};

DOM.prototype.off = function off(eventType, callback){
    Array.prototype.forEach.call(this.element, function(element) {
        element.removeEventListener(eventType, callback, false)
    })
};

DOM.prototype.get = function get() {
    return this.element;
}

DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
}

DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
}

DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
}


