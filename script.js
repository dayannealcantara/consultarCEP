function DOM(elements) {
  this.element = this.getDOMElements(elements);
}

DOM.prototype.getDOMElements = function getDOMElements(elements) {
  return document.querySelectorAll(elements);
};

DOM.prototype.on = function on(eventType, callback) {
  Array.prototype.forEach.call(this.element, function(element) {
    element.addEventListener(eventType, callback, false);
  });
};

DOM.prototype.off = function off(eventType, callback) {
  Array.prototype.forEach.call(this.element, function (element) {
    element.removeEventListener(eventType, callback, false);
  });
};

DOM.prototype.get = function get() {
  return this.element;
};

DOM.prototype.forEach = function forEach() {
  return Array.prototype.forEach.apply(this.element, arguments);
};

DOM.prototype.map = function map() {
  return Array.prototype.map.apply(this.element, arguments);
};

DOM.prototype.filter = function filter() {
  return Array.prototype.filter.apply(this.element, arguments);
};

DOM.prototype.reduce = function reduce() {
  return Array.prototype.reduce.apply(this.element, arguments);
};
DOM.prototype.reduceRight = function reduceRight() {
  return Array.prototype.reduceRight.apply(this.element, arguments);
};

DOM.prototype.every = function every() {
  return Array.prototype.every.apply(this.element, arguments);
};

DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }
  
DOM.prototype.isArray = function isArray(param) {
  return Object.prototype.toString.call(param) === "[object Array]";
};

DOM.prototype.isObject = function isObject(param) {
  return Object.prototype.toString.call(param) === "[object Object]";
};

DOM.prototype.isFunction = function isFunction(param) {
  return Object.prototype.toString.call(param) === "[object Function]";
};

DOM.prototype.isNumber = function isNumber(param) {
  return Object.prototype.toString.call(param) === "[object Number]";
};

DOM.prototype.isString = function isString(param) {
  return Object.prototype.toString.call(param) === "[object String";
};

DOM.prototype.isBoolean = function isBoolean(param) {
  return Object.prototype.toString.call(param) === "[object Boolean]";
};

DOM.prototype.isNull = function isNull(param) {
  return (
    Object.prototype.toString.call(param) === "[object Null]" ||
    Object.prototype.toString.call(param) === "[object Undefined]"
  );
};

var cep = new DOM('[data-js="formCEP"]');
var inputCEP = new DOM('[data-js="inicial"]');
var ajax = new XMLHttpRequest();
var Status = new DOM('[data-js="status"]');
var logradouro = new DOM('[data-js="logradouro"]');
var bairro = new DOM('[data-js="bairro"]');
var estado = new DOM('[data-js="estado"]');
var cidade = new DOM('[data-js="cidade"]');
var cep = new DOM('[data-js="cep"]');

cep.on("submit", handleSubmitCep);

function handleSubmitCep(event) { 
  var url = getUrl();
  ajax.open("GET", url);
  ajax.send();
  getMessage('loading');
  ajax.addEventListener("readystatechange", handleReadyStateChange);
}

function getUrl() {
  return "https://viacep.com.br/ws/[CEP]/json/".replace("[CEP]", clearCEP());
}

function clearCEP() {
  return inputCEP.get()[0].value.replace(/\D/g, "");
}

function handleReadyStateChange() {
  if(isRequestOk()) {
    getMessage("ok");
    fillCEPFields();
  }
}

function isRequestOk() {
  return ajax.readyState === 4 && ajax.status === 200;
}

function fillCEPFields(){
    var data = parseData();
    if(!data){
        getMessage('error');
        data = clearData();
    }

logradouro.get()[0].textContent = data.logradouro;
bairro.get()[0].textContent = data.bairro;
cidade.get()[0].textContent = data.localidade;
estado.get()[0].textContent = data.uf;
cep.get()[0].textContent = data.cep;
}

function clearData() {
    return {
        logradouro: '',
        bairro: '',
        localidade:'',
        uf:'',
        cep: '',
    }
}

function parseData() {
    var result;
     try{
         result = JSON.parse(ajax.responseText)
     }
     catch(e){
         result = null
     }
     return result;
}

function getMessage(type) {
    var messages = {
        loading: replaceCEP('Buscando informações para o CEP [CEP] ...'),
        ok: replaceCEP('Endereço referente ao CEP [CEP] : '),
        error: replaceCEP('Não encontramos o endereço para o CEP [CEP] .'),
    };
    Status.get()[0].textContent = messages[type];
}

function replaceCEP(message) {
    return message.replace('[CEP]', clearCEP());
}